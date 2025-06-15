/*
all functionality wrapped in DOMContentLoaded event listener to ensure the DOM is fully loaded before executing.
*/

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  const backToTopButton = document.createElement("button");
  backToTopButton.innerHTML = "&uarr;";
  backToTopButton.setAttribute("aria-label", "Back to top");
  backToTopButton.classList.add("back-to-top");
  document.body.appendChild(backToTopButton);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const menuToggle = document.createElement("button");
  menuToggle.innerHTML = "&#9776;";
  menuToggle.setAttribute("aria-label", "Toggle menu");
  menuToggle.classList.add("menu-toggle");
  document.querySelector("header .container").prepend(menuToggle);

  const nav = document.querySelector("header nav");
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("show");
  });

  const sections = document.querySelectorAll("section");
  const fadeInOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, fadeInOptions);

  sections.forEach((section) => {
    fadeInObserver.observe(section);
  });
});
