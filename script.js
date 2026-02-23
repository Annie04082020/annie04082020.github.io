const themeBtn = document.getElementById("theme-toggle");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const isDark = document.body.getAttribute("data-theme") === "dark";
    document.body.setAttribute("data-theme", isDark ? "light" : "dark");
  });
}

const languageSelector = document.getElementById("language-selector");
if (languageSelector) {
  languageSelector.addEventListener("change", (event) => {
    const selectedLang = event.target.value;
    window.location.href = `../${selectedLang}/index.html`;
  });
}

const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  const links = navLinks.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        navLinks.classList.remove("active");
      }
    });
  });
}

// Sidebar toggle logic
const sidebarToggleBtn = document.getElementById("sidebar-toggle");
const sideNavbar = document.querySelector(".side-navbar");

if (sidebarToggleBtn && sideNavbar) {
  sidebarToggleBtn.addEventListener("click", () => {
    sideNavbar.classList.toggle("open");
    document.body.classList.toggle("sidebar-open");
  });

  // Optional: close sidebar when a section link is clicked on mobile
  const sideLinks = sideNavbar.querySelectorAll("a");
  sideLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        sideNavbar.classList.remove("open");
        document.body.classList.remove("sidebar-open");
      }
    });
  });
}
