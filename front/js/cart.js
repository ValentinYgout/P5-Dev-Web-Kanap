function getCart(item = "cart") {

    let cart = localStorage.getItem(item);
    cart = JSON.parse(cart);
    return cart;
}

let cart = getCart();
let total = 0;
let itemQuantity = 0;
let fetchedCartData = [];

//Render products from the cart,based on their ID in the cart, and with data from corresponding ID in the API
function renderCart() {

    for (let item of cart) {
        let url = `http://localhost:3000/api/products/${item.id}`;
        try {
            fetch(url)
                .then(function (response) {
                    return response.json()
                }).then(function (data) {
                    //    console.log(data)
                    let cartItems = document.getElementById('cart__items');
                    let newCartItem = document.createElement("article");
                    cartItems.appendChild(newCartItem);
                    newCartItem.setAttribute("class", "cart__item");
                    newCartItem.setAttribute("data-id", item.id);
                    newCartItem.setAttribute("data-color", item.color);

                    let itemImg = document.createElement("div");
                    itemImg.setAttribute("class", "cart__item__img");
                    newCartItem.appendChild(itemImg);

                    let newCartitemImg = document.createElement("img");
                    newCartitemImg.setAttribute("src", data.imageUrl);
                    newCartitemImg.setAttribute("alt", data.altTxt);
                    itemImg.appendChild(newCartitemImg);

                    let content = document.createElement("div");
                    content.setAttribute("class", `cart__item__content`);
                    newCartItem.appendChild(content);

                    let contentDescription = document.createElement("div");
                    contentDescription.setAttribute("class", `cart__item__content__description`);
                    content.appendChild(contentDescription);

                    let newH2 = document.createElement("h2");
                    newH2.innerHTML = data.name;
                    content.appendChild(newH2);

                    let newP = document.createElement("p");
                    newP.innerHTML = item.color;
                    content.appendChild(newP);

                    let newP2 = document.createElement("p");
                    newP2.innerHTML = `${data.price} €`;
                    contentDescription.appendChild(newP2);

                    let contentsettings = document.createElement("div");
                    contentsettings.setAttribute("class", `cart__item__content__settings`);
                    content.appendChild(contentsettings);

                    let contentsettingsquantity = document.createElement("div");
                    contentsettingsquantity.setAttribute("class", `cart__item__content__settings__quantity`);
                    contentsettings.appendChild(contentsettingsquantity);
                    let quantityP = document.createElement("p");
                    quantityP.innerHTML = `Qté`;
                    contentsettingsquantity.appendChild(quantityP);
                    let quantityInput = document.createElement("input");
                    quantityInput.setAttribute("class", `itemQuantity`);
                    quantityInput.setAttribute("type", `number`);
                    quantityInput.setAttribute("name", `itemQuantity`);
                    quantityInput.setAttribute("min", `1`);
                    quantityInput.setAttribute("max", `100`);
                    quantityInput.setAttribute("value", item.quantity);
                    contentsettingsquantity.appendChild(quantityInput);


                    fetchedCartData.push(data);

                    quantityInput.addEventListener('change', function (e) {
                        total = 0;
                        itemQuantity = 0;

                        for (let i = 0; i < cart.length; i++) {

                            let data = e.target.closest('article').dataset;
                            let dataId = data.id;
                            let dataColor = data.color;

                            // Update Localstorage data  according to on-screen data modifications
                            if (dataId + dataColor == cart[i].idColor) {
                                cart[i].quantity = e.target.value;
                                localStorage.setItem('cart', JSON.stringify(cart));
                            }


                        }
                        //update total quantity and price displays after modifying the quantity of a product
                        calcQty();
                        calcPrice();

                    })
                    console.log(fetchedCartData);




                    let settingsDelete = document.createElement("div");
                    settingsDelete.setAttribute("class", `cart__item__content__settings__delete`);
                    contentsettings.appendChild(settingsDelete);
                    let removeP = document.createElement("p");
                    removeP.innerHTML = `Supprimer`;
                    removeP.setAttribute("class", `deleteItem`);
                    settingsDelete.appendChild(removeP);


                    settingsDelete.addEventListener('click', function (e) {
                        total = 0;
                        itemQuantity = 0;

                        for (let i = 0; i < cart.length; i++) {

                            if (cart[i].idColor === e.target.closest('article').dataset.id + e.target.parentNode.parentNode.parentNode.parentNode.dataset.color) {
                                cart.splice(i, 1);
                                localStorage.setItem('cart', JSON.stringify(cart));
                                e.target.closest('article').remove();
                            }
                        }
                        //update total quantity and price displays after deleting a product from the cart
                        calcQty();
                        calcPrice();
                    })

                    // calculate cart total quantity and price on page load

                    total += data.price * item.quantity;
                    itemQuantity += parseInt(item.quantity);

                    let totalPrice = document.getElementById('totalPrice');
                    let totalQuantity = document.getElementById('totalQuantity');
                    totalQuantity.innerHTML = itemQuantity;
                    totalPrice.innerHTML = total;
                })
        } catch (error) {
            console.log(error);
        }

    }
}
renderCart()

function calcQty() {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i] !== undefined) {

            itemQuantity += parseInt(cart[i].quantity);
            totalQuantity.innerHTML = itemQuantity;
        }
    }
}

function calcPrice() {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i] !== undefined) {

            let indexForPrice = fetchedCartData.findIndex(x => x._id === cart[i].id);
            console.log(indexForPrice);
            total += fetchedCartData[indexForPrice].price * cart[i].quantity;
            totalPrice.innerHTML = total;
        }
    }
}
//Update total quantity and price and display it without reloading the page
// function updateValue(e) {
//     total = 0;
//     itemQuantity = 0;

