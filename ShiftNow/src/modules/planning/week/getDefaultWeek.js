export function getDefaultWeek(
  period,
  getWeeksForPerson
) {

  const firstPerson =
    period.rows?.[0];

  if (!firstPerson) {
    return null;
  }

  const weeks =
    getWeeksForPerson(
      firstPerson,
      period
    );

  return weeks[0] || null;

}