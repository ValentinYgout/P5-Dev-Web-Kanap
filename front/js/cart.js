let cart = localStorage.getItem("cart");
cart = JSON.parse(cart);

let total = 0;
let itemQuantity = 0;


// Render products from the cart,based on their ID in the cart, and with data from corresponding ID in the API

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
                cartItems.appendChild(newCartItem)
                newCartItem.setAttribute("class", "cart__item");
                newCartItem.setAttribute("data-id", `${item.id}`);
                newCartItem.setAttribute("data-color", `${item.color}`)

                let itemImg = document.createElement("div");
                itemImg.setAttribute("class", "cart__item__img");
                newCartItem.appendChild(itemImg);

                let newCartitemImg = document.createElement("img");
                newCartitemImg.setAttribute("src", `${data.imageUrl}`);
                newCartitemImg.setAttribute("alt", `${data.altTxt}`);
                itemImg.appendChild(newCartitemImg);

                let content = document.createElement("div");
                content.setAttribute("class", `cart__item__content`);
                newCartItem.appendChild(content);

                let contentDescription = document.createElement("div");
                contentDescription.setAttribute("class", `cart__item__content__description`);
                content.appendChild(contentDescription);

                let newH2 = document.createElement("h2");
                newH2.innerHTML = `${data.name}`;
                content.appendChild(newH2);

                let newP = document.createElement("p");
                newP.innerHTML = `${item.color}`;
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
                quantityInput.setAttribute("value", `${item.quantity}`);
                contentsettingsquantity.appendChild(quantityInput);



                quantityInput.addEventListener('change', updateValue);



                let settingsDelete = document.createElement("div");
                settingsDelete.setAttribute("class", `cart__item__content__settings__delete`);
                contentsettings.appendChild(settingsDelete);
                let removeP = document.createElement("p");
                removeP.innerHTML = `Supprimer`;
                removeP.setAttribute("class", `deleteItem`);
                settingsDelete.appendChild(removeP);


                settingsDelete.addEventListener('click', deleteProduct);

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

// Update total quantity and price and display it without reloading the page
function updateValue(e) {
    total = 0;
    itemQuantity = 0;

    for (let i = 0; i < cart.length; i++) {
        let data=e.target.parentNode.parentNode.parentNode.parentNode.dataset;
        let dataId = data.id;
        let dataColor = data.color;
       

        if (dataId + dataColor == cart[i].idColor) {
            cart[i].quantity = e.target.value;
            localStorage.cart = JSON.stringify(cart);
        }
        
        // Update Localstorage data  according to on-screen data modifications
        
        itemQuantity += parseInt(cart[i].quantity);
        totalQuantity.innerHTML = itemQuantity;

        let url = `http://localhost:3000/api/products/${cart[i].id}`;
        fetch(url)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                total += data.price * cart[i].quantity;
                totalPrice.innerHTML = total;

            })



    }
   
 

}




// Delete product from display and localstorage and then calculate new quantity and price and update display with updateValue()
function deleteProduct(e) {
    for (let i = 0; i < cart.length; i++) {

        if (cart[i].idColor === e.target.parentNode.parentNode.parentNode.parentNode.dataset.id + e.target.parentNode.parentNode.parentNode.parentNode.dataset.color) {
            cart.splice(i, 1);
            localStorage.cart = JSON.stringify(cart);
            e.target.parentNode.parentNode.parentNode.parentNode.remove();
            updateValue(e);


            return;

        }
    }
}





let checkBeforeSending = false;
let lastNameResult = false;
let addressResult = false;
let cityResult = false;
let emailResult = false;
let firstNameResult = false;
validateContactForm();

