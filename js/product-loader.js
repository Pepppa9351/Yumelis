document.addEventListener('DOMContentLoaded', OnLoad);

function OnLoad() {

    // Get the page category from the html document this script is being called from
    const pageCategory= document.body.dataset.category;

    // Fetch all products and filter by type
    fetch("../data/products.json")
    .then(response => response.json())
    .then(products => {
        const filtered = products.filter(p => p.category === pageCategory);
        displayProducts(filtered);
    })
    .catch(handleError);
}

function displayProducts(products) {
  const productList = document.getElementById("product-list");

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    const productLink = document.createElement("a");
    productLink.href = `../product.html?id=${product.id}`;
    productLink.className = "product-card";

    // If the product name has a colon then split it into two rows
    if (product.name.includes(":")) {
      const parts = product.name.split(":");
      const beforeColon = parts[0].trim();
      const afterColon = parts[1].trim(); 

      productLink.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image" />
      <p class="product-note">${beforeColon}</p>
      <p class="product-name">${afterColon}</p>
      <p class="product-price">${product.price} Kč</p>
    `;
    } 

    else {
      productLink.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" />
        <p class="product-name">${product.name}</p>
        <p class="product-price">${product.price} Kč</p>
      `;
    }

    productList.appendChild(productLink);
  }
}

function handleError(error) {
  console.error("Error loading products:", error);
}
