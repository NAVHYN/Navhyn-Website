// NAVHYN shared interactions. Keep this file free of service-specific copy.
// Mobile nav toggle (Safely wrapped so it won't crash the script)
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
  });
  
  document.querySelectorAll('#mobileMenu a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.style.display = 'none');
  });
}

  // Contact form -> Formspree
  // Replace FORMSPREE_ENDPOINT below with your own form endpoint from formspree.io
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mbgrlkgz';

  const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // Extracting values from fields
  const name = document.getElementById('name').value.trim();
  const company = document.getElementById('company').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const request = document.getElementById('request').value;
  const message = document.getElementById('message').value.trim();

  // 1. Validation check
  if (!name || !company || !email || !request) {
    status.textContent = 'Please complete the required fields before continuing.';
    status.className = 'form-status err';
    return;
  }
  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    status.textContent = 'Please enter a valid email address.';
    status.className = 'form-status err';
    return;
  }

  // UI status update before sending
  submitBtn.disabled = true;
  status.textContent = 'Sending...';
  status.className = 'form-status';

  // 2. Complete asynchronous transmission block
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form) // This successfully grabs all 'name' attributes
    });

    if (response.ok) {
      status.textContent = 'Thanks! Your message has been sent successfully.';
      status.className = 'form-status success';
      form.reset(); // Resets the form fields upon success
    } else {
      const data = await response.json();
      if (Object.hasOwn(data, 'errors')) {
        status.textContent = data.errors.map(error => error.message).join(', ');
      } else {
        status.textContent = 'Oops! There was a problem submitting your form.';
      }
      status.className = 'form-status err';
    }
  } catch (error) {
    status.textContent = 'Oops! There was a connection error. Please try again.';
    status.className = 'form-status err';
  } finally {
    // Re-enable the submit button regardless of success or failure
    submitBtn.disabled = false;
  }
  });
