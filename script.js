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

    // Jika klik About, trigger animasi progress bar setelah scroll selesai
    if (link.getAttribute("href") === "#about") {
      setTimeout(() => {
        if (!progressBarsAnimated) {
          animateProgressBars();
        }
      }, 800); // Tunggu smooth scroll selesai
    }
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
let progressBarsAnimated = false;

function animateProgressBars() {
  if (progressBarsAnimated) return; // Hanya animasi sekali

  progressBars.forEach((bar) => {
    // Ambil target width yang sudah disimpan di data attribute
    const targetWidth = bar.getAttribute("data-target-width");

    if (targetWidth) {
      // PENTING: Hapus inline style agar tidak conflict
      bar.removeAttribute("style");

      // Set width ke 0 untuk memulai animasi
      bar.style.width = "0";

      // Force reflow untuk memastikan browser tahu width dimulai dari 0
      void bar.offsetWidth;

      // Trigger animasi ke target width setelah delay kecil
      requestAnimationFrame(() => {
        setTimeout(() => {
          bar.style.width = targetWidth;
        }, 50);
      });
    }
  });

  progressBarsAnimated = true;
}

// Intersection Observer untuk animasi - DIPERBAIKI UNTUK MOBILE
const observerOptions = {
  threshold: 0.05, // Sangat rendah agar mudah trigger
  rootMargin: "0px 0px -100px 0px", // Trigger lebih awal
};

// Fungsi untuk mengecek apakah element visible
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Fungsi untuk menampilkan section
function showSection(element) {
  element.style.opacity = "1";
  element.style.transform = "translateY(0)";
  element.classList.add("section-visible");
}

// Cek jika Intersection Observer didukung
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;

        if (target.classList.contains("about-skills")) {
          animateProgressBars();
        }

        // Add fade-in animation to sections
        showSection(target);

        // Stop observing after animation
        observer.unobserve(target);
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
} else {
  // Fallback untuk browser yang tidak support Intersection Observer
  // Langsung tampilkan semua section
  document.querySelectorAll("section").forEach((section) => {
    showSection(section);
  });

  // Animasi progress bar saat scroll
  window.addEventListener("scroll", () => {
    const aboutSkills = document.querySelector(".about-skills");
    if (
      aboutSkills &&
      !progressBarsAnimated &&
      isElementInViewport(aboutSkills)
    ) {
      animateProgressBars();
    }
  });
}

// Reset progress bars on page load dan simpan target width
document.addEventListener("DOMContentLoaded", () => {
  progressBars.forEach((bar) => {
    // Ambil dan simpan target width dari inline style
    const inlineStyle = bar.getAttribute("style");
    if (inlineStyle) {
      const widthMatch = inlineStyle.match(/width:\s*(\d+)%/);

      if (widthMatch) {
        const targetWidth = widthMatch[1] + "%";
        // Simpan target width
        bar.setAttribute("data-target-width", targetWidth);

        // Hapus inline style
        bar.removeAttribute("style");
      }
    }

    // Set width ke 0 menggunakan inline style
    bar.style.width = "0";
  });

  // Backup: Tambahan scroll listener untuk memastikan animasi berjalan
  let hasAnimated = false;
  window.addEventListener("scroll", () => {
    if (hasAnimated) return;

    const aboutSkills = document.querySelector(".about-skills");
    if (aboutSkills) {
      const rect = aboutSkills.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible && !progressBarsAnimated) {
        animateProgressBars();
        hasAnimated = true;
      }
    }
  });
});

// PERBAIKAN: Pastikan section portfolio langsung visible di load untuk mobile
window.addEventListener("load", () => {
  // Timeout untuk memastikan semua element sudah load
  setTimeout(() => {
    const portfolioSection = document.querySelector("#portfolio");
    if (portfolioSection) {
      // Cek jika masih invisible
      const computedStyle = window.getComputedStyle(portfolioSection);
      if (
        computedStyle.opacity === "0" ||
        parseFloat(computedStyle.opacity) < 0.5
      ) {
        showSection(portfolioSection);
      }
    }
  }, 500);
});

