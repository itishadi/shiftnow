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