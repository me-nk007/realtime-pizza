const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')

function init(passport){
    passport.use(new LocalStrategy({ usernameField : 'email'}, async (email, password, done) =>{
        // Login
        // Check if email exists
        const user = await User.findOne({ email: email})
        if(!user){
            return done(null, false, { message: "No user with this email found."})
        }
        bcrypt.compare(password, user.password).then((match) =>{
            if(match){
                return done(null, user, {message: "Logged in Successfully !!!"})
            }
            return done(null, false, { message: "Wrong username or password !!!"})
        }).catch((error) =>{
            return done(null, false, { message: "Something went wrong !!!"})
        })

    }))

    // Storing session of user which is logged in using it's _id
    passport.serializeUser((user,done) =>{
        done(null, user._id)
    })

    // Getting the details of user from database with the help of _id stored in session
    // passport.deserializeUser((id, done) =>{
    //     User.findById(id, (error, user) =>{
    //         done(error, user)
    //     })
    // })    --------> This method is deprecated in the new version of mongoose, so we have used promises below.

    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => {
                done(null, user);
            })
            .catch(error => {
                done(error, null);
            });
    });
    

    



}
module.exports = init;