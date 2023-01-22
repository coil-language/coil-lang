(ns parser
  (:require [utils.parsing :as p]))

(defn- remove-quotes [s]
  (subs s 1 (dec (count s))))

(declare parse-statement)
(declare parse-expr)

(defn- parse-str [tokens]
  (->> (p/from {:type :str} tokens)
       (p/one :string-lit :value)
       (p/fmap #(assoc % :value (-> % :value remove-quotes)))))

(defn- parse-id [tokens]
  (->> (p/from {:type :id-lookup} tokens)
       (p/one :id :name)))

(defn- parse-dot [lhs tokens]
  (->> (p/from {:type :property-lookup, :lhs lhs} tokens)
       (p/skip :dot)
       (p/one :id :property)))

(defn- parse-fn-call [lhs tokens]
  (->> (p/from {:type :fn-call, :lhs lhs} tokens)
       (p/skip :open-p)
       (p/parse-until :close-p parse-expr :args)
       (p/skip :close-p)))

(defn- parse-snd-expr [[lhs tokens]]
  (loop [lhs lhs, tokens tokens]
    (if-let [[expr tokens]
             (case (-> tokens first :type)
               :dot (parse-dot lhs tokens)
               :open-p (parse-fn-call lhs tokens)
               nil)]
      (recur expr tokens)
      (p/from lhs tokens))))

(defn- parse-expr [tokens]
  (->> (p/null tokens)
       (p/one-case {:string-lit parse-str,
                    :id parse-id})
       parse-snd-expr))

(defn- parse-else-branch [tokens]
  (->> (p/null tokens)
       (p/skip :else)
       (p/skip :open-b)
       (p/parse-until :close-b parse-statement)
       (p/skip :close-b)))

(defn- parse-if [tokens]
  (->> (p/from {:type :if} tokens)
       (p/skip :if)
       (p/then parse-expr :expr)
       (p/skip :open-b)
       (p/parse-until :close-b parse-statement :pass)
       (p/skip :close-b)
       (p/one-case {:else parse-else-branch} :fail [])))

(defn- parse-statement [tokens]
  (->> (p/null tokens)
       (p/one-case {:if parse-if
                    'otherwise parse-expr})))

(defn parse [tokens]
  (loop [ast-list [], rest-tokens tokens]
    (if (empty? rest-tokens)
      ast-list
      (let [[ast-node rest-tokens] (parse-statement rest-tokens)]
        (recur (conj ast-list ast-node) rest-tokens)))))
