// ============================================
//  utils/validation.js — Form validation helpers
// ============================================

/**
 * Validate email format
 */
export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  return re.test(email.trim())
}

/**
 * Validate phone number — 10 digits (India format support)
 */
export function isValidPhone(phone) {
  const digits = phone.replace(/[\s\-\(\)]/g, '')
  return /^\d{10}$/.test(digits)
}

/**
 * Email OR phone
 */
export function isValidEmailOrPhone(value) {
  return isValidEmail(value) || isValidPhone(value)
}

/**
 * Validate name — min 2 chars, only letters and spaces
 */
export function isValidName(name) {
  return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim())
}

/**
 * Password strength
 * Returns: 'weak' | 'medium' | 'strong'
 */
export function getPasswordStrength(password) {
  let score = 0
  if (password.length >= 8)          score++
  if (/[A-Z]/.test(password))        score++
  if (/[0-9]/.test(password))        score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  if (score <= 1) return 'weak'
  if (score <= 2) return 'medium'
  return 'strong'
}

/**
 * Validate login form
 * Returns object: { isValid, errors }
 */
export function validateLoginForm({ email, password }) {
  const errors = {}

  if (!email.trim()) {
    errors.email = 'Email or phone number is required.'
  } else if (!isValidEmailOrPhone(email)) {
    errors.email = 'Please enter a valid email or phone number.'
  }

  if (!password) {
    errors.password = 'Password is required.'
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters.'
  }

  return { isValid: Object.keys(errors).length === 0, errors }
}

/**
 * Validate signup form
 * Returns object: { isValid, errors }
 */
export function validateSignupForm({ firstName, lastName, email, password, confirmPassword, dob, gender }) {
  const errors = {}

  if (!isValidName(firstName)) {
    errors.firstName = 'Enter a valid first name (letters only, min 2 chars).'
  }
  if (!isValidName(lastName)) {
    errors.lastName = 'Enter a valid last name (letters only, min 2 chars).'
  }
  if (!email.trim()) {
    errors.email = 'Email or phone number is required.'
  } else if (!isValidEmailOrPhone(email)) {
    errors.email = 'Enter a valid email or phone number.'
  }
  if (!password) {
    errors.password = 'Password is required.'
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  }
  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.'
  }
  if (!dob) {
    errors.dob = 'Date of birth is required.'
  } else {
    const age = new Date().getFullYear() - new Date(dob).getFullYear()
    if (age < 13) errors.dob = 'You must be at least 13 years old.'
  }
  if (!gender) {
    errors.gender = 'Please select your gender.'
  }

  return { isValid: Object.keys(errors).length === 0, errors }
}

/**
 * Validate forgot password form
 */
export function validateForgotForm({ email }) {
  const errors = {}
  if (!email.trim()) {
    errors.email = 'Email or phone number is required.'
  } else if (!isValidEmailOrPhone(email)) {
    errors.email = 'Enter a valid email or phone number.'
  }
  return { isValid: Object.keys(errors).length === 0, errors }
}
