export function parseTime(
  value
) {
  const cleaned =
    value.trim();

  if (
    cleaned.length === 1
  ) {
    return `0${cleaned}:00`;
  }

  if (
    cleaned.length === 2
  ) {
    return `${cleaned}:00`;
  }

  if (
    cleaned.length === 3
  ) {
    return `0${cleaned[0]}:${cleaned.slice(
      1
    )}`;
  }

  if (
    cleaned.length === 4
  ) {
    return `${cleaned.slice(
      0,
      2
    )}:${cleaned.slice(2)}`;
  }

  return cleaned;
}