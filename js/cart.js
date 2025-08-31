document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    totalPriceElement.textContent = "Košík je prázdný.";
    return;
  }

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const quantity = `${item.quantity} x`;

      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";

      itemDiv.innerHTML = `
        <p><strong>${quantity}</strong></p>
        <img src="${item.image}" alt="${item.name}" class="cart-image" />
        <div class="cart-details">
          <p><strong>${item.name}</strong></p>
          <div class="cart-right">
            <p class="cart-price">${item.price} Kč</p>
            <button class="decrease-btn" data-index="${index}">-</button>
            <button class="increase-btn" data-index="${index}">+</button>
          </div>
        </div>
      `;

      cartItemsContainer.appendChild(itemDiv);

      total += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Celkem: ${total} Kč`;

    // Add button events
    document.querySelectorAll(".increase-btn").forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        cart[index].quantity++;
        saveAndRender();
      });
    });

    document.querySelectorAll(".decrease-btn").forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        } else {
          cart.splice(index, 1); // remove item if quantity = 0
        }
        saveAndRender();
      });
    });
  }

  function saveAndRender() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  renderCart();
});
