const foodItems = [
  {
    name: "Cheesy Pizza",
    description: "Classic Italian pizza topped with extra cheese and fresh herbs.",
    price: 249,
    image: "https://kitchenatics.com/wp-content/uploads/2020/09/Cheese-pizza-1-500x375.jpg"
  },
  {
    name: "Spicy Biryani",
    description: "Fragrant basmati rice cooked with spices and tender veggies.",
    price: 399,
    image: "https://b.zmtcdn.com/data/pictures/chains/9/51139/6b176f80af05e21cfb5af3c2ff7c82b4_featured_v2.jpg"
  },
  {
    name: "Veg Burger",
    description: "Juicy veggie patty with cheese, lettuce, and special sauce.",
    price: 189,
    image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/10/Secret-Veg-Cheeseburgers-c981dd6.jpg"
  }
];

// Render items to the page
const menuSection = document.querySelector(".menu-items");

foodItems.forEach(item => {
  const itemDiv = document.createElement("div");
  itemDiv.className = "item";

  itemDiv.innerHTML = `
    <img src="${item.image}" alt="${item.name}" />
    <div class="food-details">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <span class="price">₹${item.price}</span>
      <button class="add-to-cart">Add to Cart</button>
    </div>
  `;

  // Append item to DOM
  menuSection.appendChild(itemDiv);

  // Add event listener
  itemDiv.querySelector(".add-to-cart").addEventListener("click", () => {
    addToCart(item.name, item.price);
  });
});

// ✅ Store item in localStorage
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showPopup(`${name} added to cart!`);
}

// ✅ Show custom popup
function showPopup(message) {
  const popup = document.getElementById("popup");
  popup.textContent = message;
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 2000);
}
