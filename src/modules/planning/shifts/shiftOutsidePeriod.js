import { isDateActive }
from "../dates/isDateActive.js";

export function shiftOutsidePeriod(
  shift,
  date,
  person,
  period
) {

  const [sh, sm] =
    shift.start
      .split(":")
      .map(Number);

  const [eh, em] =
    shift.end
      .split(":")
      .map(Number);

  const startMinutes =
    sh * 60 + sm;

  const endMinutes =
    eh * 60 + em;

  if (
    endMinutes >=
    startMinutes
  ) {
    return false;
  }

  const nextDate =
    new Date(date);

  nextDate.setDate(
    nextDate.getDate() + 1
  );

  return !isDateActive(
    nextDate,
    person,
    period
  );
}