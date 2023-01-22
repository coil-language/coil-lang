(ns snapshot-test
  (:require
   [clojure.java.io :as io]
   [clojure.string :as str]
   [clojure.test :refer [deftest is]]
   main))

(defn- write-failed-test-file [input-file actual-js]
  (let [base-file-name
        (-> input-file
            (str/split #"/")
            last
            (str/split #"\.")
            first)]
    (spit
     (str "failed-" base-file-name ".ts")
     actual-js)))

(deftest snapshot-tests
  (let [files
        (->> (io/file "test/snapshots")
             file-seq
             (map #(. % getPath))
             (filter #(re-matches #".*\.sjs" %)))]
    (doseq [file files]
      (try
        (let [src (slurp file)
              expected-js (slurp (str/replace file #"\.sjs" ".ts"))
              actual-js (main/compile-from-str src)]
          (when (not= expected-js actual-js)
            (write-failed-test-file file actual-js))
          (is (= expected-js actual-js) (str file "compiled unexpectedly")))
        (catch AssertionError e
          (is false (str "An error occurred in " file "\n Error: " e)))))))
