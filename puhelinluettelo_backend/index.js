const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

morgan.token('body', (req, res) => {return JSON.stringify(req.body)})

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny', {
    skip: (req, res) => {return res.statusCode !== 400}
}))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: (req,res) => {return res.statusCode === 400}
}))

let persons = [
    { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
    },
    { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
    },
    { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
    },
    { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
    }
]


//koodi alkaa, GET
app.get('/', (req, res) => {
    res.send('<h1>puhelinluettelo backend</h1>')
})

app.get('/info', (req, res) => {
    const personsAmount = persons.length
    const dateTime = new Date()
    res.send(`<p>Phonebook has info for ${personsAmount} people</p><p>${dateTime}</p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        res.json(person)
    } else {
        res.status(404).end()
    }
})

//DELETE
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons =  persons.filter(person => person.id !== id)

    res.status(204).end()
})

//POST
app.post('/api/persons', (req, res) => {
    const person = req.body

    if(person.name === undefined|| person.number === undefined) {
        return res.status(400).json({ 
            error: 'name or number missing' 
        })
    }

    if(persons.find((p) => p.name === person.name)){
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    person.id = Math.floor(Math.random()*9999999999999)

    persons = persons.concat(person)

    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})