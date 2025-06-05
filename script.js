const productContainer = document.getElementById("product-container");
const errorMessage = document.getElementById("error-message");

async function loadProducts() {
  productContainer.innerHTML = "<p>Loading products...</p>";
  errorMessage.textContent = "";

  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("Failed to fetch products");
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    errorMessage.textContent = "Error loading fashion products. Please try again.";
    productContainer.innerHTML = "";
  }
}

function renderProducts(products) {
  productContainer.innerHTML = "";
  products.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.animationDelay = `${index * 100}ms`;

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div class="product-info">
        <h3>${item.title}</h3>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Price:</strong> $${item.price}</p>
        <a href="#">Buy Now</a>
      </div>
    `;
    card.classList.add("fade-in");
    productContainer.appendChild(card);
  });
}

// Toggle light/dark theme
function toggleTheme() {
  document.body.classList.toggle("dark");
  const icon = document.getElementById("theme-icon");
  icon.classList.toggle("fa-moon");
  icon.classList.toggle("fa-sun");
}

// Initial load
window.onload = loadProducts;
