// NAVHYN shared interactions. Keep this file free of service-specific copy.
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const mobile = document.querySelector("[data-mobile-nav]");
  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const open = mobile.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
    });
  }
  document.querySelectorAll("[data-service-dropdown]").forEach((dropdown) => {
    dropdown.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        dropdown.open = false;
        dropdown.querySelector("summary")?.focus();
      }
    });
  });
  // The contact form is a front-end placeholder until connected to a form handler/CRM.
  const form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = form.querySelector("[data-form-status]");
      if (status) {
        status.hidden = false;
        status.textContent = "Thank you. This demo form is not connected yet. Please email NAVHYN directly or connect the form to your chosen form handler before publishing.";
      }
    });
  }
});
