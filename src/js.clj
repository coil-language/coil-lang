(ns js
  (:require [clojure.string :as string])
  (:require [utils.emit :as emit])
  (:require [utils.ast :as ast]))

(declare eval-expr)
(declare eval-ast)

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
  name)

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
   "function " name "(" (string/join ", " (map eval-assign-expr args)) ") {\n"
   (eval-ast body) "\n"
   "}"))

(defn- eval-set [{:keys [elements]}]
  (str
   "new Set(["
   (string/join ", " (map eval-expr elements))
   "])"))

(defn- eval-bind [{:keys [lhs to]}]
  (str to ".bind(" (eval-expr lhs) ")"))

(defn- eval-expr [node]
  (case (:type node)
    :str (eval-str node)
    :property-lookup (property-lookup node)
    :id-lookup (node :name)
    :fn-call (eval-fn-call node)
    :num (node :value)
    :array (eval-array node)
    :math-op (eval-math-op node)
    :fn (eval-fn node)
    :bind (eval-bind node)
    :set (eval-set node)))

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
    (str (slurp "./src/std/std.ts") "\n"
         output)))
