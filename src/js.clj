(ns js
  (:require [clojure.string :as string])
  (:require [utils.emit :as emit])
  (:require [utils.ast :as ast]))

(declare eval-expr)
(declare eval-ast)

(defn- eval-if [{:keys [expr pass fail]}]
  (str "if (truthy(" (eval-expr expr) ")) {\n"
       (eval-ast pass) "\n"
       "} else {"
       (eval-ast fail) "\n"
       "}"))

(defn- eval-str [{:keys [value]}]
  (str \" value \"))

(defn- eval-expr [node]
  (case (:type node)
    :str (eval-str node)))

(defn- eval-statement [node]
  (case (:type node)
    :if (eval-if node)))

(defn- eval-ast [ast]
  (reduce #(str %1 "\n" (eval-statement %2)) "" ast))

(defn eval-js [ast]
  (let [output (eval-ast ast)]
    (str (slurp "./src/std/std.ts") "\n"
         output)))
