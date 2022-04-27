let cart = localStorage.getItem("cart");
cart = JSON.parse(cart);
console.log(cart)

async function getProducts() {
    let url = 'http://localhost:3000/api/products';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}






async function renderProducts() {
    let total = 0
    for (i = 0; i < cart.length; i++) {
        let products = await getProducts();
        let product = products.find(Kanap => Kanap.name === `${cart[i].title}`)
        // let product = products.find(Kanap => Kanap.name === `${cart[i].title}`)

        let CartItems = document.getElementById('cart__items');
        let NewCartItem = document.createElement("article");
        CartItems.appendChild(NewCartItem)
        NewCartItem.setAttribute("class", "cart__item")
        NewCartItem.setAttribute("data-id", `${product._id}`)
        NewCartItem.setAttribute("data-color", `${cart[i].id}`)

        let NewDiv = document.createElement("div");
        NewDiv.setAttribute("class", "cart__item__img")
        NewCartItem.appendChild(NewDiv)

        let NewCartItemImg = document.createElement("img")
        NewCartItemImg.setAttribute("src", `${cart[i].imageUrl}`)
        NewCartItemImg.setAttribute("alt", `${cart[i].altTxt}`)
        NewDiv.appendChild(NewCartItemImg)

        let NewDiv2 = document.createElement("div");
        NewDiv2.setAttribute("class", `cart__item__content`)
        NewCartItem.appendChild(NewDiv2)

        let NewDiv3 = document.createElement("div");
        NewDiv3.setAttribute("class", `cart__item__content__description`)
        NewDiv2.appendChild(NewDiv3)

        let NewH2 = document.createElement("h2");
        NewH2.innerHTML = `${cart[i].title}`
        NewDiv2.appendChild(NewH2)

        let NewP = document.createElement("p");
        NewP.innerHTML = `${cart[i].color}`
        NewDiv2.appendChild(NewP)

        let Newp2 = document.createElement("p");
        Newp2.innerHTML = `${product.price} €`
        NewDiv3.appendChild(Newp2)

        let NewDiv4 = document.createElement("div");
        NewDiv4.setAttribute("class", `cart__item__content__settings`)
        NewDiv2.appendChild(NewDiv4)

        let NewDiv5 = document.createElement("div");
        NewDiv5.setAttribute("class", `cart__item__content__settings__quantity`)
        NewDiv4.appendChild(NewDiv5)
        let QuantityP = document.createElement("p");
        QuantityP.innerHTML = `Qté`
        NewDiv5.appendChild(QuantityP)
        let QuantityInput = document.createElement("input");
        QuantityInput.setAttribute("class", `itemQuantity`)
        QuantityInput.setAttribute("type", `number`)
        QuantityInput.setAttribute("name", `itemQuantity`)
        QuantityInput.setAttribute("min", `1`)
        QuantityInput.setAttribute("max", `100`)
        QuantityInput.setAttribute("value", `${cart[i].quantity}`)
        NewDiv5.appendChild(QuantityInput)

        let NewDiv6 = document.createElement("div");
        NewDiv6.setAttribute("class", `cart__item__content__settings__delete`)
        NewDiv4.appendChild(NewDiv6)
        let RemoveP = document.createElement("p");
        RemoveP.innerHTML = `Supprimer`
        RemoveP.setAttribute("class", `deleteItem`)
        NewDiv6.appendChild(RemoveP)

        //      // console.log(product)
        function TotalPrice() {

            total += parseInt(product.price) * parseInt(cart[i].quantity)
            // console.log(total, product.price * cart[i].quantity, product.price, cart[i].quantity)
            let totalPrice = document.getElementById('totalPrice')
            totalPrice.innerHTML = total;
        }
        TotalPrice()

    }
    let inputQuantity = document.querySelectorAll('.itemQuantity')
    inputQuantity.forEach(inputQuantity=>{
        inputQuantity.addEventListener('change', updateValue)

    })
    
    async function updateValue(e) {
        console.log("test")
        total = 0
        for (let i = 0; i < cart.length; i++) {
            if (e.target.parentNode.parentNode.parentNode.parentNode.dataset.color == cart[i].id) {
                cart[i].quantity = e.target.value;
                localStorage.cart = JSON.stringify(cart)
            }
            let products = await getProducts();
            let product = products.find(Kanap => Kanap.name === `${cart[i].title}`)
            total += parseInt(product.price) * parseInt(cart[i].quantity)
            // console.log(total)

        }
        totalPrice.innerHTML = total;
    }


  
  

    let deleteItem = document.querySelectorAll('.deleteItem')
    deleteItem.forEach(deleteItem=>{
        deleteItem.addEventListener('click', deleteProduct)

    })

    function deleteProduct(e){
        console.log("test")

        for(let i=0; i<cart.length;i++){
            console.log(cart[i].id, "and",e.target.parentNode.parentNode.parentNode.parentNode.dataset.color)
            if(cart[i].id===e.target.parentNode.parentNode.parentNode.parentNode.dataset.color){
                cart.splice(i,1)
                localStorage.cart = JSON.stringify(cart)
                e.target.parentNode.parentNode.parentNode.parentNode.remove()
                updateValue(e)


                return
                
            }
        }
    }







}


