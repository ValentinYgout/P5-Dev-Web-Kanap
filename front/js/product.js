const id = getParamUrl(paramName = "id");

// gather product data from api, based on ID from getParamURL()
async function getProduct(id) {
    let url = `http://localhost:3000/api/products/${id}`;
    console.log(url)
    try {
        let res = await fetch(url);
        return res.json();
    } catch (err) {
        console.log(error);
    }
}
// dynamically render product data  from getProduct()
async function renderProduct() {

    let product = await getProduct(id);
    let img = document.querySelector("article img");

    img.src = product.imageUrl;
    img.alt = product.altTxt;

    let title = document.getElementById('title');
    title.innerHTML = product.name;
    let price = document.getElementById('price');
    price.innerHTML = product.price;
    let description = document.getElementById('description');
    description.innerHTML = product.description;


    let colors = document.getElementById('colors');
    // let optionReset = document.querySelector("#colors > option")
    // colors.removeChild(optionReset)
    for (let i = 0; i < product.colors.length; i++) {
        let option = new Option(product.colors[i], product.colors[i]);
        colors.appendChild(option);
    }
}
renderProduct();

function getCart(item = "cart") {

    let cart = localStorage.getItem(item);
    cart = JSON.parse(cart);
    return cart;
}

function addToCart() {
    // cart variable  contains JSON cart from getCart()
    let cart = getCart();
    let quantity = document.getElementById('quantity').value;
    let color = document.getElementById('colors').value;
    if (quantity > 0 && color !== '') { // IF QUANTITY AND COLOR ARE CORRECTLY SELECTED

        let item = {

            idColor: id + color,
            id: id,
            quantity: quantity,
            color: color
        }
        //put id,quantity and color data into a variable 

        for (let i in cart) {
            if (cart[i].idColor == item.idColor) { // If product already exists in cart, increase quantity.
                cart[i].quantity = parseInt(cart[i].quantity) + parseInt(item.quantity);
                localStorage.cart = JSON.stringify(cart);
                return;
            }
        }
        cart.push(item);
        //Send  form data from item variable to cart variable from Localstorage
        //Convert JSON data back to a string and update data in Localstorage
        localStorage.setItem('cart', JSON.stringify(cart));
        alert("Votre article a bien été ajouté à votre panier");
    } else { // IF QUANTITY AND COLOR ARE NOT CORRECTLY SELECTED
        alert("quantité ou couleur incorrectement selectionnées, veuillez corriger");
    }
}

let addToCartButton = document.getElementById('addToCart');
addToCartButton.addEventListener('click', addToCart);