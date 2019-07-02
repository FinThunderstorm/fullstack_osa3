const mongoose = require('mongoose')

if( process.argv.length<3 ) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://pg:${password}@pg-fullstackopen-2019-awvs9.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)





if( process.argv.length === 3) {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else if( process.argv.length > 3){
    const person = new Person({
        name: `${process.argv[3]}`,
        number: `${process.argv[4]}`,
    })

    person.save().then(response => {
        console.log('person saved!')
        console.log(response)
        mongoose.connection.close()
    })
}