renderProducts();

let firstName = document.getElementById('firstName')
let firstNameErrorMsg = document.getElementById('firstNameErrorMsg')

let lastName = document.getElementById('lastName')
let lastNameErrorMsg = document.getElementById('lastNameErrorMsg')

let address = document.getElementById('address')
let addressErrorMsg = document.getElementById('addressErrorMsg')

let city = document.getElementById('city')
let cityErrorMsg = document.getElementById('cityErrorMsg')


let email = document.getElementById('email')
let emailErrorMsg = document.getElementById('cityErrorMsg')



let form = document.querySelector('form.cart__order__form')
// let form = document.querySelector('input#order')

let productId=[]

form.addEventListener('click',(e)=>{
    console.log('testsubmit')
   if(firstName.value ===''||firstName.value==null){
    console.log('testsubmit2')
       e.preventDefault()
    firstNameErrorMsg.innerHTML='Vous devez entrer un nom'
   }
})








// let cart = localStorage.getItem("Kanap Sinopé Blue");
// cart = JSON.parse(cart);
// console.log(cart)

// async function getProducts() {
//     let url = 'http://localhost:3000/api/products';
//     try {
//         let res = await fetch(url);
//         return await res.json();
//     } catch (error) {
//         console.log(error);
//     }
// }






// async function renderProducts() {
//     let products = await getProducts();

//     products.forEach(product => {

//         // let FindItem = products.find(Kanap => Kanap.name ===`${cart[0].title}`
//         let Cartitem ='CartItem'

//         for (let i = 0; i < cart.length; i++) {
//             let FindItem = "products.find(Kanap => Kanap.name ==="+cart[i]+".title"

//              eval('let' + Cartitem + i +'= '+FindItem)
//              console.log("CartItem1 = " + CartItem0);

//         }



//         let Items = document.getElementById('cart__items');

//         Items.innerHTML =
//             `


//                  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
//                         <div class="cart__item__img">
//                             <img src="${cart[0].imageUrl}" alt="${cart[0].altTxt}">
//                         </div>
//                         <div class="cart__item__content">
//                         <div class="cart__item__content__description">
//                             <h2>${cart[0].title}</h2>
//                             <p>${cart[0].color}</p>
//                             <p>${CartItem.price} €</p>
//                         </div>
//                         <div class="cart__item__content__settings">
//                             <div class="cart__item__content__settings__quantity">
//                             <p>Qté : </p>
//                             <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[0].quantity}">
//                             </div>
//                             <div class="cart__item__content__settings__delete">
//                             <p class="deleteItem">Supprimer</p>
//                             </div>
//                         </div>
//                         </div>
//               </article>

//     `


//     let totalPrice = document.getElementById('totalPrice')
//     let total= product.price * cart[0].quantity
//     totalPrice.innerHTML=total





//     });

// };




// renderProducts();