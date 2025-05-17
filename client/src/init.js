// init.js
document.addEventListener("DOMContentLoaded", () => {
  // Load username greeting
  const username = localStorage.getItem("username");
  const greetingEl = document.getElementById("greeting");
  const loginLink = document.getElementById("loginLink");
  const logoutBtn = document.getElementById("logoutBtn");

  if (username && greetingEl) {
    greetingEl.textContent = `Hello, ${username}`;
    greetingEl.style.display = "block";
    if (loginLink) loginLink.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline";
  }

  // Load cart count
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.getElementById("cartCount");
  if (cartCount) cartCount.textContent = cart.length;
});
