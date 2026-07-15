export function minutesToHHMM(
  minutes
) {
  const hours = Math.floor(
    minutes / 60
  );

  const mins =
    minutes % 60;

  return `${hours}:${String(
    mins
  ).padStart(2, "0")}`;
}