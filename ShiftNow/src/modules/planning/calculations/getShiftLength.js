import { minutesToHHMM }
from "./minutesToHHMM.js";

export function getShiftLength(
  shift
) {

  if (
    !shift ||
    !shift.start ||
    !shift.end
  ) {
    return "0:00";
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

  let start =
    sh * 60 + sm;

  let end =
    eh * 60 + em;

  if (
    end < start
  ) {
    end +=
      24 * 60;
  }

  let duration =
    end - start;

  if (
    !shift.mealBreak
  ) {
    duration -=
      Number(
        shift.break || 0
      );
  }

  return minutesToHHMM(
    duration
  );
}