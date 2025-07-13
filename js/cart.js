document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-image">
      <div class="cart-details">
        <p><strong>${item.name}</strong></p>
        <p>Price: ${item.price} Kč</p>
        <p>Quantity: ${item.quantity}</p>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `;

    cartItemsContainer.appendChild(itemDiv);

    total += item.price * item.quantity;
  });

  totalPriceElement.textContent = `${total} Kč`;

  // Remove button 
  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    });
  });
});
