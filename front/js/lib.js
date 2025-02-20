//  get the value of a parameter in the URL
function getParamUrl(paramName) {
    if (paramName === null) {
        return '';
    } else {
        const value = new URL(window.location.href).searchParams.get(paramName);
        return value;
    }
}
// import the content of the cart from localstorage, and create a variable that holds this data in JSON rather than string.
function getCart() {
    try {
        if (localStorage.getItem('cart') == null) { //Create a cart if one doesn't already exist.
            // localStorage.setItem('cart', '[]');
            return []
        }
        let cart = JSON.parse(localStorage.getItem('cart')); // parse the Localstorage string data into JSON
        return cart;
    } catch (error) {
        console.log(error);
        return [];
    }
}