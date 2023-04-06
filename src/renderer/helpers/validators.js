export function passwordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}

export function isStrongPassword(password) {
  return password.length >= 6;
}

export function validateMaxLength(value, maxLength) {
  return value.length <= maxLength;
}

export function isValidEmail(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

export function validateTextOnly(value) {
  return /^[a-zA-Z]*$/.test(value);
}

export function validateTextAndNumbersOnly(value) {
  return /^[a-zA-Z0-9]*$/.test(value);
}

export function validateNotOnlyNumbers(value) {
  return !/^[0-9\s]*$/.test(value);
}

export function validateNumbersOnly(value) {
  return /^[0-9]*$/.test(value);
}

export function validateFileType(file, allowedTypes) {
  return file && allowedTypes.includes(file.type);
}
