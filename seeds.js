
require("dotenv/config");
const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI
mongoose.connect(mongoURI)
	.then(db => console.log(`connected to database`))
	.catch(err => console.log(err))
    
const Celebrity = require('./models/celebrity')

const celebrities = [
	{
	    name: "Kim Kardashian",
        occupation: "Unknown",
        catchPhrase: "I am rich somehow"
	},
	{
		name: "Cristiano Ronaldo",
        occupation: "Footballer",
        catchPhrase: "Siiiiiiiiiii"
	},
	{
		name: "Dave Grohl",
        occupation: "Singer",
        catchPhrase: "I was in a band with Kurt Cobain"
	}
]

Celebrity.insertMany(celebrities)
.then((celebrities) => {
    console.log(`Success - added ${celebrities.length} books to the db`)
    mongoose.connection.close()
})
.catch(err => console.log(err))

