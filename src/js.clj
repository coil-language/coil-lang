(ns js
  (:require [clojure.string :as string]
            [clojure.java.io :as io]
            [utils.globals :as globals]
            [lexer]
            [parser]))

(declare eval-expr)
(declare eval-ast)

(defn- resolve-name [name]
  (when name
    (-> name
        (string/replace "?" "__q")
        (string/replace "!" "__b"))))

(defn- eval-if [{:keys [expr pass fail]}]
  (str "if (truthy(" (eval-expr expr) ")) {\n"
       (eval-ast pass) "\n"
       "} else {\n"
       (eval-ast fail) "\n"
       "}"))

(defn- eval-unless [{:keys [expr body]}]
  (str "if (not(" (eval-expr expr) ")) {\n"
       (eval-ast body) "\n"
       "}"))

(defn- eval-str [{:keys [value]}]
  (if (some #{\newline} value)
    (str \` value \`)
    (str \" value \")))

(defn- property-lookup [{:keys [lhs property]}]
  (str (eval-expr lhs) "." (resolve-name property)))

(defn- eval-fn-call [{:keys [lhs args]}]
  (str (eval-expr lhs) "("
       (string/join ", " (map eval-expr args))
       ")"))

(defn- eval-id-assign-name [{:keys [name]}]
  (resolve-name name))

(defn- eval-array-deconstruction-names [{:keys [names]}]
  (str "[" (string/join ", " (map resolve-name names)) "]"))

(defn- eval-object-deconstruction-names [{:keys [names]}]
  (str "{" (string/join ", " (map resolve-name names)) "}"))

(defn- eval-spread-assign [{:keys [name]}]
  (str "..." name))

(defn- eval-assign-expr [node]
  (case (node :type)
    :id-assign (eval-id-assign-name node)
    :spread-assign (eval-spread-assign node)
    :array-deconstruction (eval-array-deconstruction-names node)
    :object-deconstruction (eval-object-deconstruction-names node)))

(defn- eval-if-let [{:keys [assign-expr expr pass fail]}]
  (str "if (truthy(" (eval-expr expr) ")) {\n"
       "let " (eval-assign-expr assign-expr) " = " (eval-expr expr) "\n"
       (eval-ast pass) "\n"
       "} else {\n"
       (eval-ast fail) "\n"
       "}"))


(defn- eval-spread [{:keys [expr]}]
  (str "..." (eval-expr expr)))

(defn- eval-let [{:keys [assign-expr rhs]}]
  (str "let " (eval-assign-expr assign-expr) " = " (eval-expr rhs)))

(defn- eval-array [{:keys [elements]}]
  (str "[" (string/join ", " (map eval-expr elements)) "]"))

(def math-op-to-method
  {">" "greater_than"
   "<" "less_than"
   ">=" "greater_than_eq"
   "<=" "less_than_eq"
   "*" "times"
   "**" "exponent"
   "/" "divide_by"
   "+" "plus"
   "-" "minus"
   "%" "mod"})

(defn- eval-math-op [{:keys [lhs op rhs]}]
  (str
   (math-op-to-method op)
   ".call("
   (eval-expr lhs) ","
   (eval-expr rhs)
   ")"))

(defn- eval-fn [{:keys [async? generator? name args body]}]
  (str
   (when async? "async ")
   "function " (when generator? "*") (resolve-name name) "(" (string/join ", " (map eval-assign-expr args)) ") {\n"
   (eval-ast body) "\n"
   "}"))

(defn- eval-set [{:keys [elements]}]
  (str
   "new Set(["
   (string/join ", " (map eval-expr elements))
   "])"))

(defn- eval-bind [{:keys [lhs expr]}]
  (str \( (eval-expr expr) ".bind(" (eval-expr lhs) ")" \)))

(defn- eval-reg-obj-entry [{:keys [key value]}]
  (str (resolve-name key) ": " (eval-expr value)))

(defn- eval-obj-shorthand-entry [{:keys [id]}]
  (resolve-name id))

(defn- eval-dynamic-obj-entry [{:keys [key-expr value]}]
  (str "[" (eval-expr key-expr) "]: " (eval-expr value)))

(defn- eval-obj-fn [{:keys [name args body]}]
  (assert name)
  (str
   (resolve-name name) "(" (string/join ", " (map eval-assign-expr args)) ") {\n"
   (eval-ast body) "\n"
   "}"))

(defn- eval-obj-entry [entry]
  (case (entry :type)
    :reg-obj-entry (eval-reg-obj-entry entry)
    :obj-shorthand-entry (eval-obj-shorthand-entry entry)
    :dynamic-obj-entry (eval-dynamic-obj-entry entry)
    :spread-obj-entry (eval-spread entry)
    :fn (eval-obj-fn entry)))

(defn- eval-obj-lit [{:keys [entries]}]
  (str "new ObjectLiteral({"
       (string/join ", " (map eval-obj-entry entries))
       "})"))

(defn- eval-bind-this [{:keys [expr]}]
  (str (eval-expr expr) ".bind(this)"))

(defn- eval-id-lookup [node]
  (-> node :name resolve-name))

(defn- eval-num [node]
  (str \( (node :value) \)))

(defn- eval-big-int [node]
  (node :value))

(defn- eval-double-equals [{:keys [lhs rhs]}]
  (str (resolve-name "eq?") "(" (eval-expr lhs) ", " (eval-expr rhs) ")"))

(defn- eval-not-equals [{:keys [lhs rhs]}]
  (str "!" (resolve-name "eq?") "(" (eval-expr lhs) ", " (eval-expr rhs) ")"))

(defn- eval-not [{:keys [expr]}]
  (str "negate(" (eval-expr expr) ")"))

(defn- eval-dynamic-access [{:keys [lhs expr]}]
  (str (eval-expr lhs) "[" (eval-expr expr) "]"))

(defn- eval-new [{:keys [expr]}]
  (str "new " (eval-expr expr)))

(defn- eval-triple-equals [{:keys [lhs rhs]}]
  (str (eval-expr lhs) " === " (eval-expr rhs)))

(defn- eval-triple-not-equals [{:keys [lhs rhs]}]
  (str (eval-expr lhs) " !== " (eval-expr rhs)))

(defn- eval-is-not [{:keys [lhs rhs]}]
  (str "!(" (eval-expr lhs) " instanceof " (eval-expr rhs) ")"))

(defn- eval-is [{:keys [lhs rhs]}]
  (str (eval-expr lhs) " instanceof " (eval-expr rhs)))

(defn- eval-and-and [{:keys [lhs rhs]}]
  (str "and.call(" (eval-expr lhs) ", () => " (eval-expr rhs) ")"))

(defn- eval-or-or [{:keys [lhs rhs]}]
  (str "or.call(" (eval-expr lhs) ", () => " (eval-expr rhs) ")"))

(defn- eval-snd-assign [{:keys [lhs rhs]}]
  (str (eval-expr lhs) " = " (eval-expr rhs)))

(defn- eval-await [{:keys [expr]}]
  (str "await " (eval-expr expr)))

(defn- eval-yield [{:keys [expr]}]
  (str "yield " (eval-expr expr)))

(defn- eval-jsx-attr-reg [{:keys [name expr]}]
  (str name ": " (eval-expr expr)))

(defn- eval-jsx-attr-shorthand [{:keys [name]}]
  (str name ": " name))

(defn- eval-jsx-attr [node]
  (case (node :type)
    :jsx-attr-reg (eval-jsx-attr-reg node)
    :jsx-attr-shorthand (eval-jsx-attr-shorthand node)))

(declare eval-jsx-tag)

(defn- eval-jsx-expr [node]
  (case (node :type)
    :quoted-expr (eval-expr (node :expr))
    :str (eval-str node)
    (do
      (assert (-> node :type (= :jsx-tag)))
      (eval-jsx-tag node))))

(defn- eval-jsx-tag [{:keys [name attrs children]}]
  (str "h(\"" name "\", {"
       (->> attrs (map eval-jsx-attr) (string/join ", "))
       "},"
       (->> children (map eval-jsx-expr) (string/join ", "))
       ")"))

(defn- eval-paren-expr [{expr :expr}]
  (str "(" (eval-expr expr) ")"))

(defn- eval-unapplied-math-op [{op :op}]
  (str (math-op-to-method op)))

(defn- eval-unapplied-and-and [_]
  (str "and"))

(defn- eval-unapplied-or-or [_]
  (str "or"))

(defn- eval-keyword [{value :value}]
  (str "Keyword.for(" \" (subs (resolve-name value) 1) \" ")"))

(defn- eval-regular-record-entry [{:keys [key-expr value-expr]}]
  (str "[" (eval-expr key-expr) ", " (eval-expr value-expr) "]"))

(defn- eval-keyword-record-entry [{:keys [name expr]}]
  (str "[" (eval-keyword {:value (str ":" name)}) ", " (eval-expr expr) "]"))

(defn- eval-record-entry [node]
  (case (node :type)
    :regular-record-entry (eval-regular-record-entry node)
    :keyword-record-entry (eval-keyword-record-entry node)))

(defn- eval-record-syntax [{:keys [constructor-name entries]}]
  (str "construct_record.bind(" constructor-name ")"
       "(["
       (->> entries (map eval-record-entry) (string/join ","))
       "])"))

(defn- eval-inclusive-range [{:keys [lhs rhs]}]
  (str "new Range(" (eval-expr lhs) ", " (eval-expr rhs) ")"))

(defn- eval-exclusive-range [{:keys [lhs rhs]}]
  (str "new Range(" (eval-expr lhs) ", " (eval-expr rhs) ", true)"))

(defn- eval-bound-call [{:keys [lhs args]}]
  (str (eval-expr lhs)
       ".call(this, "
       (->> args (map eval-expr) (string/join ", "))
       ")"))

(defn- eval-shorthand-anon-fn [{expr :expr}]
  (str "(...__args) => " (eval-expr expr)))

(defn- eval-anon-arg-id [{arg-num :arg-num}]
  (str "__args[" (dec arg-num) "]"))

(defn- eval-decorator [{:keys [name fn-def]}]
  (str "let " (fn-def :name) " = " name "(" (eval-fn fn-def) ")"))

(defn- eval-expr [node]
  (case (:type node)
    :str (eval-str node)
    :decorator (eval-decorator node)
    :keyword (eval-keyword node)
    :property-lookup (property-lookup node)
    :id-lookup (eval-id-lookup node)
    :fn-call (eval-fn-call node)
    :num (eval-num node)
    :big-int (eval-big-int node)
    :array (eval-array node)
    :math-op (eval-math-op node)
    :double-equals (eval-double-equals node)
    :not-equals (eval-not-equals node)
    :not (eval-not node)
    :fn (eval-fn node)
    :bind (eval-bind node)
    :bound-call (eval-bound-call node)
    :anon-arg-id (eval-anon-arg-id node)
    :set (eval-set node)
    :obj-lit (eval-obj-lit node)
    :bind-this (eval-bind-this node)
    :dynamic-access (eval-dynamic-access node)
    :new (eval-new node)
    :triple-equals (eval-triple-equals node)
    :triple-not-equals (eval-triple-not-equals node)
    :spread (eval-spread node)
    :is-not (eval-is-not node)
    :is (eval-is node)
    :and-and (eval-and-and node)
    :or-or (eval-or-or node)
    :snd-assign (eval-snd-assign node)
    :await (eval-await node)
    :yield (eval-yield node)
    :jsx-tag (eval-jsx-tag node)
    :record-syntax (eval-record-syntax node)
    :paren-expr (eval-paren-expr node)
    :unapplied-math-op (eval-unapplied-math-op node)
    :unapplied-and-and (eval-unapplied-and-and node)
    :unapplied-or-or (eval-unapplied-or-or node)
    :shorthand-anon-fn (eval-shorthand-anon-fn node)
    :inclusive-range (eval-inclusive-range node)
    :exclusive-range (eval-exclusive-range node)))

(defn- eval-return [{:keys [expr]}]
  (str "return " (eval-expr expr)))

(defn- eval-protocol [{:keys [name]}]
  (str "const " (resolve-name name) " = Symbol(\"" name "\")"))

(defn- eval-impl-for [{:keys [symbol-name constructor expr]}]
  (str constructor ".prototype[" (resolve-name symbol-name) "] = " (eval-expr expr)))

(defn- eval-define-for [{:keys [symbol-name src-expr expr]}]
  (str (eval-expr src-expr) "[" (resolve-name symbol-name) "] = " (eval-expr expr)))

(defn- eval-for-loop [{:keys [await? assign-expr iterable-expr body]}]
  (str "for " (when await? "await ") " (let " (eval-assign-expr assign-expr) " of " (eval-expr iterable-expr) ") {\n"
       (eval-ast body) "\n"
       "}"))

(defn- eval-id-assign [{:keys [name expr]}]
  (str name " = " (eval-expr expr)))

(defn- eval-assert [{:keys [expr token msg]}]
  (str
   "assert__b("
   (eval-expr expr) ", "
   (token :line) ", "
   (token :col) ", "
   "`" (eval-expr expr) "`,"
   msg
   ")"))

(defn- eval-statement [node]
  (case (:type node)
    :if (eval-if node)
    :unless (eval-unless node)
    :let (eval-let node)
    :if-let (eval-if-let node)
    :return (eval-return node)
    :protocol-def (eval-protocol node)
    :impl-for (eval-impl-for node)
    :define-for (eval-define-for node)
    :for-loop (eval-for-loop node)
    :id-assign (eval-id-assign node)
    :assert (eval-assert node)
    (eval-expr node)))

(defn- eval-ast [ast]
  (reduce #(str %1 ";\n" (eval-statement %2)) "" ast))

(defn- compile-std-lib []
  (->> (file-seq (io/file "./src/std"))
       (map #(. % getPath))
       (filter #(re-matches  #".*\.prt" %))
       (map #(vector % (slurp %)))
       (map #(-> (let [[file-name src] %
                       tokens (lexer/tokenize src)]
                   (reset! globals/file-name file-name)
                   (reset! globals/tokens tokens)
                   (reset! globals/file-src %)
                   tokens)
                 parser/parse eval-ast))
       (string/join "\n\n")))

(defn eval-js [ast]
  (let [output (eval-ast ast)]
    (if @globals/emit-std
      (str (slurp "./src/std/js_prelude.ts") "\n"
           (compile-std-lib)
           output)
      output)))