// data validation before sending form to backend
function validateContactForm() {


    nameRegex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._-\s]{1,50}$/;
    emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    addressRegex = /^[#.0-9a-zA-Z\s,-]+$/;


    let firstName = document.getElementById('firstName');
    let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');

    firstName.addEventListener('input', (event) => {
        let firstNameValue = event.target.value;

        if (nameRegex.test(firstNameValue)) {

            firstNameResult = true;
            firstNameErrorMsg.innerHTML = "";
            orderJson.contact.firstName = firstNameValue;



        } else if (firstNameValue === "") {
            firstNameErrorMsg.innerHTML = "Ce champ ne peut pas être vide.";
            firstNameResult = false;


        } else {
            firstNameErrorMsg.innerHTML = "le format du prénom n'est pas correct";
            firstNameResult = false;

        }
    });




    let lastName = document.getElementById('lastName');
    let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');

    lastName.addEventListener('input', (event) => {
        LastNameValue = event.target.value;

        if (nameRegex.test(LastNameValue)) {
            lastNameErrorMsg.innerHTML = "";
            lastNameResult = true;
            orderJson.contact.lastName = LastNameValue;

        } else if (LastNameValue === "") {
            lastNameErrorMsg.innerHTML = "Ce champ ne peut pas être vide.";
            lastNameResult = false;
        } else {
            lastNameErrorMsg.innerHTML = "Le format du nom n'est pas correct";
            lastNameResult = false;
        }
    });
    let address = document.getElementById('address');
    let addressErrorMsg = document.getElementById('addressErrorMsg');

    address.addEventListener('input', (event) => {

        addressValue = event.target.value;
        if (addressRegex.test(addressValue)) {
            addressErrorMsg.innerHTML = "";
            addressResult = true;
            orderJson.contact.address = addressValue;
        } else if (address.value === "") {
            addressErrorMsg.innerHTML = "Ce champ ne peut pas être vide.";
            addressResult = false;
        } else {
            addressErrorMsg.innerHTML = "Le format de l'addresse n'est pas correct";
            addressResult = false;
        }
    });
    let city = document.getElementById('city');
    let cityErrorMsg = document.getElementById('cityErrorMsg');

    city.addEventListener('input', (event) => {
        cityValue = event.target.value;
        if (nameRegex.test(cityValue)) {
            cityErrorMsg.innerHTML = "";
            cityResult = true;
            orderJson.contact.city = cityValue;
        } else if (city.value === "") {
            cityErrorMsg.innerHTML = "Ce champ ne peut pas être vide.";
            cityResult = false;

        } else {
            cityErrorMsg.innerHTML = "Le format de la ville n'est pas correct";
            cityResult = false;
        }
    });
    let email = document.getElementById('email');
    let emailErrorMsg = document.getElementById('emailErrorMsg');

    email.addEventListener('input', (event) => {

        emailValue = event.target.value;

        if (emailRegex.test(emailValue)) {

            emailErrorMsg.innerHTML = "";
            emailResult = true;
            orderJson.contact.email = emailValue;
        } else if (email.value === "") {
            emailErrorMsg.innerHTML = "Ce champ ne peut pas être vide.";
            emailResult = false;
        } else {
            emailErrorMsg.innerHTML = "Le format de l'email n'est pas correct";
            emailResult = false;
        }
    });

    checkBeforeSending = firstNameResult && lastNameResult && addressResult && cityResult && emailResult;

    // If all inputs pass the regex check, checkBeforeSending variable will return true, else it will return false

    console.log(
        firstNameResult, 'firstNameResult',
        lastNameResult, 'lastNameResult',
        addressResult, 'addressResult',
        cityResult, 'cityResult',
        emailResult, 'emailResult',

    )

    return checkBeforeSending;

}

//  if the cart is empty, prevent sending data to backend
// if cart contains products, send their IDs to orderJson variable, under the products array.
function validateCart(cart) {
    if (cart.length == 0) {
        return false;
    }
    for (let i = 0; i < cart.length; i++) {
        orderJson.products.push(cart[i].id);
    }
    return true;

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
        });

}
//allow sending data to backend if both form and cart match previously mentioned requirements and format to be read by backend
function submit() {
    let submit = document.getElementById("order");
    submit.addEventListener("click", function (e) {
        e.preventDefault();



        let validatedata = validateContactForm() && validateCart(cart);
        if (validatedata) {
            
            sendOrder()
        } else {
            alert('form is not properly filled, or cart is empty');
        }


    });
}
submit();