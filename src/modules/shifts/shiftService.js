cat > src/modules/shifts/shiftService.js <<'EOF'
// Här kan du hantera pass, t.ex. lägga till, ta bort, schemalägga
let shifts = [];

export function getShifts() {
  return shifts;
}

export function addShift(shift) {
  shifts.push(shift);
  return shift;
}

export function removeShift(id) {
  shifts = shifts.filter(s => s.id !== id);
}
