import { getWeekNumber } from "./getWeekNumber.js";

export function getWeeksForPerson(
  person,
  period
) {
  const weeks = [];

  let start = new Date(
    person.from ||
      period.from
  );

  let end = new Date(
    person.to &&
      person.to !== "Öppet"
      ? person.to
      : period.to
  );

  while (
    start.getDay() !== 1
  ) {
    start.setDate(
      start.getDate() - 1
    );
  }

  while (start <= end) {
    const weekStart =
      new Date(start);

    const weekEnd =
      new Date(start);

    weekEnd.setDate(
      weekEnd.getDate() + 6
    );

    const dates = [];

    for (
      let i = 0;
      i < 7;
      i++
    ) {
      const d =
        new Date(weekStart);

      d.setDate(
        weekStart.getDate() + i
      );

      dates.push(d);
    }

    weeks.push({
      number:
        getWeekNumber(
          weekStart
        ),
      start: weekStart,
      end: weekEnd,
      dates
    });

    start.setDate(
      start.getDate() + 7
    );
  }

  return weeks;
}