let periods = [
  {
    id: 1,
    name: "USK Höst (2026-08-31 - 2026-11-29)"
  }
];

export function getPeriods() {
  return periods;
}

export function addPeriod(data) {
  const newPeriod = {
    id: Date.now(),
    name: `${data.name} (${data.from} - ${data.to})`,
    ...data
  };

  periods.push(newPeriod);
}
``