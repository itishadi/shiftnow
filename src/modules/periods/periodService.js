let periods = [];

const saved =
  localStorage.getItem(
    "shiftnow_periods"
  );

if (saved) {

  try {

    periods =
      JSON.parse(saved);

  } catch {

    periods = [];
  }

}

function ensureStructure(period) {

  if (!period.rows) {
    period.rows = [];
  }

  period.rows.forEach(row => {

    if (!row.shifts) {
      row.shifts = {};
    }

  });

  return period;
}

export function getPeriods() {

  periods =
    periods.map(
      ensureStructure
    );

  return periods;
}

export function addPeriod(data) {

  const newPeriod = {

    id: Date.now(),

    name:
      data.name ||
      "Namnlös period",

    from:
      data.from || "",

    to:
      data.to || "",

    planFrom:
      data.planFrom || "",

    planTo:
      data.planTo || "",

    approveDate:
      data.approveDate || "",

    days:
      Number(
        data.days || 0
      ),

    rows:
      (data.rows || [])
      .map(row => ({

        ...row,

        shifts:
          row.shifts || {}

      }))
  };

  periods.push(
    newPeriod
  );

  savePeriodsToStorage();

  return newPeriod;
}

export function removePeriod(id) {

  periods =
    periods.filter(
      p => p.id !== id
    );

  savePeriodsToStorage();
}

export function updatePeriod(
  id,
  updates
) {

  const index =
    periods.findIndex(
      p => p.id === id
    );

  if (index === -1) {
    return;
  }

  periods[index] = {

    ...periods[index],

    ...updates
  };

  periods[index] =
    ensureStructure(
      periods[index]
    );

  savePeriodsToStorage();
}

export function savePeriodsToStorage() {

  periods =
    periods.map(
      ensureStructure
    );

  localStorage.setItem(
    "shiftnow_periods",
    JSON.stringify(periods)
  );
}

export function saveShift(
  periodId,
  employeeName,
  date,
  shift
) {

  const period =
    periods.find(
      p => p.id === periodId
    );

  if (!period) {
    return;
  }

  const employee =
    period.rows.find(
      row =>
        row.name === employeeName
    );

  if (!employee) {
    return;
  }

  if (!employee.shifts) {
    employee.shifts = {};
  }

  employee.shifts[date] = {

    start:
      shift.start || "",

    end:
      shift.end || "",

    break:
      Number(
        shift.break || 0
      )
  };

  savePeriodsToStorage();
}

export function deleteShift(
  periodId,
  employeeName,
  date
) {

  const period =
    periods.find(
      p => p.id === periodId
    );

  if (!period) {
    return;
  }

  const employee =
    period.rows.find(
      row =>
        row.name === employeeName
    );

  if (!employee) {
    return;
  }

  if (
    employee.shifts &&
    employee.shifts[date]
  ) {

    delete employee.shifts[date];

    savePeriodsToStorage();
  }
}

export function getShift(
  periodId,
  employeeName,
  date
) {

  const period =
    periods.find(
      p => p.id === periodId
    );

  if (!period) {
    return null;
  }

  const employee =
    period.rows.find(
      row =>
        row.name === employeeName
    );

  if (!employee) {
    return null;
  }

  return (
    employee.shifts?.[date]
    || null
  );
}

export function clearPeriods() {

  periods = [];

  localStorage.removeItem(
    "shiftnow_periods"
  );
}

export function
getPeriodStatus(
  period
) {

  const rows =
    period.rows || [];

  const approved =
    rows.filter(
      r =>
        r.status ===
        "Fastställd"
    ).length;

  return {

    total:
      rows.length,

    approved,

    complete:
      rows.length > 0 &&
      approved ===
      rows.length

  };

}