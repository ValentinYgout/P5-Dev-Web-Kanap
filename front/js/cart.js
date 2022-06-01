let cart = getCart();
// if the cart is empty, only display a short  message informing that the cart is empty.
function basketIsEmpty() {
    document.querySelector('#cartAndFormContainer h1').innerHTML = 'Votre Panier est vide'
    document.querySelector('.cart').innerHTML = ''
}
if (cart.length == 0) {
    basketIsEmpty()
} else {
    let total = 0;
    let itemQuantity = 0;
    let fetchedCartData = [];
    //if there are products in the cart,render products from the cart,based on their ID in the cart, and with data from corresponding ID in the API, on page load.
    function renderCart() {
        if (cart.length == 0) {
            basketIsEmpty()
        } else {
            for (let item of cart) {
                let url = `http://localhost:3000/api/products/${item.id}`;
                try {
                    fetch(url)
                        .then(function (response) {
                            return response.json()
                        }).then(function (data) {
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
                                for (let i = 0; i < cart.length; i++) {
                                    let data = e.target.closest('article').dataset;
                                    let dataId = data.id;
                                    let dataColor = data.color;
                                    // Update Localstorage data  according to on-screen data modifications
                                    console.log(e.target.value)
                                    if (e.target.value == 0) {

                                        let confirmation = confirm("voulez vous supprimer cet article?")
                                        if (confirmation) {
                                            cart.splice(i, 1);
                                            localStorage.setItem('cart', JSON.stringify(cart));
                                            e.target.closest('article').remove();
                                            break;

                                        }
                                    } else if (dataId + dataColor == cart[i].idColor) {
                                        cart[i].quantity = e.target.value;
                                        localStorage.setItem('cart', JSON.stringify(cart));
                                        break;
                                    }
                                }
                                //update total quantity and price displays after modifying the quantity of a product
                                if (cart.length == 0) {
                                    basketIsEmpty()
                                } else {
                                    calcQty();
                                    calcPrice();
                                }
                            })
                            let settingsDelete = document.createElement("div");
                            settingsDelete.setAttribute("class", `cart__item__content__settings__delete`);
                            contentsettings.appendChild(settingsDelete);
                            let removeP = document.createElement("p");
                            removeP.innerHTML = `Supprimer`;
                            removeP.setAttribute("class", `deleteItem`);
                            settingsDelete.appendChild(removeP);
                            settingsDelete.addEventListener('click', function (e) {
                                for (let i = 0; i < cart.length; i++) {
                                    if (cart[i].idColor === e.target.closest('article').dataset.id + e.target.closest('article').dataset.color) {
                                        cart.splice(i, 1);
                                        localStorage.setItem('cart', JSON.stringify(cart));
                                        e.target.closest('article').remove();
                                        break;
                                    }
                                }
                                //update total quantity and price displays after deleting a product from the cart
                                if (cart.length == 0) {
                                    basketIsEmpty()
                                } else {
                                    calcQty();
                                    calcPrice();
                                }
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
    }
    renderCart()
    // recalculate total quantity after a change in the cart
    function calcQty() {
        itemQuantity = 0;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i] !== undefined) {
                itemQuantity += parseInt(cart[i].quantity);
                totalQuantity.innerHTML = itemQuantity;
            }
        }
    }
    // recalculate total price after a change in the cart
    function calcPrice() {
        total = 0;
        itemQuantity = 0;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i] !== undefined) {
                let indexForPrice = fetchedCartData.findIndex(x => x._id === cart[i].id);
                console.log(indexForPrice);
                total += fetchedCartData[indexForPrice].price * cart[i].quantity;
                totalPrice.innerHTML = total;
            }
        }
    }
    // check if the input passes its regex test, if not, display error message accordingly.
    function validateElement(regex, element) {
        elementErrorMsg = document.getElementById(element.id + 'ErrorMsg')
        if (regex.test(element.value)) {
            elementResult = true;
            elementErrorMsg.innerHTML = "";
            orderJson.contact[element.id] = element.value;
            return true;
        } else if (element.value === "") {
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

    nameRegex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._-\s]{1,50}$/;
    emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    addressRegex = /^[#.0-9a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s,-]+$/;

    let firstName = document.getElementById('firstName');
    firstName.addEventListener('input', (event) => {
        let firstNameTarget = event.target;
        firstNameResult = validateElement(nameRegex, firstNameTarget);
    })
    let lastName = document.getElementById('lastName');
    lastName.addEventListener('input', (event) => {
        LastNameTarget = event.target;
        lastNameResult = validateElement(nameRegex, LastNameTarget);
    })
    let address = document.getElementById('address');
    address.addEventListener('input', (event) => {
        addressTarget = event.target;
        addressResult = validateElement(addressRegex, addressTarget);
    })
    let city = document.getElementById('city');
    city.addEventListener('input', (event) => {
        cityTarget = event.target;
        cityResult = validateElement(nameRegex, cityTarget);
    })
    let email = document.getElementById('email');
    email.addEventListener('input', (event) => {
        emailTarget = event.target;
        emailResult = validateElement(emailRegex, emailTarget);
    })
    // If all inputs pass the regex check, checkBeforeSending variable will return true, else it will return false
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
    let form = document.querySelector('form');
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let validatedata = validateContactForm() && validateCart(cart);
        //allow sending data to backend if Contact form and the the cart both match the format required by backend.
        if (validatedata) {
            sendOrder()
        } else {
            alert('form is not properly filled, or cart is empty');
        }
    })
}