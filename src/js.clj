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

(defn- eval-spread-assign [{:keys [name]}]
  (str "..." name))

(defn- eval-assign-expr [node]
  (case (node :type)
    :id-assign (eval-id-assign-name node)
    :spread-assign (eval-spread-assign node)
    :array-deconstruction (eval-array-deconstruction-names node)))

(defn- eval-if-let [{:keys [assign-expr expr pass fail]}]
  (str "if (truthy(" (eval-expr expr) ")) {\n"
       "let " (eval-assign-expr assign-expr) " = " (eval-expr expr) "\n"
       (eval-ast pass) "\n"
       "} else {\n"
       (eval-ast fail) "\n"
       "}"))


(defn- eval-let [{:keys [assign-expr rhs]}]
  (str "let " (eval-assign-expr assign-expr) " = " (eval-expr rhs)))

(defn- eval-array [{:keys [elements]}]
  (str "[" (string/join ", " (map eval-expr elements)) "]"))

(defn- eval-math-op [{:keys [lhs op rhs]}]
  (str (eval-expr lhs) op (eval-expr rhs)))

(defn- eval-fn [{:keys [name args body]}]
  (str
   "function " (resolve-name name) "(" (string/join ", " (map eval-assign-expr args)) ") {\n"
   (eval-ast body) "\n"
   "}"))

(defn- eval-set [{:keys [elements]}]
  (str
   "new Set(["
   (string/join ", " (map eval-expr elements))
   "])"))

(defn- eval-bind [{:keys [lhs to]}]
  (str (resolve-name to) ".bind(" (eval-expr lhs) ")"))

(defn- eval-reg-obj-entry [{:keys [key value]}]
  (str (resolve-name key) ": " (eval-expr value)))

(defn- eval-obj-shorthand-entry [{:keys [id]}]
  (resolve-name id))

(defn- eval-dynamic-obj-entry [{:keys [key-expr value]}]
  (str (eval-expr key-expr) ": " (eval-expr value)))

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
    :fn (eval-obj-fn entry)))

(defn- eval-obj-lit [{:keys [entries]}]
  (str "{"
       (string/join ", " (map eval-obj-entry entries))
       "}"))

(defn- eval-bind-this [{:keys [fn-name]}]
  (str (resolve-name fn-name) ".bind(this)"))

(defn- eval-id-lookup [node]
  (-> node :name resolve-name))

(defn- eval-num [node]
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

(defn- eval-spread [{:keys [expr]}]
  (str "..." (eval-expr expr)))

(defn- eval-is-not [{:keys [lhs rhs]}]
  (str "!(" (eval-expr lhs) " instanceof " (eval-expr rhs) ")"))

(defn- eval-is [{:keys [lhs rhs]}]
  (str (eval-expr lhs) " instanceof " (eval-expr rhs)))

(defn- eval-and-and [{:keys [lhs rhs]}]
  (str "and(" (eval-expr lhs) ", " (eval-expr rhs) ")"))

(defn- eval-or-or [{:keys [lhs rhs]}]
  (str "or(" (eval-expr lhs) ", " (eval-expr rhs) ")"))

(defn- eval-expr [node]
  (case (:type node)
    :str (eval-str node)
    :property-lookup (property-lookup node)
    :id-lookup (eval-id-lookup node)
    :fn-call (eval-fn-call node)
    :num (eval-num node)
    :array (eval-array node)
    :math-op (eval-math-op node)
    :double-equals (eval-double-equals node)
    :not-equals (eval-not-equals node)
    :not (eval-not node)
    :fn (eval-fn node)
    :bind (eval-bind node)
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
    :or-or (eval-or-or node)))

(defn- eval-return [{:keys [expr]}]
  (str "return " (eval-expr expr)))

(defn- eval-protocol [{:keys [name]}]
  (str "const " (resolve-name name) " = Symbol(\"" name "\")"))

(defn- eval-impl-for [{:keys [symbol-name constructor expr]}]
  (str constructor ".prototype[" (resolve-name symbol-name) "] = " (eval-expr expr)))

(defn- eval-for-loop [{:keys [assign-expr iterable-expr body]}]
  (str "for (let " (eval-assign-expr assign-expr) " of " (eval-expr iterable-expr) ") {\n"
       (eval-ast body) "\n"
       "}"))

(defn- eval-id-assign [{:keys [name expr]}]
  (str name " = " (eval-expr expr)))

(defn- eval-statement [node]
  (case (:type node)
    :if (eval-if node)
    :unless (eval-unless node)
    :let (eval-let node)
    :if-let (eval-if-let node)
    :return (eval-return node)
    :protocol-def (eval-protocol node)
    :impl-for (eval-impl-for node)
    :for-loop (eval-for-loop node)
    :id-assign (eval-id-assign node)
    (eval-expr node)))

(defn- eval-ast [ast]
  (reduce #(str %1 "\n" (eval-statement %2)) "" ast))

(defn- compile-std-lib []
  (->> (file-seq (io/file "./src/std"))
       (map #(. % getPath))
       (filter #(re-matches  #".*\.sjs" %))
       (map slurp)
       (map #(-> % lexer/tokenize parser/parse eval-ast))
       (string/join "\n\n")))

(defn eval-js [ast]
  (let [output (eval-ast ast)]
    (if @globals/emit-std
      (str (slurp "./src/std/booleans.ts") "\n"
           (compile-std-lib)
           output)
      output)))
