(ns js
  (:require [clojure.string :as string])
  (:require [utils.globals :as globals])
  (:require [utils.emit :as emit])
  (:require [utils.ast :as ast]))

(declare eval-expr)
(declare eval-ast)

(defn- resolve-name [name]
  (-> name
      (string/replace "?" "__q")
      (string/replace "!" "__b")))

(defn- eval-if [{:keys [expr pass fail]}]
  (str "if (truthy(" (eval-expr expr) ")) {\n"
       (eval-ast pass) "\n"
       "} else {\n"
       (eval-ast fail) "\n"
       "}"))

(defn- eval-str [{:keys [value]}]
  (str \" value \"))

(defn- property-lookup [{:keys [lhs property]}]
  (str (eval-expr lhs) "." property))

(defn- eval-fn-call [{:keys [lhs args]}]
  (str (eval-expr lhs) "("
       (string/join ", " (map eval-expr args))
       ")"))

(defn- eval-assign-expr [{:keys [name]}]
  (resolve-name name))

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

(defn- eval-obj-entry [entry]
  (case (entry :type)
    :reg-obj-entry (eval-reg-obj-entry entry)
    :obj-shorthand-entry (eval-obj-shorthand-entry entry)
    :dynamic-obj-entry (eval-dynamic-obj-entry entry)))

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
  (str "equals(" (eval-expr lhs) ", " (eval-expr rhs) ")"))

(defn- eval-not-equals [{:keys [lhs rhs]}]
  (str "!equals(" (eval-expr lhs) ", " (eval-expr rhs) ")"))

(defn- eval-not [{:keys [expr]}]
  (str "not(" (eval-expr expr) ")"))

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
    :bind-this (eval-bind-this node)))

(defn- eval-return [{:keys [expr]}]
  (str "return " (eval-expr expr)))

(defn- eval-statement [node]
  (case (:type node)
    :if (eval-if node)
    :let (eval-let node)
    :if-let (eval-if-let node)
    :return (eval-return node)
    (eval-expr node)))

(defn- eval-ast [ast]
  (reduce #(str %1 "\n" (eval-statement %2)) "" ast))

(defn eval-js [ast]
  (let [output (eval-ast ast)]
    (if @globals/emit-std
      (str (slurp "./src/std/std.ts") "\n"
           output)
      output)))
