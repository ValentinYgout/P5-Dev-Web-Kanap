

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

        let NewItem = document.createElement("a");

        Items.appendChild(NewItem)
        NewItem.setAttribute("href", `./product.html?id=${product._id}`)
        NewItem.innerHTML =
            `
 
<article>
  <img src="${product.imageUrl}" alt="${product.altTxt}">
  <h3 class="productName">${product.name}</h3>
  <p class="productDescription">${product.description}</p>
</article>

`

    });
 
}

renderProducts();

