(ns utils.ast)

(defn keep-only [type ast-nodes]
  (filter #(= (:type %) type) ast-nodes))

(defn has? [type ast-nodes]
  (->> ast-nodes (keep-only type) count (not= 0)))

(defn at-most-one-of? [type ast-nodes]
  (->> ast-nodes
       (keep-only type)
       count
       (#(<= % 1))))

(defn is-a [type expr]
  (= (:type expr) type))
