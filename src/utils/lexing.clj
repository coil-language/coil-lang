(ns utils.lexing
  (:require [clojure.string :as string]))

(defn- match-token [program-str {:keys [regex keyword ignore]}]
  (let [match-result (re-matcher regex program-str)
        start? (try (-> match-result .find)
                    (-> match-result .start
                        (= 0))
                    (catch Exception _ nil))]
    (cond start? (->> match-result
                      .group
                      (assoc {:type keyword, :ignore ignore} :value)))))

(defn- has-new-line? [s]
  (->> (re-find #".*[\r\n|\r|\n]" s)
       boolean))

(defn- tokens-to-skip [result]
  (case result
    nil 1
    (count (:value result))))

(defn- line-and-col [prev-line prev-col program-str skip-count]
  (let [current-str (subs program-str 0 skip-count)
        line (if (has-new-line? current-str)
               (inc prev-line)
               prev-line)
        col (if (= line prev-line)
              (+ (count current-str) prev-col)
              (inc (count (->> current-str string/split-lines last))))]
    [line col]))

(defn make-tokenizer [tokens]
  (fn [program-str]
    (loop [token-list [],
           rest-of-program program-str,
           line 1, col 1]
      (if (empty? rest-of-program)
        (->> token-list
             (map #(dissoc % :ignore))
             vec)
        (let [result (some #(match-token rest-of-program %) tokens)
              skip-count (tokens-to-skip result)
              next-str (subs rest-of-program skip-count)
              [line' col'] (line-and-col line col rest-of-program skip-count)
              result (if (or (nil? result) (:ignore result))
                       result
                       (assoc result :line line :col col))]
          (cond
            (:ignore result) (recur token-list next-str line' col')
            (nil? result) (recur token-list next-str line' col')
            :else (recur (conj token-list result) next-str line' col')))))))
