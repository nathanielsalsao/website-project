document.addEventListener("DOMContentLoaded", () => {
  // ===== THEME SYSTEM =====
  const savedTheme = localStorage.getItem('theme') || 'default';
  document.body.classList.add(savedTheme);

  const themeSelect = document.getElementById('themeSelect');
  if (themeSelect) {
    themeSelect.value = savedTheme;
    themeSelect.addEventListener('change', () => {
      const theme = themeSelect.value;
      setTheme(theme);
      localStorage.setItem('theme', theme);
    });
  }

  const navArea = document.querySelector('.nav-area');
  const sidebar = document.getElementById("sidebar");
  const navbarColorSelect = document.getElementById('navbarColorSelect');
  const savedNavColor = localStorage.getItem('navbarColor');

  if (navArea) {
    const initialColor = savedNavColor || 'default';
    navArea.classList.add(initialColor);
    if (sidebar) sidebar.classList.add(initialColor);
    if (navbarColorSelect) navbarColorSelect.value = initialColor;
  }

  if (navbarColorSelect && navArea) {
    navbarColorSelect.addEventListener('change', () => {
      const color = navbarColorSelect.value;
      const colors = ['dark','light','neon','violet','night','default'];
      navArea.classList.remove(...colors);
      sidebar?.classList.remove(...colors);
      navArea.classList.add(color);
      sidebar?.classList.add(color);
      if (color === 'default') localStorage.removeItem('navbarColor');
      else localStorage.setItem('navbarColor', color);
    });
  }

  // ===== SIDEBAR ANIMATION =====
  const sidebarEl = document.getElementById("sidebar");
  window.openSidebar = function() {
    sidebarEl.classList.add("active");
    sidebarEl.classList.remove("closing");
  }
  window.closeSidebar = function() {
    sidebarEl.classList.add("closing");
    setTimeout(() => {
      sidebarEl.classList.remove("active", "closing");
    }, 300);
  }

  const sidebarToggleBtn = document.querySelector(".navbar .sidebar-toggle");
  const sidebarCloseBtn = document.querySelector("#sidebar .sidebar-close-btn");
  sidebarToggleBtn?.addEventListener("click", openSidebar);
  sidebarCloseBtn?.addEventListener("click", closeSidebar);

  // ===== LOGOUT BUTTON =====
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "login.html";
  });

  // ===== CONTACT CARD =====
  const contactCard = document.getElementById('contactCard');
  window.toggleContactCard = function() {
    contactCard.style.display =
      contactCard.style.display === 'flex' ? 'none' : 'flex';
  };

  // ===== PAGE FADE ANIMATION =====
  document.body.classList.add("loaded");
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
      e.preventDefault();
      document.body.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = href;
      }, 400);
    });
  });
});

// ===== THEME HELPER =====
window.setTheme = function(theme) {
  document.body.className = theme + ' loaded'; // preserve fade animation class
  const navbar = document.querySelector(".navbar");
  const sidebarEl = document.getElementById("sidebar");
  const colors = ['default','dark','light','neon','violet','night'];
  navbar?.classList.remove(...colors);
  sidebarEl?.classList.remove(...colors);
  navbar?.classList.add(theme);
  sidebarEl?.classList.add(theme);
}

// ===== NAVBAR HIDE ON SCROLL =====
let lastScrollY = 0;
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (!navbar) return;
  if (window.scrollY <= 10) navbar.style.transform = "translateY(0)";
  else if (window.scrollY > lastScrollY) navbar.style.transform = "translateY(-100%)";
  else navbar.style.transform = "translateY(0)";
  lastScrollY = window.scrollY;
});
