document.addEventListener('DOMContentLoaded', OnLoad);

// Called after the page with a reference to this scripts loads
function OnLoad() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  fetch("data/products.json")
    .then(response => response.json())
    .then(products => {
      const product = products.find(p => p.id === productId);
      if (product) {
        displayProduct(product);
        AddToCart(product);
      } else {
        throw new Error("Product not found.");
      }
    })
    .catch(handleError);
}

// Displays the products image, name, price and the add to cart nbutton
function displayProduct(product) {
  document.getElementById('product-image').src = product.image;
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-price').textContent = product.price + " Kč";
  createButton(product);
}

// Creates a button on the page with a listener for clicks
function createButton(product) {
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      alert("Product added to cart!");
    });
  }
}

// Error handling
function handleError(error) {
  console.error("Error loading products:", error);
}
