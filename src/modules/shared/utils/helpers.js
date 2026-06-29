cat > src/utils/helpers.js <<'EOF'
// Datumformatering
export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("sv-SE");
}

// Validera att ett datum är giltigt
export function isValidDate(dateStr) {
  return !isNaN(new Date(dateStr).getTime());
}

// Generera en unik ID (används inte om vi använder Date.now())
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
}
