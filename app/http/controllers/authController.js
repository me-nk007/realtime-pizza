const passport = require('passport')
const User = require('../../models/user.js')
const bcrypt = require('bcrypt')
function authController() {
    return {
        login: function (req, res) {
            res.render('auth/login')
        },
        postLogin: function (req, res, next) {
            // Logic of login
            passport.authenticate('local', (error, user, info) => {
                if (error) {
                    req.flash('error', info.message)    // for flash, it is also a reuest.server is requsting. : LOL, just to understand and make things simpler
                    return next(error)
                }
                if (!user) {
                    req.flash('error', info.message)    // for flash, it is also a reuest.server is requsting. : LOL, just to understand and make things simpler
                    return res.redirect('/login')
                }

                // if user exists then check for final error otherwise redirect to homepage
                req.logIn(user, (error) => {
                    if (error) {
                        req.flash('error', info.message)    // for flash, it is also a reuest.server is requsting. : LOL, just to understand and make things simpler
                        return next(error)
                    }

                    return res.redirect('/')
                })

            })(req, res, next)
        },

        register: function (req, res) {
            res.render('auth/register')
        },
        
        postRegister: async function (req, res) {
            const { name, email, password } = req.body;      // using object Destructuring in JS
            // Validate request : flash is a middleware which is used to validate requestbefore sending it to the server.
            if (!name || !email || !password) {
                req.flash('error', 'All fields are required')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/register')
            }

            // Check if email exists
            User.exists({ email: email }).then((result) => {
                if (result) {
                    req.flash('error', 'Email already exists !!');
                    req.flash('name', name);
                    req.flash('email', email);
                    return res.redirect('/register');
                }
                // Continue with your logic if the email doesn't exist
            })

            // Hash Password : We need a package called bcrypt for hashing password.
            const hashedPassword = await bcrypt.hash(password, 10)

            // Create a User
            const user = new User({    //Using user.js model to create a user after all validation
                name: name,
                email: email,
                password: hashedPassword
            })

            user.save().then((user) => {
                // Login


                return res.redirect('/')
            }).catch((error) => {
                req.flash('error', 'Something went wrong !!')
                return res.redirect('/register')

            })
        },
        // logout : function(req,res){
        //     req.logout()
        //     return res.redirect('/login')
        // }
        logout: function(req, res) {
            req.logout(function(err) {
                if (err) {
                    // Redirect to an error page or handle the error accordingly
                    return res.status(500).send('Error logging out');
                }
                // If logout succeeds, redirect to the login page
                return res.redirect('/login');
            });
        }
        
    }
}

module.exports = authController;