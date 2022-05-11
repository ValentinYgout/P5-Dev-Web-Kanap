

// gather data from api
async function getProducts() {
    let url = 'http://localhost:3000/api/products';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
// dynamically create articles, with data from the api

async function renderProducts() {
    let products = await getProducts();
    products.forEach(product => {
       
        let items = document.getElementById('items');
        let newLink = document.createElement("a");
        let newArticle = document.createElement("article");
        let newImage= document.createElement("img"); 
        let newName = document.createElement("h3");
        let newDescription = document.createElement("p");

        items.appendChild(newLink);

        newLink.appendChild(newArticle);

        newArticle.appendChild(newImage);
        newArticle.appendChild(newName);
        newArticle.appendChild(newDescription);

        newLink.setAttribute("href", `./product.html?id=${product._id}`);

        newImage.setAttribute("src", `${product.imageUrl}`);
        newImage.setAttribute("alt", `${product.altTxt}`);

        newName.setAttribute("class", `productName`);
        newName.innerHTML =`${product.name}`;

        newDescription.setAttribute("class", `productDescription`);
        newDescription.innerHTML =`${product.description}`;
        
        
    });
    
}

renderProducts();


