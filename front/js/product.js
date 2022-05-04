
const id = new URL(window.location.href).searchParams.get("id");




let url = `http://localhost:3000/api/products/${id}`;
async function getProduct() {
    console.log(url)
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (err) {
        console.log(error);
    }
}

async function renderProduct() {
    let product = await getProduct();

    document.querySelector("body > main > div > section > article > div.item__img > img").src = product.imageUrl
    document.querySelector("body > main > div > section > article > div.item__img > img").alt = product.altTxt
    let title = document.getElementById('title')
    title.innerHTML = product.name
    let price = document.getElementById('price')
    price.innerHTML = product.price
    let description = document.getElementById('description')
    description.innerHTML = product.description


    let Colors = document.getElementById('colors');
    let optionReset = document.querySelector("#colors > option")
    Colors.removeChild(optionReset)
    for (let i = 0; i < product.colors.length; i++) {
        let option = new Option(product.colors[i], product.colors[i])
        

        Colors.appendChild(option)


    }



}
renderProduct()



function addToCart(){

      if(localStorage.getItem('cart')==null){
            localStorage.setItem('cart','[]');
      }

      let quantity = document.getElementById('quantity').value
      let color = document.getElementById('colors').value
      if (quantity>0){
          
        let cart = JSON.parse(localStorage.getItem('cart'))
        let item = {
                
            idColor: id+color,
            id:id,
            quantity: quantity,
            color: color
            }
            
            for (let i in cart) {
                if(cart[i].idColor == item.idColor)
                {
                    
                    cart[i].quantity =  parseInt(cart[i].quantity) + parseInt(item.quantity);
                    localStorage.cart = JSON.stringify(cart)
                   
                    return;
                }
            }

        cart.push(item)
        // localStorage.setItem(`${title} ${color}`,JSON.stringify(cart))
        localStorage.setItem('cart',JSON.stringify(cart))
    }
  

    
    
}

let AddToCartButton = document.getElementById('addToCart');
AddToCartButton.addEventListener('click',addToCart)
