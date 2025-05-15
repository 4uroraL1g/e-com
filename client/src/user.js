document.addEventListener("DOMContentLoaded", () => {
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name") || email;

  const userIcon = document.querySelector(".user-menu .user-icon");
  const loginLink = document.getElementById("loginLink");
  const myAccountLink = document.getElementById("myAccountLink");
  const myOrderLink = document.getElementById("myOrderLink");
  const settingLink = document.getElementById("settingLink");
  const logoutBtn = document.getElementById("logoutBtn");
  const dropdown = document.querySelector(".user-menu .dropdown");

  if (token && email) {
    // User logged in — show greeting and account links
    if (userIcon) userIcon.textContent = `👤 Hi, ${name}`;

    if (loginLink) loginLink.style.display = "none";
    if (myAccountLink) myAccountLink.style.display = "block";
    if (myOrderLink) myOrderLink.style.display = "block";
    if (settingLink) settingLink.style.display = "block";
    if (logoutBtn) logoutBtn.style.display = "block";

  } else {
    // User logged out — reset UI to show login/signup
    if (userIcon) userIcon.textContent = "👤";

    if (loginLink) loginLink.style.display = "block";
    if (myAccountLink) myAccountLink.style.display = "none";
    if (myOrderLink) myOrderLink.style.display = "none";
    if (settingLink) settingLink.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "none";
  }

  // Logout event listener with delegation
  if (dropdown) {
    dropdown.addEventListener("click", (e) => {
      if (e.target && e.target.id === "logoutBtn") {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("name"); // ✅ clear name too
        alert("You have been logged out.");
        window.location.reload();
      }
    });
  }
});
