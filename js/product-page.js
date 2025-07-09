document.addEventListener('DOMContentLoaded', OnLoad);

function OnLoad() {

    const params = new URLSearchParams(window.location.search); // Create an object that gives you access to the parameters in the URL
    const productId = params.get('id'); // Get the id parameter of the URL

    // Fetch all products and filter by type
    fetch("data/products.json")
    .then(response => response.json())
    .then(products => {
    const product = products.find(p => p.id === productId);
    if (product) displayProduct(product);
    else throw new Error("Product not found.");
    })
    .catch(handleError);
}

function displayProduct(product) {
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-image').src = product.image;
  document.getElementById('product-price').textContent = product.price + " Kč";
}

function handleError(error) {
  console.error("Error loading products:", error);
}