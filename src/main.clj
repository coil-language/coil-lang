(ns main
  (:require [clojure.string :as string]
            js
            lexer
            parser
            [utils.globals :as globals]))

(defn expand-home [s]
  (if (.startsWith s "~")
    (clojure.string/replace-first s "~" (System/getProperty "user.home"))
    s))

(defn compile-from-str [program-str]
  (->> program-str
       (#(let [tokens (lexer/tokenize %)]
           (reset! globals/file-src %)
           (reset! globals/tokens tokens)
           tokens))
       parser/parse
       js/eval-js))

(defn compile-and-spit [src-file out-file]
  (try
    (reset! globals/file-name src-file)
    (->> (slurp src-file)
         compile-from-str
         (spit (expand-home out-file)))
    (catch java.io.FileNotFoundException e
      (println "Error:" (.getMessage e)))))

#_{:clj-kondo/ignore [:clojure-lsp/unused-public-var]}
(defn run [opts]
  ;; (reset! globals/emit-std false)

  (let [src-file (str ('src opts))
        out-file (str ('out opts))]
    (prn "SRC:" src-file " OUT:" out-file)
    (compile-and-spit src-file out-file)))

#_{:clj-kondo/ignore [:clojure-lsp/unused-public-var]}
(defn snapshot [opts]
  (reset! globals/emit-std false)
  (let [src-file (str ('src opts))
        name (str ('name opts))
        src (slurp src-file)
        js (compile-from-str src)]
    (spit (str "test/snapshots/" name ".coil") src)
    (spit (str "test/snapshots/" name ".js") js)))