// Form submission dengan validasi lengkap dan SweetAlert2
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  // Initialize EmailJS dengan Public Key Anda
  // GANTI 'YOUR_PUBLIC_KEY' dengan Public Key dari EmailJS
  emailjs.init("Ejq3PS-iPky1RX5Y7"); // Ganti dengan key Anda

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Ambil nilai input
    const name = document.getElementById("from_name").value.trim();
    const email = document.getElementById("from_email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validasi 1: Cek semua field wajib terisi
    if (!name) {
      Swal.fire({
        icon: "warning",
        title: "Nama Wajib Diisi!",
        text: "Silakan isi nama Anda terlebih dahulu.",
        confirmButtonColor: "#4a90e2",
      });
      document.getElementById("from_name").focus();
      return;
    }

    // Validasi 2: Nama harus huruf saja (boleh spasi)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      Swal.fire({
        icon: "error",
        title: "Format Nama Salah!",
        text: "Nama harus menggunakan huruf saja, tanpa angka atau simbol.",
        confirmButtonColor: "#4a90e2",
      });
      document.getElementById("from_name").focus();
      return;
    }

    // Validasi 3: Email wajib diisi
    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Email Wajib Diisi!",
        text: "Silakan isi email Anda.",
        confirmButtonColor: "#4a90e2",
      });
      document.getElementById("from_email").focus();
      return;
    }

    // Validasi 4: Email harus format valid (ada @)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Format Email Salah!",
        text: "Email harus menggunakan format yang benar (contoh: ahmad@gmail.com).",
        confirmButtonColor: "#4a90e2",
      });
      document.getElementById("from_email").focus();
      return;
    }

    // Validasi 5: Message wajib diisi
    if (!message) {
      Swal.fire({
        icon: "warning",
        title: "Pesan Wajib Diisi!",
        text: "Silakan isi pesan Anda.",
        confirmButtonColor: "#4a90e2",
      });
      document.getElementById("message").focus();
      return;
    }

    // Semua validasi passed, tampilkan konfirmasi
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Kirim Pesan?",
        text: "Apakah Anda yakin ingin mengirim pesan ini?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Kirim!",
        cancelButtonText: "Batal",
        reverseButtons: false,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          // Tampilkan loading
          Swal.fire({
            title: "Mengirim...",
            text: "Mohon tunggu sebentar",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          try {
            // Kirim email menggunakan EmailJS
            // GANTI 'YOUR_SERVICE_ID' dan 'YOUR_TEMPLATE_ID' dengan ID dari EmailJS
            const response = await emailjs.send(
              "service_2z1tlbx", // Ganti dengan Service ID Anda
              "template_mh9q7l5", // Ganti dengan Template ID Anda
              {
                from_name: name,
                from_email: email,
                subject: subject || "Tidak ada subjek",
                message: message,
                to_email: "muhamadsahbani057@gmail.com", // Email tujuan Anda
              },
            );

            // Sukses
            Swal.fire({
              icon: "success",
              title: "Pesan Berhasil Dikirim!",
              text: "Tunggu balasan di email Anda.",
              confirmButtonColor: "#4a90e2",
            });

            // Reset form
            contactForm.reset();
          } catch (error) {
            // Error
            console.error("EmailJS Error:", error);
            Swal.fire({
              icon: "error",
              title: "Gagal Mengirim!",
              text: "Terjadi kesalahan. Silakan coba lagi nanti.",
              confirmButtonColor: "#4a90e2",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Dibatalkan",
            text: "Pesan Anda tidak jadi dikirim.",
            icon: "info",
            confirmButtonColor: "#4a90e2",
          });
        }
      });
  });
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      // Pastikan target section visible sebelum scroll
      showSection(target);

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

// Modal Zoom Image - Hanya untuk gambar
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
