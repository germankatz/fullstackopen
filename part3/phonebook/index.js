const express = require('express')
var morgan = require('morgan')
const cors = require('cors')

const app = express()
// Parse json answers
app.use(express.json())

// Define custom token
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
// Morgan middleware for logging
app.use((req, res, next) => {
    if (req.method === 'POST') {
        return morgan(':method :url :status - :response-time ms :body')(req, res, next);
    } else {
        return morgan(':method :url :status - :response-time ms ')(req, res, next);
    }
});

app.use(cors())


let phonebook = [
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

app.get('/api/persons', (request, response) => {
    response.json(phonebook)
})

const generateId = () => {
    const id = Math.floor(Math.random() * 1000)
    return id
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (phonebook.find(p => p.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    phonebook.push(person)

    response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    const person = phonebook.find(p => p.id === id)

    if (!person) {
        return response.status(400).json({
            error: 'person not found'
        })
    }

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    phonebook = phonebook.filter(p => p.id != id)
    response.status(204).end()
})

app.get('/info', (request, response) => {
    const currentDate = new Date().toLocaleString();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const info = `Phonebook has info for ${phonebook.length} people <br /> ${currentDate} (${timeZone})`
    response.send(info)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})