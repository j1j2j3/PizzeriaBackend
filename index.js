const express = require('express')
const app = express()
//post 
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require('cors')

app.use(cors())
const Pizza = require('./models/pizza')
let pizzat = [
    {
      id: 1,
      content: 'Kinkkupizza',
      date: '2017-12-10T17:30:31.098Z',
      important: true
    },
    {
      id: 2,
      content: 'Salami pizza',
      date: '2017-12-10T18:39:34.091Z',
      important: false
    },
    {
      id: 3,
      content: 'Kanapizza',
      date: '2017-12-10T19:20:14.298Z',
      important: true
    }
  ]

//formatointia
  const formatPizza = (pizza) => {
    return {
      content: pizza.content,
      date: pizza.date,
      id: pizza._id
    }
  }

  //hakemista vastaavat käsittelijät
  app.get('/api/pizzat', (request, response) => {
   //mongo
   Pizza
    .find({})
    .then(pizzat => {
      response.json(pizzat.map(formatPizza))
    })
  })
  app.get('/api/pizzat/:id', (request, response) => {
      Pizza
      .findById(request.params.id)
      .then(pizza => {
        response.json(formatPizza(pizza))
    })

  })
  //delete
    app.delete('/api/pizzat/:id', (request, response) => {
   
      Pizza
    .findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).send({ error: 'malformatted id' })
    })
})
  //update
  app.put('/api/pizzat/:id', (request, response) => {
    const body = request.body
  
    const pizza = {
      content: body.content,
    }
  
    Pizza
      .findByIdAndUpdate(request.params.id, pizza, { new: true } )
      .then(updatedPizza => {
        response.json(formatPizza(updatedPizza))
      })
      .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })
      })
  })
  const generateId = () => {
    const maxId = pizzat.length > 0 ? pizzat.map(n => n.id).sort((a,b) => a - b).reverse()[0] : 1
    return maxId + 1
  }
  app.post('/api/pizzat', (request, response) => {
    const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({error: 'content missing'})
  }

const pizza = new Pizza({
  content: body.content,
  date: new Date()
})

pizza
  .save()
  .then(savedPizza => {
    response.json(formatPizza(savedPizza))
  })
})

//middleware
const logger = (request, response, next) => {
  console.log('Method:',request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
//middleware
app.use(express.static('build'))
//Json muotoinen virheilmoitus, Middleware
app.use(logger)
const error = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

app.use(error)
 // })

  //const PORT = 3001
  //herokuun
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

