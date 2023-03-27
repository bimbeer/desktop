export function passwordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}

export function isStrongPassword(password) {
  return password.length >= 6;
}

export function isValidEmail(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}
