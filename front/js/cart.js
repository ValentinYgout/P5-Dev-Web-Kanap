let cart = localStorage.getItem("cart");
cart = JSON.parse(cart);

let total = 0
let itemQuantity = 0
for (let item of cart) {
    let url = `http://localhost:3000/api/products/${item.id}`;
    try {
        fetch(url)
            .then(function (response) {
                return response.json()
            }).then(function (data) {
                //    console.log(data)
                let CartItems = document.getElementById('cart__items');
                let NewCartItem = document.createElement("article");
                CartItems.appendChild(NewCartItem)
                NewCartItem.setAttribute("class", "cart__item")
                NewCartItem.setAttribute("data-id", `${item.id}`)
                NewCartItem.setAttribute("data-color", `${item.color}`)

                let NewDiv = document.createElement("div");
                NewDiv.setAttribute("class", "cart__item__img")
                NewCartItem.appendChild(NewDiv)

                let NewCartItemImg = document.createElement("img")
                NewCartItemImg.setAttribute("src", `${data.imageUrl}`)
                NewCartItemImg.setAttribute("alt", `${data.altTxt}`)
                NewDiv.appendChild(NewCartItemImg)

                let NewDiv2 = document.createElement("div");
                NewDiv2.setAttribute("class", `cart__item__content`)
                NewCartItem.appendChild(NewDiv2)

                let NewDiv3 = document.createElement("div");
                NewDiv3.setAttribute("class", `cart__item__content__description`)
                NewDiv2.appendChild(NewDiv3)

                let NewH2 = document.createElement("h2");
                NewH2.innerHTML = `${data.name}`
                NewDiv2.appendChild(NewH2)

                let NewP = document.createElement("p");
                NewP.innerHTML = `${item.color}`
                NewDiv2.appendChild(NewP)

                let Newp2 = document.createElement("p");
                Newp2.innerHTML = `${data.price} €`
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
                QuantityInput.setAttribute("value", `${item.quantity}`)
                NewDiv5.appendChild(QuantityInput)

                let inputQuantity = document.querySelectorAll('.itemQuantity')
                inputQuantity.forEach(inputQuantity => {
                    inputQuantity.addEventListener('change', updateValue)
                })


                let NewDiv6 = document.createElement("div");
                NewDiv6.setAttribute("class", `cart__item__content__settings__delete`)
                NewDiv4.appendChild(NewDiv6)
                let RemoveP = document.createElement("p");
                RemoveP.innerHTML = `Supprimer`
                RemoveP.setAttribute("class", `deleteItem`)
                NewDiv6.appendChild(RemoveP)

                let deleteItem = document.querySelectorAll('.deleteItem')
                deleteItem.forEach(deleteItem => {
                    deleteItem.addEventListener('click', deleteProduct)

                })


                total += data.price * item.quantity
                itemQuantity += parseInt(item.quantity)

                // console.log(total, price*quantity)
                let totalPrice = document.getElementById('totalPrice')
                let totalQuantity = document.getElementById('totalQuantity')
                totalQuantity.innerHTML = itemQuantity
                totalPrice.innerHTML = total;


            })
    } catch (error) {
        console.log(error);
    }

}


function updateValue(e) {
    console.log("test")
    total = 1
    itemQuantity = 0

    for (let i = 0; i < cart.length; i++) {
        let DataId = e.target.parentNode.parentNode.parentNode.parentNode.dataset.id
        let DataColor = e.target.parentNode.parentNode.parentNode.parentNode.dataset.color
        console.log(DataId + DataColor)
        if (DataId + DataColor == cart[i].idColor) {
            cart[i].quantity = e.target.value;
            localStorage.cart = JSON.stringify(cart)
        }
        itemQuantity += parseInt(cart[i].quantity)
        totalQuantity.innerHTML = itemQuantity

        let url = `http://localhost:3000/api/products/${cart[i].id}`;
        fetch(url)
            .then(function (response) {
                return response.json()
            }).then(function (data) {
                console.log(data.price)
                total += data.price * cart[i].quantity
                totalPrice.innerHTML = total;

            })



    }

}





function deleteProduct(e) {
    console.log("test")

    for (let i = 0; i < cart.length; i++) {
        console.log(cart[i].id, "and", e.target.parentNode.parentNode.parentNode.parentNode.dataset.color)
        if (cart[i].idColor === e.target.parentNode.parentNode.parentNode.parentNode.dataset.id + e.target.parentNode.parentNode.parentNode.parentNode.dataset.color) {
            cart.splice(i, 1)
            localStorage.cart = JSON.stringify(cart)
            e.target.parentNode.parentNode.parentNode.parentNode.remove()
            updateValue(e)


            return

        }
    }
}





let CheckBeforeSending = false
let lastNameResult = false
let addressResult = false
let cityResult = false
let EmailResult = false
let firstNameResult = false
validateContactForm()