//     for (let i = 0; i < cart.length; i++) {

//         let data = e.target.parentNode.parentNode.parentNode.parentNode.dataset;
//         let dataId = data.id;
//         let dataColor = data.color;

//         if (dataId + dataColor == cart[i].idColor) {
//             cart[i].quantity = e.target.value;
//             localStorage.setItem('cart', JSON.stringify(cart));
//         }

//         // Update Localstorage data  according to on-screen data modifications

//         itemQuantity += parseInt(cart[i].quantity);
//         totalQuantity.innerHTML = itemQuantity;

//         let url = `http://localhost:3000/api/products/${cart[i].id}`;
//         fetch(url)
//             .then(function (response) {
//                 return response.json();
//             }).then(function (data) {
//                 total += data.price * cart[i].quantity;
//                 totalPrice.innerHTML = total;

//             })



//     }



// }




// // Delete product from display and localstorage and then calculate new quantity and price and update display with updateValue()
// function deleteProduct(e) {
//     for (let i = 0; i < cart.length; i++) {

//         if (cart[i].idColor === e.target.parentNode.parentNode.parentNode.parentNode.dataset.id + e.target.parentNode.parentNode.parentNode.parentNode.dataset.color) {
//             cart.splice(i, 1);
//             localStorage.setItem('cart', JSON.stringify(cart));
//             e.target.parentNode.parentNode.parentNode.parentNode.remove();
//             updateValue(e);


//             return;

//         }
//     }
// }



function validateElement(regex, element, key, elementErrorMsg) {
    console.log(orderJson);
    if (regex.test(element)) {

        elementResult = true;
        elementErrorMsg.innerHTML = "";
        orderJson.contact[key] = element;
        return true;



    } else if (element === "") {
        elementErrorMsg.innerHTML = "Ce champ ne peut pas être vide.";
        elementResult = false;
        return false;


    } else {
        elementErrorMsg.innerHTML = "le format n'est pas correct";
        elementResult = false;
        return false;

    }

}

let checkBeforeSending = false;
let lastNameResult = false;
let addressResult = false;
let cityResult = false;
let emailResult = false;
let firstNameResult = false;


// data validation before sending form to backend



nameRegex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._-\s]{1,50}$/;
emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
addressRegex = /^[#.0-9a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s,-]+$/;





let firstName = document.getElementById('firstName');
let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
firstName.addEventListener('input', (event) => {
    let firstNameValue = event.target.value;
    let key = 'firstName';
    firstNameResult = validateElement(nameRegex, firstNameValue, key, firstNameErrorMsg);
})




let lastName = document.getElementById('lastName');
let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');

lastName.addEventListener('input', (event) => {
    LastNameValue = event.target.value;
    let key = 'lastName';
    lastNameResult = validateElement(nameRegex, LastNameValue, key, lastNameErrorMsg);
})


let address = document.getElementById('address');
let addressErrorMsg = document.getElementById('addressErrorMsg');
address.addEventListener('input', (event) => {
    addressValue = event.target.value;
    let key = 'address';
    addressResult = validateElement(addressRegex, addressValue, key, addressErrorMsg);
})

let city = document.getElementById('city');
let cityErrorMsg = document.getElementById('cityErrorMsg');
city.addEventListener('input', (event) => {
    cityValue = event.target.value;
    let key = 'city';
    cityResult = validateElement(nameRegex, cityValue, key, cityErrorMsg);

})
let email = document.getElementById('email');
let emailErrorMsg = document.getElementById('emailErrorMsg');

email.addEventListener('input', (event) => {

    emailValue = event.target.value;
    let key = 'email';
    emailResult = validateElement(emailRegex, emailValue, key, emailErrorMsg);

})



// If all inputs pass the regex check, checkBeforeSending variable will return true, else it will return false

// console.log(
//     firstNameResult, 'firstNameResult',
//     lastNameResult, 'lastNameResult',
//     addressResult, 'addressResult',
//     cityResult, 'cityResult',
//     emailResult, 'emailResult',

// )

// return checkBeforeSending;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  if the cart is empty, prevent sending data to backend
// if cart contains products, send their IDs to orderJson variable, under the products array.
function validateCart(cart) {
    if (cart.length == 0) {
        alert('votre panier est vide');
        return false;
    }
    for (let i = 0; i < cart.length; i++) {
        orderJson.products.push(cart[i].id)
    }
    return true
}


let orderJson = {
    contact: {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        email: ""
    },
    products: [],
}


function validateContactForm() {
    checkBeforeSending = firstNameResult && lastNameResult && addressResult && cityResult && emailResult;
    return checkBeforeSending;
}


// Send data to backend 
function sendOrder() {
    fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "content-Type": "application/json",
            },
            body: JSON.stringify(orderJson),
        })
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (value) {
            window.location = 'confirmation.html?orderId=' + value.orderId;
            // if the backend succesfully receives proper data, obtain order ID from backend and then open confirmation page, which contains order ID in its URL for further display.
        })


        //Making a catch to display an error if something went wrong
        .catch(function (err) {
            console.log(err);
        })

}
//allow sending data to backend if both form and cart match previously mentioned requirements and format to be read by backend

let form = document.querySelector('form');

form.addEventListener("submit", function (e) {
    e.preventDefault();


    let validatedata = validateContactForm() && validateCart(cart);
    if (validatedata) {

        sendOrder()
    } else {
        alert('form is not properly filled, or cart is empty');
    }


})