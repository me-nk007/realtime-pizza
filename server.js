// Creating a server    
require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')


// Database Connection
// Code snippet to connect server to databse, can be reused.
const url = 'mongodb://localhost/pizza';
mongoose.connect('mongodb://127.0.0.1:27017/pizza');          
const connection = mongoose.connection;
connection.on('error', (err) => {
    console.error('Connection failed:', err);
});

connection.once('open', () => {
    console.log('Database Connected...');
});


// Session store : Storing sessions in MongoDB Database
// let mongoStore = new MongoDbStore({
//             mongooseConnection: connection,
//             collection: 'sessions'
//         })


let mongoStore = MongoDbStore.create({
            mongoUrl : url,
            collection: "sessions"
        });


// Session Config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/pizza'
    }),
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*24}      // 24 hours
}))


app.use(flash())                        // To flash the cookie inside request and response header




// Assets
app.use(express.static('public'))
app.use(express.json())


// Set Global Middleware
app.use((req, res, next)=>{
    res.locals.session = req.session
    next()
})

// set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web.js')(app);


app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})