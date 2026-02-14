// Navbar Toggle untuk Mobile
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

// Toggle mobile menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Active link on scroll
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href") === `#${current}`) {
      item.classList.add("active");
    }
  });
});

// Typing Effect
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Frontend Developer", "UI Designer", "Tech Enthusiast"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1,
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// Portfolio Filter untuk Card Baru
const filterBtn = document.querySelectorAll(".filter-btn");
const portfolioCard = document.querySelectorAll(".portfolio-card");

if (filterBtn.length > 0 && portfolioCard.length > 0) {
  filterBtn.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtn.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      portfolioCard.forEach((card) => {
        if (
          filterValue === "all" ||
          card.getAttribute("data-category") === filterValue
        ) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.8)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// Animate progress bars on scroll
const progressBars = document.querySelectorAll(".progress");

function animateProgressBars() {
  progressBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0";
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.3,
  rootMargin: "0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("about-skills")) {
        animateProgressBars();
      }

      // Add fade-in animation to sections
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(20px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});

// Observe about-skills for progress bar animation
const aboutSkills = document.querySelector(".about-skills");
if (aboutSkills) {
  observer.observe(aboutSkills);
}

// Form submission
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Show success message
    alert("Thank you for your message! I will get back to you soon.");
    contactForm.reset();
  });
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background change on scroll
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(74, 144, 226, 0.15)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "0 2px 20px rgba(74, 144, 226, 0.1)";
  }
});

// Image hover effect for hero image
const imageWrapper = document.querySelector(".image-wrapper");
if (imageWrapper) {
  imageWrapper.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = imageWrapper.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    imageWrapper.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${y * -10}deg)`;
  });

  imageWrapper.addEventListener("mouseleave", () => {
    imageWrapper.style.transform = "perspective(1000px) rotateY(0) rotateX(0)";
  });
}

/// Modal Zoom Image - Hanya untuk gambar
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");
  const closeBtn = document.querySelector(".modal-close");

  // Hanya card-image-wrapper yang bisa membuka modal
  const imageWrappers = document.querySelectorAll(".card-image-wrapper");

  imageWrappers.forEach((wrapper) => {
    wrapper.addEventListener("click", function (e) {
      // Cegah event bubbling
      e.stopPropagation();

      // Ambil gambar di dalam wrapper ini
      const img = this.querySelector(".portfolio-img");
      const card = this.closest(".portfolio-card");
      const title = card.querySelector("h3").textContent;

      // Tampilkan modal
      modal.style.display = "block";
      modalImg.src = img.src;
      modalCaption.innerHTML = "";

      // Prevent body scroll
      document.body.style.overflow = "hidden";
    });
  });

  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }

  // Click outside modal to close
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Prevent klik pada source code dari membuka modal
  const sourceCodeLinks = document.querySelectorAll(".source-code");
  sourceCodeLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.stopPropagation(); // Cegah event bubbling ke card
    });
  });
});
