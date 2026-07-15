export function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("sv-SE");
}

export function isValidDate(dateStr) {
  return !isNaN(new Date(dateStr).getTime());
}

export function validatePostnr(postnr) {
  return /^[0-9]{5}$/.test(postnr);
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
}