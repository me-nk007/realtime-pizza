const User = require('../../models/user.js')
const bcrypt = require('bcrypt')
function authController(){
    return{
        login :  function(req,res){
            res.render('auth/login')
        },
        register : function(req,res){
            res.render('auth/register')
        },
        postRegister: async function(req,res){
            const {name, email, password} = req.body;      // using object Destructuring in JS
            // Validate request : flash is a middleware which is used to validate requestbefore sending it to the server.
            if(!name || !email || !password){
                req.flash('error', 'All fields are required')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/register')
            }

           // Check if email exists
        //    User.exists({email: email}, (error, result) =>{
        //     if(result){
        //         req.flash('error', 'Email already exists !!')
        //         req.flash('name', name)
        //         req.flash('email', email)
        //         return res.redirect('/register')
        //     }
        //    }) 

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
           const user= new User({    //Using user.js model to create a user after all validation
            name : name,
            email : email,
            password : hashedPassword
           })

           user.save().then((user) =>{
                // Login


                return res.redirect('/')
           }).catch((error) =>{
            req.flash('error', 'Something went wrong !!')
            return res.redirect('/register')

           })
            console.log(req.body)
        }
    }
}

module.exports = authController;