const menuToggle = document.getElementById("menuToggle");
const mobileMenuWrap = document.getElementById("mobileMenuWrap");
const copyDiscordBtn = document.getElementById("copyDiscordBtn");
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");
const revealItems = document.querySelectorAll(".reveal");
const backToTop = document.getElementById("backToTop");
const brandTrigger = document.getElementById("brandTrigger");
const loader = document.getElementById("loader");

if (loader) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 700);
  });
}

if (menuToggle && mobileMenuWrap) {
  menuToggle.addEventListener("click", () => {
    mobileMenuWrap.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuWrap.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu = mobileMenuWrap.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      mobileMenuWrap.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });
}

if (copyDiscordBtn) {
  copyDiscordBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("@l0vefordem");
      copyDiscordBtn.textContent = "Copied";
      setTimeout(() => {
        copyDiscordBtn.textContent = "Copy Discord";
      }, 1400);
    } catch {
      copyDiscordBtn.textContent = "@l0vefordem";
    }
  });
}

if (brandTrigger) {
  brandTrigger.addEventListener("click", (event) => {
    if (event.detail === 2) {
      event.preventDefault();
      document.body.classList.add("flash-theme");
      setTimeout(() => {
        document.body.classList.remove("flash-theme");
      }, 500);
    }
  });
}

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

function revealOnScroll() {
  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      item.classList.add("visible");
    }
  });
}

function updateActiveNav() {
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 140;
    const height = section.offsetHeight;

    if (window.scrollY >= top && window.scrollY < top + height) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

function updateNavbarStyle() {
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

function updateBackToTop() {
  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}

window.addEventListener("scroll", () => {
  revealOnScroll();
  updateActiveNav();
  updateNavbarStyle();
  updateBackToTop();
});

window.addEventListener("load", () => {
  revealOnScroll();
  updateActiveNav();
  updateNavbarStyle();
  updateBackToTop();
});