document.addEventListener('DOMContentLoaded', OnLoad);

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

function displayProduct(product) {
  document.getElementById('product-image').src = product.image;
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-price').textContent = product.price + " Kč";

  AddToCart(product);
}

function AddToCart(product) {
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

function handleError(error) {
  console.error("Error loading products:", error);
}