function validateContactForm() {


    nameRegex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._-\s]{1,50}$/;
    emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    addressRegex = /^[#.0-9a-zA-Z\s,-]+$/


    let firstName = document.getElementById('firstName')
    let firstNameErrorMsg = document.getElementById('firstNameErrorMsg')

    firstName.addEventListener('input', (event) => {
        let firstNameValue = event.target.value;

        if (nameRegex.test(firstNameValue)) {

            firstNameResult = true;
            firstNameErrorMsg.innerHTML = "";
            OrderJson.contact.firstName = firstNameValue



        } else if (firstNameValue === "") {
            firstNameErrorMsg.innerHTML = "Ce champ ne peut pas être vide.";
            firstNameResult = false;


        } else {
            firstNameErrorMsg.innerHTML = "le format du prénom n'est pas correct";
            firstNameResult = false;

        }
    });




    let lastName = document.getElementById('lastName')
    let lastNameErrorMsg = document.getElementById('lastNameErrorMsg')

    lastName.addEventListener('input', (event) => {
        LastNameValue = event.target.value;

        if (nameRegex.test(LastNameValue)) {
            lastNameErrorMsg.innerHTML = "";
            lastNameResult = true;
            OrderJson.contact.lastName = LastNameValue

        } else if (LastNameValue === "") {
            lastNameErrorMsg.innerHTML = "Ce champ ne peut pas être vide.";
            lastNameResult = false;
        } else {
            lastNameErrorMsg.innerHTML = "Le format du nom n'est pas correct";
            lastNameResult = false
        }
    });
    let address = document.getElementById('address')
    let addressErrorMsg = document.getElementById('addressErrorMsg')

    address.addEventListener('input', (event) => {

        addressValue = event.target.value;
        if (addressRegex.test(addressValue)) {
            addressErrorMsg.innerHTML = "";
            addressResult = true;
            OrderJson.contact.address = addressValue
        } else if (address.value === "") {
            addressErrorMsg.innerHTML = "Ce champ ne peut pas être vide.";
            addressResult = false;
        } else {
            addressErrorMsg.innerHTML = "Le format de l'addresse n'est pas correct";
            addressResult = false;
        }
    });
    let city = document.getElementById('city')
    let cityErrorMsg = document.getElementById('cityErrorMsg')

    city.addEventListener('input', (event) => {
        cityValue = event.target.value;
        if (nameRegex.test(cityValue)) {
            cityErrorMsg.innerHTML = "";
            cityResult = true;
            OrderJson.contact.city = cityValue
        } else if (city.value === "") {
            cityErrorMsg.innerHTML = "Ce champ ne peut pas être vide.";
            cityResult = false;

        } else {
            cityErrorMsg.innerHTML = "Le format de la ville n'est pas correct";
            cityResult = false;
        }
    });
    let email = document.getElementById('email')
    let emailErrorMsg = document.getElementById('emailErrorMsg')

    email.addEventListener('input', (event) => {

        emailValue = event.target.value;

        if (emailRegex.test(emailValue)) {

            emailErrorMsg.innerHTML = "";
            EmailResult = true;
            OrderJson.contact.email = emailValue
        } else if (email.value === "") {
            emailErrorMsg.innerHTML = "Ce champ ne peut pas être vide.";
            EmailResult = false;
        } else {
            emailErrorMsg.innerHTML = "Le format de l'email n'est pas correct";
            EmailResult = false;
        }
    });

    CheckBeforeSending = firstNameResult && lastNameResult && addressResult && cityResult && EmailResult

    console.log(
        firstNameResult, 'firstNameResult',
        lastNameResult, 'lastNameResult',
        addressResult, 'addressResult',
        cityResult, 'cityResult',
        EmailResult, 'EmailResult',

    )



    return CheckBeforeSending;





}


function validateCart(cart) {
    if (cart.length == 0) {
        return false;
    }
    for (let i = 0; i < cart.length; i++) {
        OrderJson.products.push(cart[i].id)
    }
    return true;

}

let OrderJson = {
    contact: {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        email: ""
    },
    products: [],
}

function sendOrder() {
    console.log(OrderJson)
    fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(OrderJson),
        })
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (value) {
            console.log(value);
            window.location = 'confirmation.html?orderId=' + value.orderId; //redirection vers la page confirmation en passant l'orderID dans l'URL de la page
        })


        //Making a catch to display an error if something went wrong
        .catch(function (err) {
            console.log(err);
        });

}

function submit() {
    let submit = document.getElementById("order");
    submit.addEventListener("click", function (e) {
        e.preventDefault();



        let validateData = validateContactForm() && validateCart(cart)
        if (validateData) {
            console.log('ready to send')

            sendOrder()

        } else {
            console.log('form is not properly filled')
        }


    });
}
submit();