document.addEventListener("DOMContentLoaded", () => {
  // ===== NAV: mobile toggle =====
  const header = document.querySelector("header");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  if (navToggle && navLinks && header) {
    const toggleNav = () => {
      header.classList.toggle("nav-open");
    };

    navToggle.addEventListener("click", toggleNav);

    navToggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleNav();
      }
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => header.classList.remove("nav-open"));
    });
  }

  // ===== PROJECT FILTER (projects.html only) =====
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        projectCards.forEach((card) => {
          const categories = card.getAttribute("data-category");
          if (filter === "all" || categories.includes(filter)) {
            card.classList.remove("hidden");
          } else {
            card.classList.add("hidden");
          }
        });
      });
    });
  }

  // ===== BLOG POPUP MODAL (blogs.html only) =====
  const blogCards = document.querySelectorAll(".blog-card");
  const modalOverlay = document.getElementById("blog-modal-overlay");
  const modalBody = document.getElementById("modal-body");
  const modalTitle = document.getElementById("modal-title");
  const modalCloseBtn = document.getElementById("modal-close");

  function openModalFromBlogCard(card) {
    const targetId = card.getAttribute("data-blog");
    const fullContent = document.getElementById(targetId);
    if (!fullContent || !modalOverlay || !modalBody || !modalTitle) return;

    modalBody.innerHTML = fullContent.innerHTML;
    const heading = fullContent.querySelector("h3");
    modalTitle.textContent = heading ? heading.textContent : "Blog";

    modalOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  if (blogCards.length && modalOverlay && modalBody && modalTitle && modalCloseBtn) {
    blogCards.forEach((card) => {
      card.addEventListener("click", () => openModalFromBlogCard(card));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModalFromBlogCard(card);
        }
      });
    });

    function closeModal() {
      modalOverlay.classList.remove("open");
      document.body.style.overflow = "";
    }

    modalCloseBtn.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalOverlay.classList.contains("open")) {
        closeModal();
      }
    });
  }

  // ===== CONTACT FORM VALIDATION (contact.html only) =====
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      formMessage.textContent = "";
      formMessage.className = "form-message";

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();

      if (!name || !email || !message) {
        formMessage.textContent = "Please fill in all fields.";
        formMessage.classList.add("error");
        return;
      }

      if (!isValidEmail(email)) {
        formMessage.textContent = "Please enter a valid email address.";
        formMessage.classList.add("error");
        return;
      }

      formMessage.textContent = "Thank you! Your message has been received (demo).";
      formMessage.classList.add("success");
      contactForm.reset();
    });
  }

  // ===== FOOTER SCROLL ANIMATION =====
  const footer = document.querySelector("footer");
  if (footer) {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px"
    };

    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Use requestAnimationFrame for smoother animation trigger
          requestAnimationFrame(() => {
            footer.classList.add("visible");
          });
        } else {
          // Optional: Remove class when scrolling back up (for re-animation)
          // Uncomment if you want animations to retrigger
          // footer.classList.remove("visible");
        }
      });
    }, observerOptions);

    footerObserver.observe(footer);
  }
});