// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.querySelector(".menu-btn");
const nav = document.getElementById("nav");

function setMenu(open) {
  nav.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

// Contact form
// GitHub Pages cannot process forms by itself, so this opens the visitor's
// email app with their message filled in. Change FIRM_EMAIL to your real address.
// For a fully automatic form, you can later connect a free service such as Formspree.
const FIRM_EMAIL = "info@example.co.ke";

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  status.className = "status";
  status.textContent = "";

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const message = form.message.value.trim();

  let valid = true;
  [form.name, form.email, form.message].forEach((field) => {
    const bad = !field.value.trim() || (field.type === "email" && !field.checkValidity());
    field.classList.toggle("invalid", bad);
    if (bad) valid = false;
  });

  if (!valid) {
    status.classList.add("error");
    status.textContent = "Please fill in your name, a valid email address and your message.";
    return;
  }

  const subject = encodeURIComponent("Enquiry from " + name);
  const body = encodeURIComponent(
    message + "\n\nName: " + name + "\nEmail: " + email + (phone ? "\nPhone: " + phone : "")
  );
  window.location.href = "mailto:" + FIRM_EMAIL + "?subject=" + subject + "&body=" + body;

  status.classList.add("ok");
  status.textContent = "Thank you. Your email app should open so you can send your message.";
  form.reset();
});