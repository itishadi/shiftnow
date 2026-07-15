import { parseTime }
from "./parseTime.js";

export function createShift(
  value,
  date,
  person,
  period,
  timeBlocks,
  getRole,
  shiftOutsidePeriod
) {

  const parts =
    value
      .trim()
      .split(/\s+/);

  if (
    parts.length === 1
  ) {

    const code =
      parts[0]
        .toUpperCase();

    const block =
      timeBlocks[code];

    if (!block) {
      return;
    }

    if (
      !person.shifts
    ) {
      person.shifts = {};
    }

    const newShift = {
      start:
        block.start,
      end:
        block.end,
      break:
        block.break,
      title:
        block.title,
      code:
        block.code,
      color:
        block.color,
      mealBreak:
        false
    };

    if (
      shiftOutsidePeriod(
        newShift,
        new Date(date),
        person,
        isDateActive
      )
    ) {

      alert(
        "Passet går utanför planeringsperioden.\n\nÄndra passet eller utöka datumintervallet."
      );

      return;
    }

    person.shifts[
      date
    ] = newShift;

    return;
  }

  if (
    parts.length >= 4
  ) {

    const role =
      parts[
        parts.length - 1
      ].toLowerCase();

    const roleInfo =
      getRole(role);

    if (!roleInfo) {

      alert(
        "Färgblock saknas: " +
        role
      );

      return;
    }

    const start =
      parseTime(
        parts[0]
      );

    const end =
      parseTime(
        parts[1]
      );

    const mealBreak =
      parts.some(
        p =>
          p.toLowerCase() === "m"
      );

    const breakMinutes =
      mealBreak
        ? 0
        : Number(
            parts[2]
          );

    if (
      !person.shifts
    ) {
      person.shifts = {};
    }

    const newShift = {
      start,
      end,
      break:
        breakMinutes,
      title:
        roleInfo.title,
      code:
        roleInfo.code.toUpperCase(),
      color:
        roleInfo.color,
      mealBreak
    };

    if (
      shiftOutsidePeriod(
        newShift,
        new Date(date),
        person,
        isDateActive
      )
    ) {

      alert(
        "Passet går utanför planeringsperioden.\n\nÄndra passet eller utöka datumintervallet."
      );

      return;
    }

    person.shifts[
      date
    ] = newShift;
  }
}
