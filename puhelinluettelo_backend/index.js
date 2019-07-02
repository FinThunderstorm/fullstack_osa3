require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

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

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        if(person){
            res.json(person)
        } else {
            res.status(404).end()
        }
    })
})

//DELETE
app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id).then(person => {
        res.status(204).end()
    })
})

///POST
app.post('/api/persons', (req, res) => {
    const person = req.body

    if(person.name === undefined|| person.number === undefined) {
        return res.status(400).json({ 
            error: 'name or number missing' 
        })
    }

    Person.find({}).then(persons => {
        if(persons.find((p) => p.name === person.name)){
            return res.status(400).json({
                error: 'name must be unique'
            })
        }
    })

    const newPerson = new Person({
        name: person.name,
        number: person.number,
    })

    newPerson.save().then(savedPerson => {
        res.json(savedPerson.toJSON())
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})