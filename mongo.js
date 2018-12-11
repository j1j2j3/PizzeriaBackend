const mongoose = require('mongoose')


const url = 'mongodb://pizza:pizza123@ds163034.mlab.com:63034/pizza'

mongoose.connect(url)

//skeema
const pizzaSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
  })
  
  const Pizza = mongoose.model('Pizza', pizzaSchema);


const pizza = new Pizza({
    content: 'Testipizza',
    date: new Date(),
    important: false
  })

  // hakee tallennetut pizzat
  Pizza
  .find({})
  .then(result => {
    result.forEach(pizza => {
      console.log(pizza)
    })
    mongoose.connection.close()
  })