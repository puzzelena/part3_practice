const express = require('express') // importing express function
const morgan = require('morgan');
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

morgan.token('data',(request, response) => {
    return request.method === 'POST'
        ? JSON.stringify(request.body)
        : null;
});

app.use(morgan((tokens, request, response) => {
    return [
        tokens.method(request, response),
        tokens.url(request, response),
        tokens.status(request, response),
        tokens.res(request, response, 'content-length'), '-',
        tokens['response-time'](request, response), 'ms',
        tokens.data(request, response)
    ].join(' ')
}));

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
    if (!request.body.name || !request.body.number) {
        return response.status(404).json({
            error: 'The name or number is missing'
        });
    }
    else if (persons.find(person => person.name.toLowerCase() === request.body.name.toLowerCase())) {
        return response.status(404).json({
            error: 'name must be unique'
        });
    }
    const person = {
        name: request.body.name,
        number: request.body.number,
        id: generateId()
    }

    persons = persons.concat(person);
    response.json(person);
});


  const PORT = 3001
  app.listen(PORT)
  console.log(`Server running on port ${PORT}`)