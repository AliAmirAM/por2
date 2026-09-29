const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const contactForm = document.getElementById("contact-form");

function updateNavbar() {
  navbar.classList.toggle("is-scrolled", window.scrollY > 12);
}

updateNavbar();
window.addEventListener("scroll", updateNavbar, { passive: true });

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  menuToggle.innerHTML = `<i class="fa-solid ${isOpen ? "fa-bars" : "fa-xmark"}" aria-hidden="true"></i>`;
  navLinks.classList.toggle("is-open", !isOpen);
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
  }
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

document.getElementById("year").textContent = new Date().getFullYear();

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);
  const name = String(formData.get("name")).trim();
  const senderEmail = String(formData.get("email")).trim();
  const subject = String(formData.get("subject")).trim();
  const message = String(formData.get("message")).trim();
  const body = `Hi Ali,\n\n${message}\n\nFrom: ${name}${senderEmail ? `\nEmail: ${senderEmail}` : ""}`;
  const channel = event.submitter.value;

  if (channel === "email") {
    const mailto = `mailto:aliamir70801@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    return;
  }

  if (channel === "whatsapp") {
    const whatsapp = `https://wa.me/201032092971?text=${encodeURIComponent(`${subject}\n\n${body}`)}`;
    window.open(whatsapp, "_blank", "noopener,noreferrer");
  }
});
