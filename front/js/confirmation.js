let paramName = "orderId";
const orderId = getParamUrl(paramName = "orderId");
let orderElement = document.getElementById("orderId");


// display  order ID if order ID is found in URL, else display error.

if (orderId == null || undefined) {
	document.querySelector('.confirmation').innerText = 'ERROR 404';
} else {

  // vider le cart
  localStorage.setItem('cart', '[]');
  console.log(orderId);
  orderElement.innerText = orderId;
}