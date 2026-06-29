cat > src/core/router.js <<'EOF'
// Enkel router – kan användas för att hantera URL-fragment om du vill.
// Just nu används state.currentView i app.js direkt.
export function navigate(view, params = {}) {
  window.location.hash = view;
  // Eventuellt dispatchers...
}
