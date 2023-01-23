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

(defn- parse-num [tokens]
  (->> (p/from {:type :num} tokens)
       (p/one :num :value)))

(defn- parse-dot [lhs tokens]
  (->> (p/from {:type :property-lookup, :lhs lhs} tokens)
       (p/skip :dot)
       (p/one :id :property)))

(defn- parse-fn-call [lhs tokens]
  (->> (p/from {:type :fn-call, :lhs lhs} tokens)
       (p/skip :open-p)
       (p/parse-until :close-p parse-expr :args)
       (p/skip :close-p)))

(def math-ops #{:plus :minus :times :pow :div})

(defn- parse-math-op [lhs tokens]
  (->> (p/from {:type :math-op, :lhs lhs} tokens)
       (p/either math-ops :op)
       (p/then parse-expr :rhs)))

(defn- parse-snd-expr [[lhs tokens]]
  (loop [lhs lhs, tokens tokens]
    (if-let [[expr tokens]
             (case (p/peek-next tokens)
               :dot (parse-dot lhs tokens)
               :open-p (parse-fn-call lhs tokens)
               (when (math-ops (p/peek-next tokens)) (parse-math-op lhs tokens)))]
      (recur expr tokens)
      (p/from lhs tokens))))

(defn- parse-array [tokens]
  (->> (p/from {:type :array} tokens)
       (p/skip :open-sq)
       (p/parse-until :close-sq parse-expr :elements)
       (p/skip :close-sq)))

(defn- parse-assign-expr [tokens]
  (->> (p/null tokens)
       (p/one :id :name)))

(defn- parse-fn-name [tokens]
  (->> (p/null tokens)
       (p/one :id :name)
       (p/fmap :name)))

(defn- parse-args-def [tokens]
  (->> (p/from {:type :args} tokens)
       (p/skip :open-p)
       (p/parse-until :close-p parse-assign-expr)
       (p/skip :close-p)))

(defn- parse-fn-expr-body [tokens]
  (->> (p/from {:type :return} tokens)
       (p/skip :eq)
       (p/then parse-expr :expr)
       (p/fmap vector)))

(defn- parse-fn [tokens]
  (->> (p/from {:type :fn} tokens)
       (p/skip :fn)
       (p/one-case {:id parse-fn-name} :name nil)
       (p/then parse-args-def :args)
       (p/one-case
        {:eq parse-fn-expr-body,
         'otherwise nil} :body)))

(defn- parse-expr [tokens]
  (->> (p/null tokens)
       (p/one-case
        {:string-lit parse-str,
         :id parse-id,
         :num parse-num,
         :open-sq parse-array,
         :fn parse-fn})
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

(defn- parse-let [tokens]
  (->> (p/from {:type :let} tokens)
       (p/skip :let)
       (p/then parse-assign-expr :assign-expr)
       (p/skip :eq)
       (p/then parse-expr :rhs)))

(defn- parse-if-let [tokens]
  (->> (p/from {:type :if-let} tokens)
       (p/skip :if)
       (p/skip :let)
       (p/then parse-assign-expr :assign-expr)
       (p/skip :eq)
       (p/then parse-expr :expr)
       (p/skip :open-b)
       (p/parse-until :close-b parse-statement :pass)
       (p/skip :close-b)
       (p/one-case {:else parse-else-branch} :fail [])))

(defn- parse-statement [tokens]
  (->> (p/null tokens)
       (p/one-case
        (array-map
         [:if :let] parse-if-let,
         :if parse-if,
         :let parse-let,
         'otherwise parse-expr))))

(defn parse [tokens]
  (loop [ast-list [], rest-tokens tokens]
    (if (empty? rest-tokens)
      ast-list
      (let [[ast-node rest-tokens] (parse-statement rest-tokens)]
        (recur (conj ast-list ast-node) rest-tokens)))))
