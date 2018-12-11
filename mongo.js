const mongoose = require('mongoose')


const url = 'mongodb://pizza:pizza123@ds163034.mlab.com:63034/pizza'

mongoose.connect(url)
mongoose.Promise = global.Promise

const Pizza = mongoose.model('Pizza', {
  content: String,
  date: Date
})

Pizza
  .find({})
  .then(result => {
    result.forEach(pizza => {
      console.log(pizza)
    })
    mongoose.connection.close()
  })
