require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint'})
}
const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if(error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if(error.name === 'ValidationError'){
        return res.status(400).json({ error: error.message })
    }

    next(error)
}

morgan.token('body', (req, res) => {return JSON.stringify(req.body)})

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan('tiny', {
    skip: (req, res) => {return res.statusCode !== 400}
}))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: (req,res) => {return res.statusCode === 400}
}))


const Person = require('./models/person')

//koodi alkaa, GET
/*app.get('/', (req, res) => {
    res.send('<h1>puhelinluettelo backend</h1>')
})*/

app.get('/info', (req, res) => {
    Person.find({}).then(persons => {
        const personsAmount = persons.length
        const dateTime = new Date()
        res.send(`<p>Phonebook has info for ${personsAmount} people</p><p>${dateTime}</p>`)
    })
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if(person){
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

//DELETE
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(person => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

///POST
app.post('/api/persons', (req, res, next) => {
    const person = req.body

    if(person.name === undefined|| person.number === undefined) {
        return res.status(400).json({ 
            error: 'name or number missing' 
        })
    }

    const newPerson = new Person({
        name: person.name,
        number: person.number,
    })

    newPerson.save()
        .then(savedPerson => savedPerson.toJSON())
        .then(savedAndFormattedPerson => res.json(savedAndFormattedPerson))
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const person = req.body
    const newPerson = {
        name: person.name,
        number: person.number,
    }

    Person.findByIdAndUpdate(req.params.id, newPerson, {new: true})
        .then(updatedPerson => {
            res.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use(unknownEndpoint)
app.use(errorHandler)