let paramName = "orderId";
const orderId = getParamUrl(paramName = "orderId");
let orderElement = document.getElementById("orderId");


// display  order ID if order ID is found in URL, else display error.

if (orderId == null || undefined) {
  error = document.querySelector('.confirmation');
  while (error.firstChild);
  {
    error.removeChild(error.lastChild);
  }
  error.innerText = 'ERROR 404'
} else {
  console.log(orderId);
  orderElement.innerText = orderId;
}