let periods = [];

// Ladda från localStorage
const saved = localStorage.getItem("shiftnow_periods");
if (saved) {
  periods = JSON.parse(saved);
}

export function getPeriods() {
  return periods;
}

export function addPeriod(data) {
  const newPeriod = {
    id: Date.now(),
    name: data.name || "Namnlös period",
    from: data.from,
    to: data.to || "",
    planFrom: data.planFrom || "",
    planTo: data.planTo || "",
    approveDate: data.approveDate || "",
    days: data.days || 0,
    rows: data.rows || []
  };
  periods.push(newPeriod);
  localStorage.setItem("shiftnow_periods", JSON.stringify(periods));
  return newPeriod;
}

export function removePeriod(id) {
  periods = periods.filter(p => p.id !== id);
  localStorage.setItem("shiftnow_periods", JSON.stringify(periods));
}

export function updatePeriod(id, data) {
  const index = periods.findIndex(p => p.id === id);
  if (index !== -1) {
    periods[index] = { ...periods[index], ...data };
    localStorage.setItem("shiftnow_periods", JSON.stringify(periods));
  }
}

export function savePeriodsToStorage() {
  localStorage.setItem("shiftnow_periods", JSON.stringify(periods));
}