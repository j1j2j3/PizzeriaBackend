const mongoose = require('mongoose')

const url = ''

mongoose.connect(url)
mongoose.Promise = global.Promise

const Pizza = mongoose.model('Pizza', {
  content: String,
  date: Date,
  
})

module.exports = Pizza