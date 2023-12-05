let addToCart = document.querySelectorAll('.add-to-cart')
import axios from "axios"
import Noty from "noty"



let cartCounter = document.querySelector('#cartCounter')


function updateCart(pizza){
    // Send request to server and add the information to the cart
    axios.post('/update-cart',pizza).then((res) =>{
        cartCounter.innerText = res.data.totalQty;
        new Noty({
            type: 'success',
            timeout: 1000,
            text: "Item added to cart"
          }).show();
    }).catch((err) =>{
        new Noty({
            type: 'error',
            timeout: 1000,
            text: "Something  went wrong !"
          }).show();
    })
}


addToCart.forEach((btn) =>{
    btn.addEventListener('click', (e)=>{
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)


    })
})