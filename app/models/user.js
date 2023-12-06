// This is a model. model represents the tables/collections inside the Database.
// VVI Note : If we name this model anything (in this case, it is 'menu', so in databse we have to name the table in plural form (in this case, 'menus' is named in the database...))


// Creating a table/collection in the database
const mongoose = require('mongoose')
const Schema = mongoose.Schema       // in JS, if any variable is started with a capital letter then that variable must be storing is either a class or a constructor function which is called in a different way.Now let's see how is it called

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default:'customer' },
}, { timestamps: true})


// Making a model out of the schema,it contains two parameters : 1)name of the model which should be in singular form so that the DB can create tables/collections in plural form. 2) Name of the schema.

// and exporting it.

module.exports = mongoose.model('User', userSchema)