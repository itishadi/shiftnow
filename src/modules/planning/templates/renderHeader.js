export function renderHeader(
  selectedWeek,
  dayNames,
  getDayHeaderClass
) {
  if (!selectedWeek) {
    return `
      <thead>
        <tr class="heroma-header-row">
          <th>Vecka</th>
          <th>Måndag</th>
          <th>Tisdag</th>
          <th>Onsdag</th>
          <th>Torsdag</th>
          <th>Fredag</th>
          <th>Lördag</th>
          <th class="sunday-header">
            Söndag
          </th>
        </tr>
      </thead>
    `;
  }

  return `
    <thead>
      <tr class="heroma-header-row">

        <th>Vecka</th>

        ${selectedWeek.dates
          .map(
            (date, index) => `
              <th
                class="${getDayHeaderClass(
                  date,
                  index
                )}">

                ${dayNames[index]}

                ${String(
                  date.getDate()
                ).padStart(2, "0")}

              </th>
            `
          )
          .join("")}

      </tr>
    </thead>
  `;
}