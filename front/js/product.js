const url = window.location.href
const strs = url.split('id=');
const id = strs.at(-1)




async function getProduct() {
    let url = 'http://localhost:3000/api/products';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderProduct() {
    let products = await getProduct();
    let product = products.find(Kanap => Kanap._id === id)

    


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

      
      
      
      let title = document.getElementById('title').innerHTML
      let price = document.getElementById('price').innerHTML
      let quantity = document.getElementById('quantity').value
      let imageUrl = document.querySelector("body > main > div > section > article > div.item__img > img").getAttribute('src')
      let altTxt = document.querySelector("body > main > div > section > article > div.item__img > img").getAttribute('alt')
      let color = document.getElementById('colors').value
      if (quantity>0){
          
        let cart = JSON.parse(localStorage.getItem('cart'))
        let item = {
                
            id: title+color,
            title: title,
            // price: price,
            quantity: quantity,
            imageUrl: imageUrl,
            altTxt: altTxt,
            color: color
            }
            
            for (let i in cart) {
                if(cart[i].id == item.id)
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
