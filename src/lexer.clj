(ns lexer
  (:require [utils.lexing :refer [make-tokenizer]]))

(def ^:private tokens
  [{:regex #"\/\/.*"              :ignore true}
   {:regex #"^#"                  :keyword :hash}
   {:regex #"^if\b"               :keyword :if}
   {:regex #"^else\b"             :keyword :else}
   {:regex #"^let\b"              :keyword :let}
   {:regex #"^protocol\b"         :keyword :protocol}
   {:regex #"^for\b"              :keyword :for}
   {:regex #"^impl\b"             :keyword :impl}
   {:regex #"^\=\="               :keyword :double-eq}
   {:regex #"^\!\="               :keyword :not-eq}
   {:regex #"^\!"                 :keyword :not}
   {:regex #"^\="                 :keyword :eq}
   {:regex #"^fn\b"               :keyword :fn}
   {:regex #"^\{"                 :keyword :open-b}
   {:regex #"^\}"                 :keyword :close-b}
   {:regex #"^\("                 :keyword :open-p}
   {:regex #"^\)"                 :keyword :close-p}
   {:regex #"^[\-\+]?(\d*\.)?\d+" :keyword :num}
   {:regex #"\."                  :keyword :dot}
   {:regex #"^\>\="               :keyword :gt-eq}
   {:regex #"^\<\="               :keyword :lt-eq}
   {:regex #"^\>"                 :keyword :gt}
   {:regex #"^\<"                 :keyword :lt}
   {:regex #"^\+"                 :keyword :plus}
   {:regex #"^\-"                 :keyword :minus}
   {:regex #"^\*\*"               :keyword :pow}
   {:regex #"^\*"                 :keyword :times}
   {:regex #"^\:\:"               :keyword :double-colon}
   {:regex #"^\:"                 :keyword :colon}
   {:regex #"^\/"                 :keyword :div}
   {:regex #"^\["                 :keyword :open-sq}
   {:regex #"^\]"                 :keyword :close-sq}
   {:regex #"(?s)\"([^\\\"]|\\.)*\"" :keyword :string-lit}
   {:regex #"^[a-zA-Z_\?\!]+"     :keyword :id}])

(def tokenize (make-tokenizer tokens))
