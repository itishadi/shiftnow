export function getShiftPosition(
  shift
) {
  const [h, m] =
    shift.start
      .split(":")
      .map(Number);

  const minutes =
    h * 60 + m;

  return (
    minutes / 1440
  ) * 100;
}