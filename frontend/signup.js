// ==========================================================
// Eduvanta — Signup Page Logic
// Handles: password visibility toggle, live validation,
// enabling/disabling the submit button, and form submission.
// No backend yet — form data is only logged to the console.
// ==========================================================

// ---- Grab all the elements we need ----
const form = document.getElementById('signupForm');

const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const roleSelect = document.getElementById('role');

const fullNameError = document.getElementById('fullNameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const roleError = document.getElementById('roleError');

const createAccountBtn = document.getElementById('createAccountBtn');
const successBanner = document.getElementById('successBanner');

const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

// ---- Simple email format check ----
function isValidEmail(value) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(value);
}

// ---- Show / clear an error message under a field ----
function setError(inputEl, errorEl, message) {
  const wrap = inputEl.closest('.input-wrap');
  if (message) {
    errorEl.textContent = message;
    wrap.classList.add('invalid');
  } else {
    errorEl.textContent = '';
    wrap.classList.remove('invalid');
  }
}

// ---- Validate the whole form. Returns true if everything passes ----
function validateForm() {
  let isValid = true;

  // Full Name — required
  if (fullNameInput.value.trim() === '') {
    setError(fullNameInput, fullNameError, 'Full name is required.');
    isValid = false;
  } else {
    setError(fullNameInput, fullNameError, '');
  }

  // Email — required + valid format
  if (emailInput.value.trim() === '') {
    setError(emailInput, emailError, 'Email address is required.');
    isValid = false;
  } else if (!isValidEmail(emailInput.value.trim())) {
    setError(emailInput, emailError, 'Please enter a valid email address.');
    isValid = false;
  } else {
    setError(emailInput, emailError, '');
  }

  // Password — required + minimum 6 characters
  if (passwordInput.value === '') {
    setError(passwordInput, passwordError, 'Password is required.');
    isValid = false;
  } else if (passwordInput.value.length < 6) {
    setError(passwordInput, passwordError, 'Password must be at least 6 characters.');
    isValid = false;
  } else {
    setError(passwordInput, passwordError, '');
  }

  // Confirm Password — required + must match
  if (confirmPasswordInput.value === '') {
    setError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password.');
    isValid = false;
  } else if (confirmPasswordInput.value !== passwordInput.value) {
    setError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match.');
    isValid = false;
  } else {
    setError(confirmPasswordInput, confirmPasswordError, '');
  }

  // Role — required
  if (roleSelect.value === '') {
    setError(roleSelect, roleError, 'Please select a role.');
    isValid = false;
  } else {
    setError(roleSelect, roleError, '');
  }

  return isValid;
}

// ---- Re-check validity on every keystroke/change, toggle the button ----
function handleLiveValidation() {
  const valid = validateForm();
  createAccountBtn.disabled = !valid;
}

[fullNameInput, emailInput, passwordInput, confirmPasswordInput, roleSelect]
  .forEach(field => field.addEventListener('input', handleLiveValidation));

roleSelect.addEventListener('change', handleLiveValidation);

// ---- Show / hide password toggles ----
function attachToggle(toggleEl, inputEl) {
  toggleEl.addEventListener('click', () => {
    if (inputEl.type === 'password') {
      inputEl.type = 'text';
      toggleEl.textContent = '🙈';
    } else {
      inputEl.type = 'password';
      toggleEl.textContent = '👁️';
    }
  });
}

attachToggle(togglePassword, passwordInput);
attachToggle(toggleConfirmPassword, confirmPasswordInput);

// ---- Handle form submission ----
form.addEventListener('submit', (event) => {
  event.preventDefault(); // stop the page from refreshing

  const valid = validateForm();
  createAccountBtn.disabled = !valid;

  if (!valid) {
    return; // errors are already shown under each field
  }

  // Collect form data (no backend yet — just log it)
  const formData = {
    fullName: fullNameInput.value.trim(),
    email: emailInput.value.trim(),
    password: passwordInput.value,
    role: roleSelect.value
  };

  console.log('Signup form submitted:', formData);

  // Show success message
  successBanner.classList.add('visible');

  // Simulate redirect to login after a short delay
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 1800);
});

// ---- Button starts disabled until the form is valid ----
createAccountBtn.disabled = true;
