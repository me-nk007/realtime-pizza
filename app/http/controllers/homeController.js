const Menu = require('../../models/menu.js')

function homeController(){
    return{
         index : async function(req,res){
            // Menu.find().then(function(pizzas){
            //     console.log(pizzas)
            //     res.render('home', {pizzas: pizzas});
            // })

            const pizzas = await Menu.find()
            res.render('home', {pizzas: pizzas});
            
        }
    }
}

module.exports = homeController;