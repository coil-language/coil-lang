(ns utils.emit)

(defn d-quote [text]
  (str \" text \"))

(defn pad [num]
  (apply str (repeat (* 2 num) " ")))

(defn new-line [s]
  (str s \newline))
