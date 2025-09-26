let cart = [];

function scrollToProducts() {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

function filterCategory(category) {
  const products = document.querySelectorAll(".product-card");
  const sectionTitle = document.querySelector("#products .section-title");

  // Update section title
  sectionTitle.textContent =
    category.charAt(0).toUpperCase() + category.slice(1);

  // Show/hide products based on category
  products.forEach((product) => {
    if (product.dataset.category === category || category === "all") {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });

  // Scroll to products section
  scrollToProducts();
}

function addToCart(name, price) {
  cart.push({ name, price });

  // Visual feedback
  const button = event.target;
  const originalText = button.innerHTML;
  button.innerHTML = "✓";
  button.style.background = "#4CAF50";

  setTimeout(() => {
    button.innerHTML = originalText;
    button.style.background = "#FF9800";
  }, 1000);

  // Show notification
  showNotification(`${name} ditambahkan ke keranjang!`);
}

function showCart() {
  if (cart.length === 0) {
    showNotification("Keranjang masih kosong");
    return;
  }

  let cartItems = "Keranjang Belanja:\n\n";
  cart.forEach((item, index) => {
    cartItems += `${index + 1}. ${item.name} - ${item.price}\n`;
  });

  alert(cartItems);
}

function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div");
  notification.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: #4CAF50;
                color: white;
                padding: 12px 24px;
                border-radius: 25px;
                font-size: 14px;
                z-index: 1000;
                animation: slideIn 0.3s ease;
            `;
  notification.textContent = message;

  // Add animation keyframes
  const style = document.createElement("style");
  style.textContent = `
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
            `;
  document.head.appendChild(style);

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Add search functionality
document.querySelector(".search-box").addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();
  const products = document.querySelectorAll(".product-card");

  products.forEach((product) => {
    const productName = product
      .querySelector(".product-name")
      .textContent.toLowerCase();
    if (productName.includes(searchTerm)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
});

// Hero slider dots functionality
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    dots[currentSlide].classList.remove("active");
    dots[index].classList.add("active");
    currentSlide = index;
  });
});

// Auto slide every 5 seconds
setInterval(() => {
  dots[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % dots.length;
  dots[currentSlide].classList.add("active");
}, 5000);
