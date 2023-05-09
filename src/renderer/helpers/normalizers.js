export function capitalizeFirstLetterAndLowercaseRest(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function capitalizeFirstLetterOnly(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function convertToLowercase(string) {
  return string.toLowerCase();
}
