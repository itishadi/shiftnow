export function getShiftWidth(
  shift
) {
  const [sh, sm] =
    shift.start
      .split(":")
      .map(Number);

  const [eh, em] =
    shift.end
      .split(":")
      .map(Number);

  let start =
    sh * 60 + sm;

  let end =
    eh * 60 + em;

  if (end < start) {
    end += 1440;
  }

  const duration =
    end - start;

  return Math.max(
    12,
    (duration / 1440) * 100
  );
}