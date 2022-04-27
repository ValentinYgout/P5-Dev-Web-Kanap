

// on prend les informations de l'api
async function getProducts() {
    let url = 'http://localhost:3000/api/products';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
// on crée les articles de façon dynamique, en incluant les données de l'api
async function renderProducts() {
    let products = await getProducts();
    products.forEach(product => {
        console.log(product.imageUrl)

        let Items = document.getElementById('items');
        let NewLink = document.createElement("a");
        let NewArticle = document.createElement("article");
        let NewImage= document.createElement("img"); 
        let NewName = document.createElement("h3");
        let NewDescription = document.createElement("p");

        Items.appendChild(NewLink)

        NewLink.appendChild(NewArticle)

        NewArticle.appendChild(NewImage)
        NewArticle.appendChild(NewName)
        NewArticle.appendChild(NewDescription)

        NewLink.setAttribute("href", `./product.html?id=${product._id}`)

        NewImage.setAttribute("src", `${product.imageUrl}`)
        NewImage.setAttribute("alt", `${product.altTxt}`)

        NewName.setAttribute("class", `productName`)
        NewName.innerHTML =`${product.name}`

        NewDescription.setAttribute("class", `productDescription`)
        NewDescription.innerHTML =`${product.description}`
        
        
    });
    
}

renderProducts();


