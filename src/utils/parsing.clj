(ns utils.parsing
  (:require [utils.globals :as globals]))

(defn from [ast-node tokens]
  [ast-node (vec tokens)])

(defn null [tokens]
  (from nil (vec tokens)))

(defn- token-src [token]
  (str "(" @globals/file-name ":" (:line token) ":" (:col token) ")"))

#_{:clj-kondo/ignore [:clojure-lsp/unused-public-var]}
(defn debug [[expr tokens]]
  (prn "DEBUG:")
  (prn "EXPR::" expr)
  (println "\n")
  (prn "TOKENS::" tokens)
  (from expr tokens))

(defn- resolve-case
  "Helper for resolving parse-maps.
   #### Supported Patterns:
     - {:id parse-id}
     - {[:id :colon] parse-obj-key}
     - {#{:onDone, :onError} parse-invoke-result}"
  [parse-map tokens]
  (some
   (fn [[pattern f]]
     (when
      (cond
        (set? pattern) (pattern (-> tokens first :type))
        (vector? pattern) (= pattern (->> tokens (take (count pattern)) (map :type)))
        (keyword? pattern) (-> tokens first :type (= pattern))
        :else (= pattern 'otherwise))
       f))
   parse-map))

(defn then [then-fn keyword [expr tokens]]
  (let [[expr' tokens] (then-fn tokens)]
    (from (merge expr {keyword expr'}) tokens)))

;; this is generally a code-smell
(defn fmap [map-fn [expr tokens]]
  (from (map-fn expr) tokens))

(defn peek-next [tokens]
  (-> tokens first :type))

(defn many-case-until
  ([end-token-type parse-map [_ tokens]]
   (loop [exprs [], tokens tokens]
     (cond
       (-> tokens first :type (= end-token-type)) (from exprs tokens)
       (not (resolve-case parse-map tokens)) (from exprs tokens)
       :else (let [f (resolve-case parse-map tokens)
                   [expr tokens] (f tokens)]
               (recur (conj exprs expr) tokens)))))
  ([end-token-type parse-map kw [expr tokens]]
   (->> (many-case-until end-token-type parse-map [nil tokens])
        (fmap (partial assoc expr kw)))))

(defn many-case
  ([parse-map kw [expr tokens]]
   (many-case-until nil parse-map kw [expr tokens]))
  ([parse-map [expr tokens]]
   (many-case-until nil parse-map [expr tokens])))

(defn parse-until
  ([token-type parse-fn kw [prev-expr tokens]]
   (loop [exprs [], tokens tokens]
     (if (-> tokens first :type (= token-type))
       (from (merge prev-expr {kw exprs}) tokens)
       (let [[expr tokens] (parse-fn tokens)]
         (recur (conj exprs expr) tokens)))))
  ([token-type parse-fn [prev-expr tokens]]
   (->> (parse-until token-type parse-fn :temp [prev-expr tokens])
        (fmap :temp))))

(defn one [token-type kw [expr tokens]]
  (assert (seq tokens) (str "Expected " token-type ", but reached end of file"))
  (let [[token & rest] tokens]
    (assert (-> token :type (= token-type)) (str "Expected " token-type " got " (-> token :type) ". " (token-src token)))
    (->> (from (merge expr {kw (token :value)}) rest))))

(defn skip [token-type [expr tokens]]
  (let [[_ tokens] (one token-type :unused [nil tokens])]
    (from expr tokens)))

(defn one-case
  ([parse-map kw [expr tokens]]
   (let [token (first tokens)
         f (resolve-case parse-map tokens)]
     (assert (fn? f) (str "Expected one of " (keys parse-map) " got " (-> token :type) " " (token-src token)))
     (then f kw [expr tokens])))
  ([parse-map kw fallback [expr tokens]]
   (if (-> tokens first :type parse-map fn?)
     (one-case parse-map kw [expr tokens])
     (from (merge expr {kw fallback}) tokens)))
  ([parse-map [expr tokens]]
   (->> (one-case parse-map :unused [expr tokens])
        (fmap :unused))))

(defn either [token-set kw [expr tokens]]
  (let [[token & rest] tokens]
    (assert (token-set (token :type)) (str "Expected one of " token-set " got " (token :type) " @ " (token-src token)))
    (from (merge expr {kw (token :value)}) rest)))
