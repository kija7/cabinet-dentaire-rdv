document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('appointment-form');
  const timeSlots = document.querySelectorAll('.time-slot');
  const timeInput = document.getElementById('time');
  const successMessage = document.getElementById('success-message');
  const dateInput = document.getElementById('date');

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);

  // Time slot selection
  timeSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      timeSlots.forEach(s => s.classList.remove('selected'));
      slot.classList.add('selected');
      timeInput.value = slot.dataset.value;
      clearError('time');
    });
  });

  // Real-time error clearing
  const fields = ['firstName', 'lastName', 'email', 'phone', 'service', 'date', 'consent'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => clearError(id));
    el.addEventListener('change', () => clearError(id));
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    let isValid = true;

    const data = {
      firstName: document.getElementById('firstName').value.trim(),
      lastName: document.getElementById('lastName').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      service: document.getElementById('service').value,
      date: document.getElementById('date').value,
      time: timeInput.value,
      message: document.getElementById('message').value.trim(),
      consent: document.getElementById('consent').checked
    };

    // Validation
    if (!data.firstName) {
      showError('firstName', 'Veuillez indiquer votre prénom.');
      isValid = false;
    }

    if (!data.lastName) {
      showError('lastName', 'Veuillez indiquer votre nom.');
      isValid = false;
    }

    if (!data.email || !isValidEmail(data.email)) {
      showError('email', 'Veuillez indiquer une adresse e-mail valide.');
      isValid = false;
    }

    if (!data.phone || !isValidPhone(data.phone)) {
      showError('phone', 'Veuillez indiquer un numéro de téléphone valide.');
      isValid = false;
    }

    if (!data.service) {
      showError('service', 'Veuillez choisir un type de soin.');
      isValid = false;
    }

    if (!data.date) {
      showError('date', 'Veuillez choisir une date.');
      isValid = false;
    } else if (data.date < today) {
      showError('date', 'La date ne peut pas être dans le passé.');
      isValid = false;
    }

    if (!data.time) {
      showError('time', 'Veuillez choisir une heure de rendez-vous.');
      isValid = false;
    }

    if (!data.consent) {
      showError('consent', 'Vous devez accepter l\'utilisation de vos données.');
      isValid = false;
    }

    if (!isValid) return;

    // Simulate submission (no backend connected)
    console.log('Rendez-vous demandé :', data);
    form.style.display = 'none';
    successMessage.classList.add('visible');
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  function showError(fieldId, message) {
    const errorEl = document.getElementById('error-' + fieldId);
    const inputEl = document.getElementById(fieldId);
    if (errorEl) errorEl.textContent = message;
    if (inputEl && inputEl.classList) inputEl.classList.add('error-field');
  }

  function clearError(fieldId) {
    const errorEl = document.getElementById('error-' + fieldId);
    const inputEl = document.getElementById(fieldId);
    if (errorEl) errorEl.textContent = '';
    if (inputEl && inputEl.classList) inputEl.classList.remove('error-field');
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    return /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(phone);
  }
});
