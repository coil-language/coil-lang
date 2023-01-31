;
construct_record.bind(Map)([[Collection, function (other) {
;
return concat.bind(this)(other)
}],[Plus, function (other) {
;
return this[Plus](other)
}]])