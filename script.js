// API URLs
const API_URL = "https://makeup-api.herokuapp.com/api/v1/products.json";
const WISHLIST_API = "http://localhost:3000/wishlist";

// DOM Elements
const productList = document.getElementById("product-list");
const searchInput = document.getElementById("searchInput");
const brandFilter = document.getElementById("brandFilter");
const typeFilter = document.getElementById("typeFilter");

const detailsSection = document.getElementById("product-details");
const detailsContent = document.getElementById("details-content");
const backButton = document.getElementById("backButton");

const wishlistToggle = document.getElementById("wishlistToggle");
const wishlistSidebar = document.getElementById("wishlistSidebar");
const wishlistItems = document.getElementById("wishlistItems");
const wishlistClose = document.getElementById("wishlistClose");

let allProducts = [];
let wishlist = [];

// ==============================
// FETCH PRODUCTS FROM API
// ==============================
async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    allProducts = data.slice(0, 50); // limit to 50
    populateFilters(allProducts);
    renderProducts(allProducts);
  } catch (err) {
    productList.innerHTML = "<p class='text-danger'>Failed to load products.</p>";
  }
}

// ==============================
// POPULATE BRAND AND TYPE FILTERS
// ==============================
function populateFilters(products) {
  const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];
  const types = [...new Set(products.map(p => p.product_type).filter(Boolean))];

  brands.forEach(brand => {
    const option = document.createElement("option");
    option.value = brand;
    option.textContent = brand;
    brandFilter.appendChild(option);
  });

  types.forEach(type => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    typeFilter.appendChild(option);
  });
}

// ==============================
// RENDER PRODUCTS LIST
// ==============================
function renderProducts(products) {
  productList.innerHTML = "";
  if (products.length === 0) {
    productList.innerHTML = "<p>No products match your filters.</p>";
    return;
  }

  products.forEach(product => {
    const col = document.createElement("div");
    col.className = "col-md-3 mb-4";
    col.innerHTML = `
      <div class="card h-100 product-card">
        <img src="${product.image_link}" class="card-img-top" alt="${product.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text text-muted">${product.brand || "Unknown Brand"}</p>
          <p class="card-text fw-bold">$${product.price || "N/A"}</p>
          <button class="btn btn-primary mt-auto mb-2" onclick="showDetails(${product.id})">View</button>
          <button class="btn btn-outline-danger" onclick="addToWishlist(${product.id})">♡ Save</button>
        </div>
      </div>
    `;
    productList.appendChild(col);
  });
}

// ==============================
// SEARCH & FILTER FUNCTIONALITY
// ==============================
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const brand = brandFilter.value;
  const type = typeFilter.value;

  const filtered = allProducts.filter(product => {
    return (!brand || product.brand === brand) &&
           (!type || product.product_type === type) &&
           product.name.toLowerCase().includes(searchTerm);
  });

  renderProducts(filtered);
}

searchInput.addEventListener("input", applyFilters);
brandFilter.addEventListener("change", applyFilters);
typeFilter.addEventListener("change", applyFilters);

// ==============================
// PRODUCT DETAIL VIEW
// ==============================
function showDetails(productId) {
  const product = allProducts.find(p => p.id === productId);
  if (!product) return;

  detailsContent.innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.image_link}" class="img-fluid mb-3" alt="${product.name}">
    <p><strong>Brand:</strong> ${product.brand}</p>
    <p><strong>Type:</strong> ${product.product_type}</p>
    <p><strong>Price:</strong> $${product.price}</p>
    <p><strong>Description:</strong><br>${product.description || "No description available."}</p>
    <a href="${product.product_link}" target="_blank" class="btn btn-success">Buy Now</a>
  `;

  detailsSection.style.display = "block";
  productList.style.display = "none";
}

backButton.addEventListener("click", () => {
  detailsSection.style.display = "none";
  productList.style.display = "flex";
});

// ==============================
// WISHLIST (USING JSON-SERVER)
// ==============================
async function loadWishlist() {
  const res = await fetch(WISHLIST_API);
  wishlist = await res.json();
  renderWishlist();
}

function renderWishlist() {
  wishlistItems.innerHTML = "";
  wishlist.forEach(product => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      ${product.name}
      <button class="btn btn-sm btn-outline-danger" onclick="removeFromWishlist(${product.id})">Remove</button>
    `;
    wishlistItems.appendChild(li);
  });
}

async function addToWishlist(productId) {
  const exists = wishlist.find(p => p.id === productId);
  if (exists) return;

  const product = allProducts.find(p => p.id === productId);
  if (!product) return;

  await fetch(WISHLIST_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  });

  loadWishlist();
}

async function removeFromWishlist(productId) {
  await fetch(`${WISHLIST_API}/${productId}`, { method: "DELETE" });
  loadWishlist();
}

// Toggle Wishlist Sidebar
wishlistToggle.addEventListener("click", () => {
  wishlistSidebar.style.display = "block";
});

wishlistClose.addEventListener("click", () => {
  wishlistSidebar.style.display = "none";
});

// ==============================
// INITIALIZE
// ==============================
fetchProducts();
loadWishlist();
