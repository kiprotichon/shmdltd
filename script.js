const toggle = document.querySelector(".nav__toggle");
const menu = document.querySelector(".nav__menu");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  menu.classList.toggle("active");
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    toggle.classList.remove("active");
    menu.classList.remove("active");
  });
});

/* === GETBUTTON.IO WIDGET === */
(function () {
  var options = {
    phone: "+254785696640", // Your phone number
    call_to_action: "Call Us Now", // Custom message
    position: "right", // Position of the button (left or right)
  };
  var proto = document.location.protocol,
    host = "getbutton.io";
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.async = true;
  s.src = proto + "//static." + host + "/widget-send-button/js/init.js";
  s.onload = function () {
    GetButton.init(options);
  };
  var x = document.getElementsByTagName("script")[0];
  x.parentNode.insertBefore(s, x);
})();

function animateCount(el, opts = {}) {
  const duration = Number(el.dataset.duration || opts.duration || 1800);
  const decimals = Number(el.dataset.decimals || 0);
  const target = Number(el.dataset.target || 0);
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";

  const start = performance.now();
  const startVal = 0;

  function format(val) {
    const fixed = val.toFixed(decimals);
    const parts = fixed.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return prefix + parts.join(".") + suffix;
  }

  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const val = startVal + (target - startVal) * eased;
    el.textContent = format(val);
    if (t < 1) {
      requestAnimationFrame(frame);
    }
  }
  requestAnimationFrame(frame);
}

function startLiveTicker(el) {
  const decimals = Number(el.dataset.decimals || 0);
  let base = Number(el.dataset.target || 0);
  const variance = Number(el.dataset.liveVariance || 5);
  const interval = Number(el.dataset.liveInterval || 3000);

  function nudge() {
    const drift = Math.max(0, Math.round(Math.random() * variance));
    base += drift;
    el.dataset.target = String(base);
    animateCount(el, { duration: 800 });
  }
  const id = setInterval(nudge, interval);
  el._liveId = id;
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animateCount(el);
        if (el.dataset.live === "true") {
          startLiveTicker(el);
        }
        observer.unobserve(el);
      }
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll(".value").forEach((el) => observer.observe(el));

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: e.target.name.value,
    email: e.target.email.value,
    phone: e.target.phone.value,
    message: e.target.message.value,
  };

  let res = await fetch("http://localhost:5000/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  let result = await res.json();
  alert(result.message);
});

/* Swiper initialization moved below to avoid redeclaration error */

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Back to top button functionality
const backToTopBtn = document.getElementById("backToTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
// Initialize AOS (Animate On Scroll) library
AOS.init({
  duration: 1200, // Animation duration in milliseconds
  once: true, // Whether animation should happen only once while scrolling down
});
// Initialize Swiper for the testimonials slider
const swiper = new Swiper(".swiper-container", {
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 5000, // Delay between slides in milliseconds
    disableOnInteraction: false, // Autoplay will not be disabled after user interactions
  },
  loop: true, // Enable looping of slides
});

// Contact form validation and submission
document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get input values
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const phone = this.phone.value.trim();
    const message = this.message.value.trim();

    // Error message elements
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    const messageError = document.getElementById("messageError");
    const formSuccess = document.getElementById("formSuccess");

    // Reset errors
    nameError.style.display = "none";
    emailError.style.display = "none";
    phoneError.style.display = "none";
    messageError.style.display = "none";
    formSuccess.style.display = "none";

    let valid = true;

    // Name validation
    if (name.length < 3) {
      nameError.innerText = "Full name must be at least 3 characters.";
      nameError.style.display = "block";
      valid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError.innerText = "Please enter a valid email address.";
      emailError.style.display = "block";
      valid = false;
    }

    // Phone validation (optional but must match format if filled)
    const phoneRegex = /^[0-9+ -]*$/;
    if (phone && !phoneRegex.test(phone)) {
      phoneError.innerText =
        "Phone number can only contain digits, +, spaces, or -.";
      phoneError.style.display = "block";
      valid = false;
    }

    // Message validation
    if (message.length < 10) {
      messageError.innerText = "Message must be at least 10 characters.";
      messageError.style.display = "block";
      valid = false;
    }

    // Stop if not valid
    if (!valid) return;

    // ✅ If valid, send to backend
    try {
      let res = await fetch("https://your-backend-url.onrender.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });

      let result = await res.json();

      if (result.success) {
        formSuccess.innerText = "✅ Thank you! Your message has been sent.";
        formSuccess.style.display = "block";
        this.reset();
      } else {
        formSuccess.innerText =
          "❌ Something went wrong. Please try again later.";
        formSuccess.style.display = "block";
        formSuccess.style.color = "#e63946";
      }
    } catch (err) {
      formSuccess.innerText = "❌ Could not connect to server.";
      formSuccess.style.display = "block";
      formSuccess.style.color = "#e63946";
    }
  });
// Basic form handler
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you! Your inquiry has been submitted.");
  this.reset();
});
