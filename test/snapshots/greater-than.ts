
function log() {

return console.log(this)
}
log.bind((greater_than.bind(1)(0)))()