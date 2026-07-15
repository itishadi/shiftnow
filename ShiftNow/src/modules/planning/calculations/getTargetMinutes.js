export function getTargetMinutes(
  person
) {

  if (
    !person.from ||
    !person.to ||
    person.to === "Öppet"
  ) {
    return 0;
  }

  const start =
    new Date(
      person.from
    );

  const end =
    new Date(
      person.to
    );

  const days =
    Math.floor(
      (
        end - start
      ) /
      86400000
    ) + 1;

  const weeks =
    days / 7;

  const weeklyTime =
    person.time ||
    "40:00";

  const [
    h,
    m
  ] = weeklyTime
    .split(":")
    .map(Number);

  const weeklyMinutes =
    h * 60 + m;

  return Math.round(
    weeks *
    weeklyMinutes
  );
}
