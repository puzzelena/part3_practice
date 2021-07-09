const express = require('express') // importing express function
const app = express() // that is used to create an express application stored in the app variable

app.use(express.json()) // access the data

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

app.get('/api/persons/:id', (request, response) => { // will handle all HTTP GET requests, that are of the form /api/persons/SOMETHING, where SOMETHING is an arbitrary string
    const id = Number(request.params.id) // The id parameter in the route of a request, can be accessed through the request object
    console.log(id)
    const person = persons.find(person => {
    person.id === id // find method of arrays is used to find the note with an id that matches the parameter.

    if (person) {
        response.json(person)
      } else {
        response.status(404).end() // Since no data is attached to the response, we use the status method for setting the status, 
      } // The note is then returned to the sender of the request
  })
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id)) // creates a new array that contains all the ids of the notes
      : 0
    return maxId + 1
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({  // If the received data is missing a value for the content property, the server will respond to the request with the status code 400 bad request
        error: 'content missing'  // However, notes.map(n => n.id) is an array so it can't directly be given as a parameter to Math.max. The array can be transformed into individual numbers by using the "three dot" spread syntax ....
      })
    }
  
    const person = {
      content: body.content,
      important: body.important || false, // If the important property is missing, we will default the value to false
      date: new Date(),
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

  const PORT = 3001
  app.listen(PORT)
  console.log(`Server running on port ${PORT}`)