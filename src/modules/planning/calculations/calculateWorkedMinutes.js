export function calculateWorkedMinutes(
  person
) {
  let totalMinutes = 0;

  Object.values(
    person.shifts || {}
  ).forEach(shift => {

    if (
      !shift ||
      !shift.start ||
      !shift.end
    ) {
      return;
    }

    const [
      sh,
      sm
    ] = shift.start
      .split(":")
      .map(Number);

    const [
      eh,
      em
    ] = shift.end
      .split(":")
      .map(Number);

    let startMinutes =
      sh * 60 + sm;

    let endMinutes =
      eh * 60 + em;

    if (
      endMinutes <
      startMinutes
    ) {
      endMinutes +=
        24 * 60;
    }

    totalMinutes +=
      (
        endMinutes -
        startMinutes
      ) -
      Number(
        shift.break || 0
      );

  });

  return totalMinutes;
}