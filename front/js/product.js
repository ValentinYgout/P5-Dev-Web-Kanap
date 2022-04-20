const url = window.location.href
const strs = url.split('id=');
const id = strs.at(-1)
console.log('URL ' + id)



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

    console.log('Product ' + product._id)


    document.querySelector("body > main > div > section > article > div.item__img > img").src = product.imageUrl
    document.querySelector("body > main > div > section > article > div.item__img > img").alt = product.altTxt
    let title = document.getElementById('title')
    title.innerHTML = product.name
    let price = document.getElementById('price')
    price.innerHTML = product.price
    let description = document.getElementById('description')
    description.innerHTML = product.description


    let Colors = document.getElementById('colors');
    for (let i = 0; i < product.colors.length; i++) {
        let option = new Option(product.colors[i], product.colors[i])
        console.log(option.value);

        Colors.appendChild(option)








    }



}
renderProduct()
console.log("testttt" +id)
let cart=[];

  function addToCart(){
    let title = document.getElementById('title').innerHTML
    let price = document.getElementById('price').innerHTML
    let quantity = document.getElementById('quantity').value
    let imageUrl = document.querySelector("body > main > div > section > article > div.item__img > img").getAttribute('src')
    let altTxt = document.querySelector("body > main > div > section > article > div.item__img > img").getAttribute('alt')
    if (quantity>0){

        cart.push({
            title: title,
            price: price,
            quantity: quantity,
            imageUrl: imageUrl,
            altTxt: altTxt
            })
        console.log(cart)
    }
  

    localStorage.setItem("order",JSON.stringify(cart))
    
    
}

let AddToCartButton = document.getElementById('addToCart');
AddToCartButton.addEventListener('click',addToCart)
