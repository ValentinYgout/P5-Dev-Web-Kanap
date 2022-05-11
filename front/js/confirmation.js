let paramName = "orderId";

function getParamUrl(paramName){

    const id = new URL(window.location.href).searchParams.get(paramName);
    return id
}


const orderId= getParamUrl(paramName);


    console.log(orderId);
    let orderElement = document.getElementById("orderId");
    orderElement.innerText = orderId;
