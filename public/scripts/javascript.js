
// Windia Website Script - Basic Navigation & Effects

document.addEventListener("DOMContentLoaded", () => {
  // Toggle responsive nav
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  // Smooth scroll for internal anchor links
  const links = document.querySelectorAll("a[href^='#']");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Highlight active nav item on scroll
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 60) {
        current = section.getAttribute("id");
      }
    });

    document.querySelectorAll("nav a").forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});
