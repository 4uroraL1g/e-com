// Apply saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    applyDarkClasses();
  }
});

// Toggle dark mode and save preference
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  applyDarkClasses();
}

// Add/remove dark-mode class from key elements if needed
function applyDarkClasses() {
  const isDark = document.body.classList.contains('dark-mode');
  const elements = ['header', 'footer', 'form', 'input', 'button'];
  elements.forEach(tag => {
    document.querySelectorAll(tag).forEach(el => {
      if (isDark) el.classList.add('dark-mode');
      else el.classList.remove('dark-mode');
    });
  });
}
