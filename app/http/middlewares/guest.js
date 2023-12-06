
// Since this is a middleware it has three parameters
function guest(req, res, next){  
    if(!req.isAuthenticated()){
        return next()               // res.next() means everything is alright, proceed ahead.
    }
    return res.redirect('/')
}
module.exports = guest;