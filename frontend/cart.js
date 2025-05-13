// Load cart from localStorage or initialize empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display cart on page load
window.onload = displayCart;

// Function to display cart items
function displayCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty!</p>";
  } else {
    cart.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');
      itemDiv.innerHTML = `
        <p>${item.name}</p>
        <p>₹${item.price} x ${item.quantity}</p>
        <p>Subtotal: ₹${(item.price * item.quantity).toFixed(2)}</p>
        <button onclick="removeItem(${index})">Remove</button>
        <hr>
      `;
      cartItemsContainer.appendChild(itemDiv);
    });
  }

  updateTotal();
}

// Update total price
function updateTotal() {
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

// Remove item and update localStorage
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// This is only needed if you're testing adding from this file directly
// Use this from menu.html normally
function addToCart(itemName, itemPrice) {
  const existingItem = cart.find(item => item.name === itemName);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name: itemName, price: itemPrice, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}
