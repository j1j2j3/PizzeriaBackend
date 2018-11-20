
//ottaa käyttöön webpalvelimen
//const http = require('http')
//luo palvelimen metodilla + rekisteröi tapahtumakäsittelijän
//const app = http.createServer((req, res) => {
  //res.writeHead(200, { 'Content-Type': 'text/plain' })
  //res.end('Hello World')
//})
//kuuntelee porttiin 3001 tulevia http pyyntöjä

const express = require('express')
const app = express()
//post 
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require('cors')

app.use(cors())
let notes = [
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
  
 /* const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes))
  })

  const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)
*/
/*app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })*/
  app.get('/api/notes', (req, res) => {
    res.json(notes)
  })
  app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
  
    if ( note ) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })

    app.delete('/api/notes/:id', (request, response) => {
        const id = Number(request.params.id)
        notes = notes.filter(note => note.id !== id)
      
        response.status(204).end()
      })
  //http get pyyntö note/jotain

  /*const generateId = () => {
    const maxId = notes.length > 0 ? notes.map(n => n.id).sort((a,b) => a - b).reverse()[0] : 1
    return maxId + 1
  }*/

  const generateId = () => {
    const maxId = notes.length > 0 ? notes.map(n => n.id).sort((a,b) => a - b).reverse()[0] : 1
    return maxId + 1
  }
  app.post('/api/notes', (request, response) => {
    /*const maxId = notes.length > 0 ? notes.map(n => n.id).sort((a,b) => a - b).reverse()[0] : 1
    //testaukseen esim postmanilla
    const note = request.body
    //console.log(note)
    note.id = maxId + 1

    notes = notes.concat(note)
  
    response.json(note)*/
    const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({error: 'content missing'})
  }

  const note = {
    content: body.content,
    important: body.important|| false,
    date: new Date(),
    id: generateId()
  }

  notes = notes.concat(note)

  response.json(note)
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