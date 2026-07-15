export function renderScheduleRows({

  period,
  expandedPerson,
  selectedWeek,
  activeCell,
  cellInput,

  formatDate,
  getWeeksForPerson,

  calculateWorkedMinutes,
  getTargetMinutes,
  minutesToHHMM,

  isDateActive,

  getShiftPosition,
  getShiftWidth,
  getShiftLength

}) {

  let html = "";

  (period.rows || [])
    .forEach(
      (
        person,
        personIndex
      ) => {

        const workedMinutes =
          calculateWorkedMinutes(
            person
          );

        const targetMinutes =
          getTargetMinutes(
            person
          );

        const balanceMinutes =
          targetMinutes -
          workedMinutes;

        html += `

          <tr
            class="heroma-person-row"
            data-person="${personIndex}">

            <td
              colspan="8"
              class="heroma-person-cell">

              ${
                expandedPerson ===
                personIndex
                  ? "−"
                  : "+"
              }

              &nbsp;

              ${person.name || ""}

              &nbsp;

              ${person.personnr || ""}

              &nbsp;

              ${
                person.from ||
                period.from
              }

              -

              ${
                person.to ||
                "Öppet"
              }

              &nbsp;&nbsp;

              Syss.grad:

              ${
                person.sysselsattningsgrad ||
                "100"
              }%

              &nbsp;&nbsp;

              Timmar:

              ${minutesToHHMM(
                workedMinutes
              )}

              /

              ${minutesToHHMM(
                targetMinutes
              )}

              &nbsp;&nbsp;

              ${
                balanceMinutes >= 0
                  ? "Underplanerat"
                  : "Överplanerat"
              }

              :

              ${minutesToHHMM(
                Math.abs(
                  balanceMinutes
                )
              )}

            </td>

          </tr>

        `;

        if (
          expandedPerson !==
          personIndex
        ) {
          return;
        }

        const weeks =
          getWeeksForPerson(
            person,
            period
          );

        weeks.forEach(
          week => {

            const selected =
              selectedWeek &&
              selectedWeek.number ===
              week.number &&
              formatDate(
                selectedWeek.start
              ) ===
              formatDate(
                week.start
              );

            html += `

              <tr
                class="
                  heroma-week-row
                  ${
                    selected
                      ? "selected-week"
                      : ""
                  }
                "
                data-week="${week.number}"
                data-start="${formatDate(
                  week.start
                )}">

                <td>

                  <div
                    class="week-label">

                    Vecka
                    ${week.number}

                  </div>

                  <div
                    class="week-range">

                    ${formatDate(
                      week.start
                    )}

                    -

                    ${formatDate(
                      week.end
                    )}

                  </div>

                </td>

            `;

            for (
              let i = 0;
              i < 7;
              i++
            ) {

              const date =
                week.dates[i];

              const dateKey =
                formatDate(
                  date
                );

              const shift =
                person.shifts?.[
                  dateKey
                ];

              html += `

                <td>

                <div
                  class="day-slot
                  ${
                    activeCell ===
                    `${personIndex}-${dateKey}`
                      ? "active-cell"
                      : ""
                  }
                  ${
                    !isDateActive(
                      date,
                      person,
                      period
                    )
                      ? "inactive-day"
                      : ""
                  }"

                  data-active="${isDateActive(
                    date,
                    person,
                    period
                  )}"

                  data-person="${personIndex}"

                  data-date="${dateKey}">

                ${
                  shift
                    ? `

                  <div
                    class="shift-block ${shift.color || ""}"
                    draggable="true"
                    data-shift-person="${personIndex}"
                    data-shift-date="${dateKey}"

                    style="
                      left:${getShiftPosition(
                        shift
                      )}%;

                      width:${getShiftWidth(
                        shift
                      )}%;
                    "

                    title="Kortkod: ${shift.code || ""}
${shift.title || ""}
${shift.start} - ${shift.end}
${shift.mealBreak
  ? "Måltidsuppehåll"
  : `Rast: ${shift.break || 0} min`
}
Passlängd: ${getShiftLength(
  shift
)}">

                    ${shift.start.substring(
                      0,
                      5
                    )}

                    ${
                      shift.break > 0 &&
                      !shift.mealBreak
                        ? '<span class="break-box"></span>'
                        : ""
                    }

                    ${shift.end.substring(
                      0,
                      5
                    )}

                  </div>

                  `
                    : `

                  <div
                    class="cell-editor">

                    ${
                      activeCell ===
                      `${personIndex}-${dateKey}`
                        ? cellInput
                        : ""
                    }

                  </div>

                  `
                }

                </div>

                </td>

              `;
            }

            html += `

              </tr>

            `;
          }
        );
      }
    );

  return html;
}