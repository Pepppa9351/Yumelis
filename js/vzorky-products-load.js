// When the HTML page finishes loading, run the OnLoad function
document.addEventListener('DOMContentLoaded', OnLoad);

// This function will load the products from the JSON file and display them
function OnLoad() {
  // Get the products.json file from the data folder
  fetch('../data/vzorky-products.json')
    .then(handleResponse)        // Handle the response from the server
    .then(displayProducts)       // Use the product data to create elements
    .catch(handleError);         // If something goes wrong, show the error
}

// Converts the response to JSON
function handleResponse(response) {
  return response.json();
}

// Adds each product to the page
function displayProducts(products) {
  const productList = document.getElementById('product-list');

  // Go through each product in the array
  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    // Create an <a> element instead of a div to make the whole card clickable
    const productLink = document.createElement('a');
    productLink.href = `../product.html?id=${product.id}`;  // Pass product id in URL query
    productLink.className = 'product-card';

    // Set the inside HTML of the card
    productLink.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image" />
      <p class="product-name">${product.name}</p>
      <p class="product-price">${product.price} Kč</p>
    `;

    // Add this product link card to the product list on the page
    productList.appendChild(productLink);
  }
}

// Show errors in the console
function handleError(error) {
  console.error('Error loading products:', error);
}
