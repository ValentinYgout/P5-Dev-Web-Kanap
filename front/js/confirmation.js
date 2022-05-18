

let paramName = "orderId"
const orderId= getParamUrl(paramName)
let orderElement = document.getElementById("orderId")
if (orderId== null||undefined){
//////////////////// error 404
error= document.querySelector('.confirmation')
while (error.firstChild) {
    error.removeChild(error.lastChild)
  }
  error.innerText='ERROR 404'
}
else{
    console.log(orderId)
    orderElement.innerText = orderId
}

   
   
