// Sample product data
const products = [
  {
    id: 1,
    name: "Luxury Watch 1",
    category: "men",
    price: 2299,
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Elegant Watch",
    category: "women",
    price: 3249,
    image:
      "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Kids Smart Watch",
    category: "kids",
    price: 4149,
    image:
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Couple Collection",
    category: "couple",
    price: 5499,
    image:
      "https://images.unsplash.com/photo-1619946794135-5bc917a27793?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "New Edition 2024",
    category: "new",
    price: 3399,
    image:
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Classic Series",
    category: "men",
    price: 2349,
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Premium Gold Watch",
    category: "luxury",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Sports Chronograph",
    category: "sport",
    price: 4199,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "Smart Watch Pro",
    category: "smart",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 10,
    name: "Vintage Collection",
    category: "vintage",
    price: 4449,
    image:
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=1000&auto=format&fit=crop",
  },
];

// Cart and wishlist state
let cartItems = [];
let wishlist = new Set();

// Cart functions
function openCart() {
  document.getElementById("cartModal").classList.add("active");
  document.getElementById("cartOverlay").classList.add("active");
  updateCartDisplay();
}

function closeCart() {
  document.getElementById("cartModal").classList.remove("active");
  document.getElementById("cartOverlay").classList.remove("active");
}

function updateCartDisplay() {
  const cartItemsDiv = document.getElementById("cartItems");
  cartItemsDiv.innerHTML = "";
  let total = 0;

  cartItems.forEach((item, index) => {
    total += item.price;
    cartItemsDiv.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h6>${item.name}</h6>
                        <p>$${item.price}</p>
                        <p>${item.mrp}</p>
                    </div>
                    <button class="btn btn-danger btn-sm ms-auto" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
  });

  document.getElementById("cartTotal").textContent = total.toFixed(2);
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCartCount();
  updateCartDisplay();
}

function checkout() {
  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your purchase!");
  cartItems = [];
  updateCartCount();
  updateCartDisplay();
  closeCart();
}

// Function to update cart count
function updateCartCount() {
  document.getElementById("cart-count").textContent = cartItems.length;
}

// Function to add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cartItems.push(product);
    updateCartCount();
    updateCartDisplay();
    alert(`${product.name} added to cart!`);
  }
}

// Function to display products
function displayProducts(productsToShow) {
  const container = document.getElementById("productsContainer");
  container.innerHTML = "";

  productsToShow.forEach((product) => {
    const isLiked = wishlist.has(product.id);
    container.innerHTML += `
        <div class="col-md-4 product-card" data-category="${product.category}">
          <div class="card">
            <img src="${product.image}" class="card-img-top" alt="${
      product.name
    }">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">₹${product.price.toLocaleString("en-IN")}</p>
              <div class="d-flex justify-content-between align-items-center">
                <button class="btn btn-primary" onclick="addToCart(${
                  product.id
                })">Add to Cart</button>
                <i class="heart-icon ${isLiked ? "fas" : "far"} fa-heart ${
      isLiked ? "liked" : ""
    }" 
                  data-product-id="${product.id}"
                  onclick="toggleWishlist(${product.id})"></i>
              </div>
            </div>
          </div>
        </div>
      `;
  });
}

// Load wishlist from localStorage on page load
window.addEventListener("load", () => {
  const savedWishlist = localStorage.getItem("wishlist");
  if (savedWishlist) {
    wishlist = new Set(JSON.parse(savedWishlist));
  }
  displayProducts(products);
});

// Initial display
displayProducts(products);

// Category filter functionality
document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    // Update active button
    document.querySelector(".filter-btn.active").classList.remove("active");
    button.classList.add("active");

    const category = button.getAttribute("data-category");
    const filteredProducts =
      category === "all"
        ? products
        : products.filter((product) => product.category === category);

    displayProducts(filteredProducts);
  });
});

// Search functionality
function searchProducts() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
  );
  displayProducts(filteredProducts);
}

// Search on enter key
document.getElementById("searchInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchProducts();
  }
});

// Close cart when clicking overlay
document.getElementById("cartOverlay").addEventListener("click", closeCart);
