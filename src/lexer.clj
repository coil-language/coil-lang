(ns lexer
  (:require [utils.lexing :refer [make-tokenizer]]))

(def ^:private tokens
  [{:regex #"#.*"           :ignore true}
   {:regex #"^if\b"         :keyword :if}
   {:regex #"^else\b"       :keyword :else}
   {:regex #"^let\b"        :keyword :let}
   {:regex #"^\="           :keyword :eq}
   {:regex #"^fn\b"         :keyword :fn}
   {:regex #"^\{"           :keyword :open-b}
   {:regex #"^\}"           :keyword :close-b}
   {:regex #"^\("           :keyword :open-p}
   {:regex #"^\)"           :keyword :close-p}
   {:regex #"\."            :keyword :dot}
   {:regex #"^\>"           :keyword :gt}
   {:regex #"^\<"           :keyword :lt}
   {:regex #"^\+"           :keyword :plus}
   {:regex #"^\-"           :keyword :minus}
   {:regex #"^\*"           :keyword :times}
   {:regex #"^\/"           :keyword :div}
   {:regex #"^\*\*"         :keyword :pow}
   {:regex #"^\["           :keyword :open-sq}
   {:regex #"^\]"           :keyword :close-sq}
   {:regex #"^(\d*\.)?\d+"  :keyword :num}
   {:regex #"\".*\""        :keyword :string-lit}
   {:regex #"^[a-zA-Z_]+"   :keyword :id}])

(def tokenize (make-tokenizer tokens))
