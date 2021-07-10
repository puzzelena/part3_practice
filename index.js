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

app.get('/info', (request, response) => {
    const date = new Date();
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`);
});

app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    let id = Math.floor(Math.random() * 1001);
    const usedIds = persons.map(person => person.id);

    while (usedIds.find(usedId => usedId === id)) {
        id = Math.floor(Math.random() * 1001);
    }
    return id;
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