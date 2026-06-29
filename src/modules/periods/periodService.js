let periods = [];

export function getPeriods() {
  return periods;
}

export function addPeriod(data) {
  const newPeriod = {
    id: Date.now(),
    name: data.name || "Namnlös period",
    from: data.from,
    to: data.to,
    planFrom: data.planFrom,
    planTo: data.planTo,
    approveDate: data.approveDate,
    days: data.days || 0,
    rows: data.rows || []
  };
  periods.push(newPeriod);
  return newPeriod;
}

export function loadPeriodsFromStorage() {
  const saved = localStorage.getItem("shiftnow_periods");
  if (saved) {
    periods = JSON.parse(saved);
  }
  return periods;
}

export function savePeriodsToStorage() {
  localStorage.setItem("shiftnow_periods", JSON.stringify(periods));
}