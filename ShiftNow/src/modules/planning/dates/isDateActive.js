import { formatDate } from "./formatDate.js";

export function isDateActive(
  date,
  person,
  period
) {
  const current =
    formatDate(date);

  const from =
    person.from ||
    period.from;

  const to =
    person.to &&
    person.to !== "Öppet"
      ? person.to
      : period.to;

  return (
    current >= from &&
    current <= to
  );
}