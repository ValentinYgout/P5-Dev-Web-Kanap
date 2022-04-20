var cart = localStorage.getItem("order");
cart = JSON.parse(cart);
console.log(cart)






async function renderProducts() {

    let Items = document.getElementById('cart__items');

    Items.innerHTML =
        `
 

             <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                    <div class="cart__item__img">
                        <img src="${cart[0].imageUrl}" alt="${cart[0].altTxt}">
                    </div>
                    <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${cart[0].title}</h2>
                        <p>Vert</p>
                        <p>${cart[0].price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[0].quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                    </div>
          </article>

`

};

let totalPrice = document.getElementById('totalPrice')
let total= cart[0].price * cart[0].quantity
totalPrice.innerHTML=total



renderProducts();