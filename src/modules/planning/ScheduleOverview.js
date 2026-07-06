import {
  timeBlocks,
  getAllTimeBlocks,
  addOrUpdateTimeBlock,
  saveTimeBlocks,
  loadTimeBlocks,
  editTimeBlock,
  deleteTimeBlock,
  duplicateTimeBlock,
  createTimeBlock
}
from "./timeBlocks.js";

import {
  shiftRoles,
  getRole,
  getAllRoles,
  createRole,
  deleteRole
}
from "../shifts/shiftRoles.js";

export function ScheduleOverview(
  periods,
  currentPeriodId
) {

  const container =
    document.createElement("div");

  container.className =
    "schedule-overview";

  const period =
    periods.find(
      p => p.id === currentPeriodId
    );

  if (!period) {

    container.innerHTML =
      "<p>Ingen period vald.</p>";

    return container;

  }
  loadTimeBlocks();

  let expandedPerson =
    null;

  let selectedWeek =
    null;

  let activeCell =
    null;

  let cellInput =
    "";

  const dayNames = [

    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag",
    "Söndag"

  ];

  function formatDate(
    date
  ) {

    return date
      .toISOString()
      .split("T")[0];

  }

  function isDateActive(
  date,
  person
) {

  const current =
    formatDate(date);

  const from =
    person.from ||
    period.from;

  const to =
    person.to &&
    person.to !== "Öppet"
      ? person.to
      : period.to;

  return (
    current >= from &&
    current <= to
  );

}


function shiftOutsidePeriod(
  shift,
  date,
  person
) {

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

  const startMinutes =
    sh * 60 + sm;

  const endMinutes =
    eh * 60 + em;

  if (
    endMinutes >= startMinutes
  ) {

    return false;

  }

  const nextDate =
    new Date(date);

  nextDate.setDate(
    nextDate.getDate() + 1
  );

  return !isDateActive(
    nextDate,
    person
  );

}

  function getWeekNumber(
    date
  ) {

    const d =
      new Date(date);

    d.setHours(
      0,
      0,
      0,
      0
    );

    d.setDate(
      d.getDate() +
      3 -
      (
        (
          d.getDay() +
          6
        ) % 7
      )
    );

    const week1 =
      new Date(
        d.getFullYear(),
        0,
        4
      );

    return (
      1 +
      Math.round(
        (
          (
            d -
            week1
          ) /
          86400000 -
          3 +
          (
            (
              week1.getDay() +
              6
            ) % 7
          )
        ) / 7
      )
    );

  }

  function getWeeksForPerson(
    person
  ) {

    const weeks = [];

    let start =
      new Date(
        person.from ||
        period.from
      );

    let end =
      new Date(
        person.to &&
        person.to !== "Öppet"
          ? person.to
          : period.to
      );

    while (
      start.getDay() !== 1
    ) {

      start.setDate(
        start.getDate() - 1
      );

    }
    while (
      start <= end
    ) {

      const weekStart =
        new Date(start);

      const weekEnd =
        new Date(start);

      weekEnd.setDate(
        weekEnd.getDate() + 6
      );

      const dates = [];

      for (
        let i = 0;
        i < 7;
        i++
      ) {

        const d =
          new Date(
            weekStart
          );

        d.setDate(
          weekStart.getDate() +
          i
        );

        dates.push(d);

      }

      weeks.push({

        number:
          getWeekNumber(
            weekStart
          ),

        start:
          weekStart,

        end:
          weekEnd,

        dates

      });

      start.setDate(
        start.getDate() + 7
      );

    }

    return weeks;

  }

  function minutesToHHMM(
    minutes
  ) {

    const hours =
      Math.floor(
        minutes / 60
      );

    const mins =
      minutes % 60;

    return `${hours}:${String(
      mins
    ).padStart(2, "0")}`;

  }

  function calculateWorkedMinutes(
    person
  ) {

    let totalMinutes = 0;

    Object.values(
      person.shifts || {}
    ).forEach(
      shift => {

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
        ] =
          shift.start
            .split(":")
            .map(Number);

        const [
          eh,
          em
        ] =
          shift.end
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

      }
    );

    return totalMinutes;

  }
  function getTargetMinutes(
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
          end -
          start
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
    ] =
      weeklyTime
      .split(":")
      .map(Number);

    const weeklyMinutes =
      h * 60 + m;

    return Math.round(
      weeks *
      weeklyMinutes
    );

  }

  function getShiftLength(
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
  ] =
    shift.start
    .split(":")
    .map(Number);

  const [
    eh,
    em
  ] =
    shift.end
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
function getShiftPosition(
  shift
) {

  const [
    h,
    m
  ] =
    shift.start
    .split(":")
    .map(Number);

  const minutes =
    h * 60 + m;

  return (
    minutes / 1440
  ) * 100;

}

function getShiftWidth(
  shift
) {

  const [
    sh,
    sm
  ] =
    shift.start
    .split(":")
    .map(Number);

  const [
    eh,
    em
  ] =
    shift.end
    .split(":")
    .map(Number);

  let start =
    sh * 60 + sm;

  let end =
    eh * 60 + em;

  if (
    end < start
  ) {

    end += 1440;

  }

  const duration =
    end - start;

  return Math.max(
    12,
    (
      duration / 1440
    ) * 100
  );

}

  function getShiftClass(
    shift
  ) {

    switch (
      shift.type
    ) {

      case "t":
        return "shift-type-t";

      case "u":
        return "shift-type-u";

      case "s":
        return "shift-type-s";

      case "adm":
        return "shift-type-adm";

      default:
        return "shift-type-default";

    }

  }

  function parseTime(
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

      return `0${cleaned[0]}:${cleaned.slice(1)}`;

    }

    if (
      cleaned.length === 4
    ) {

      return `${cleaned.slice(0,2)}:${cleaned.slice(2)}`;

    }

    return cleaned;

  }

function createShift(
  value,
  date,
  person
) {

  const parts =
    value
      .trim()
      .split(/\s+/);

  if (
    parts.length === 1
  ) {

    const code =
      parts[0]
      .toUpperCase();

    const block =
      timeBlocks[code];

    if (!block) {
      return;
    }

    if (
      !person.shifts
    ) {

      person.shifts = {};

    }

    const newShift = {

      start:
        block.start,

      end:
        block.end,

      break:
        block.break,

      title:
        block.title,

      code:
        block.code,

      color:
        block.color,

      mealBreak:
        false

    };

    if (
      shiftOutsidePeriod(
        newShift,
        new Date(date),
        person
      )
    ) {

      alert(
        "Passet går utanför planeringsperioden.\n\nÄndra passet eller utöka datumintervallet."
      );

      return;

    }

    person.shifts[
      date
    ] = newShift;

    return;

  }

  if (
    parts.length >= 4
  ) {

    const role =
      parts[
        parts.length - 1
      ]
      .toLowerCase();

    const roleInfo =
      getRole(role);

    if (!roleInfo) {

      alert(
        "Färgblock saknas: " +
        role
      );

      return;

    }

    const start =
      parseTime(
        parts[0]
      );

    const end =
      parseTime(
        parts[1]
      );

    const mealBreak =
      parts.some(
        p =>
          p.toLowerCase() === "m"
      );

    const breakMinutes =
      mealBreak
        ? 0
        : Number(
            parts[2]
          );

    if (
      !person.shifts
    ) {

      person.shifts = {};

    }

    const newShift = {

      start,

      end,

      break:
        breakMinutes,

      title:
        roleInfo.title,

      code:
        roleInfo.code.toUpperCase(),

      color:
        roleInfo.color,

      mealBreak

    };

    if (
      shiftOutsidePeriod(
        newShift,
        new Date(date),
        person
      )
    ) {

      alert(
        "Passet går utanför planeringsperioden.\n\nÄndra passet eller utöka datumintervallet."
      );

      return;

    }

    person.shifts[
      date
    ] = newShift;

  }

}
  function isSwedishHoliday(
    date
  ) {

    const value =
      formatDate(date);

    const holidays = [

      "2026-01-01",
      "2026-01-06",

      "2026-04-03",
      "2026-04-05",
      "2026-04-06",

      "2026-05-01",

      "2026-05-14",

      "2026-06-06",

      "2026-06-20",

      "2026-10-31",

      "2026-12-25",
      "2026-12-26"

    ];

    return holidays.includes(
      value
    );

  }

  function getDayHeaderClass(
    date,
    index
  ) {

    if (
      index === 6
    ) {

      return "sunday-header";

    }

    if (
      isSwedishHoliday(
        date
      )
    ) {

      return "holiday-header";

    }

    return "";

  }

  function getDefaultWeek() {

    const firstPerson =
      period.rows?.[0];

    if (
      !firstPerson
    ) {

      return null;

    }

    const weeks =
      getWeeksForPerson(
        firstPerson
      );

    return (
      weeks[0] || null
    );

  }

  if (
    !selectedWeek
  ) {

    selectedWeek =
      getDefaultWeek();

  }

  function renderHeader() {

    if (
      !selectedWeek
    ) {

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

        <tr
          class="heroma-header-row">

          <th>
            Vecka
          </th>

          ${selectedWeek.dates
            .map(
              (
                date,
                index
              ) => `

                <th
                  class="${getDayHeaderClass(
                    date,
                    index
                  )}">

                  ${
                    dayNames[index]
                  }

                  ${String(
                    date.getDate()
                  ).padStart(
                    2,
                    "0"
                  )}

                </th>

              `
            )
            .join("")}

        </tr>

      </thead>

    `;

  }
 function renderShiftRoles() {

  return `

    <div class="timeblocks-panel">

      <div class="timeblock-item add-role">

        + Nytt färgblock

      </div>

      ${getAllRoles()
        .map(
          role => `

            <div
              class="timeblock-item ${role.color}">

              <strong>
                ${role.code.toUpperCase()}
              </strong>

              -

              ${role.title}

            </div>

          `
        )
        .join("")}

    </div>

  `;

}
function renderTimeBlocks() {

    return `

      <div
        class="timeblocks-panel">
        <div
  class="timeblock-item add-timeblock">

  + Nytt tidblock

</div>

        ${getAllTimeBlocks()
          .map(
            block => `

              <div
                class="timeblock-item ${block.color || ''}"
                data-code="${block.code}"
                draggable="true">

                <strong>
                  ${block.code}
                </strong>

                -

                ${block.title}

                <br>

                ${block.start}
                -
                ${block.end}

              </div>

            `
          )
          .join("")}

      </div>

    `;

  }

  function render() {

    container.innerHTML =
      "";

    const wrapper =
      document.createElement(
        "div"
      );

    wrapper.className =
      "heroma-wrapper";

    let html = `

      <table
        class="heroma-table">

        ${renderHeader()}

        <tbody>

    `;
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
                }

                %

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
              person
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
      person
    )
      ? "inactive-day"
      : ""
  }"
  data-active="${isDateActive(
    date,
    person
  )}"
  data-person="${personIndex}"
  data-date="${dateKey}"
>

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

${
  shift.mealBreak
    ? "Måltidsuppehåll"
    : `${
  shift.mealBreak
    ? "Måltidsuppehåll"
    : `Rast: ${shift.break || 0} min`
}`
}

Passlängd: ${getShiftLength(
      shift
    )}">

   ${shift.start.substring(0,5)}

${
  shift.break > 0 && !shift.mealBreak
    ? '<span class="break-box"></span>'
    : ''
}

${shift.end.substring(0,5)}



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

    html += `

        </tbody>

      </table>

      ${renderTimeBlocks()}

      ${renderShiftRoles()}

    `;

    wrapper.innerHTML =
      html;

    container.appendChild(
      wrapper
    );
    container
      .querySelectorAll(
        ".heroma-week-row"
      )
      .forEach(
        row => {

          row.onclick = () => {

            const weekStart =
              new Date(
                row.dataset.start
              );

            const weekEnd =
              new Date(
                weekStart
              );

            weekEnd.setDate(
              weekEnd.getDate() + 6
            );

            const dates = [];

            for (
              let i = 0;
              i < 7;
              i++
            ) {

              const date =
                new Date(
                  weekStart
                );

              date.setDate(
                weekStart.getDate() + i
              );

              dates.push(
                date
              );

            }

            selectedWeek = {

              number:
                Number(
                  row.dataset.week
                ),

              start:
                weekStart,

              end:
                weekEnd,

              dates

            };

            render();

          };

        }
      );

      container
  .querySelectorAll(
    ".day-slot"
  )
  .forEach(
    cell => {

     cell.onclick = () => {

  if (
    cell.dataset.active !== "true"
  ) {

    return;

  }

  activeCell =
    `${cell.dataset.person}-${cell.dataset.date}`;

  render();

};


 cell.ondragover =
e => {

  if (
    cell.dataset.active !== "true"
  ) {

    return;

  }

  e.preventDefault();

};

    cell.ondrop =
e => {

  if (
    cell.dataset.active !== "true"
  ) {

    return;

  }

  e.preventDefault();

  const sourcePerson =
    e.dataTransfer.getData(
      "shift-person"
    );

  const sourceDate =
    e.dataTransfer.getData(
      "shift-date"
    );

    if (
  sourcePerson === cell.dataset.person &&
  sourceDate === cell.dataset.date
) {

  return;

}


  if (
  sourcePerson &&
  sourceDate
) {

  const fromPerson =
    period.rows[
      Number(
        sourcePerson
      )
    ];

  const shift =
    fromPerson.shifts[
      sourceDate
    ];

  if (!shift) {
    return;
  }

  const targetPerson =
    period.rows[
      Number(
        cell.dataset.person
      )
    ];

  if (
    !targetPerson.shifts
  ) {

    targetPerson.shifts = {};

  }

if (
  shiftOutsidePeriod(
    shift,
    new Date(
      cell.dataset.date
    ),
    targetPerson
  )
) {

  alert(
    "Passet går utanför planeringsperioden.\n\nÄndra passet eller utöka datumintervallet."
  );

  return;

}

targetPerson.shifts[
  cell.dataset.date
] = {
  ...shift
};

delete fromPerson.shifts[
  sourceDate
];

  render();

  return;

}
  
    const code =
      e.dataTransfer.getData(
        "text/plain"
      );

    const block =
      timeBlocks[code];

    if (!block) {
      return;
    }

    const person =
      period.rows[
        Number(
          cell.dataset.person
        )
      ];

    if (
      !person.shifts
    ) {

      person.shifts = {};

    }

    const newShift = {

  start:
    block.start,

  end:
    block.end,

  break:
    block.break,

  title:
    block.title,

  code:
    block.code,

  color:
    block.color,

  mealBreak:
    false

};

if (
  shiftOutsidePeriod(
    newShift,
    new Date(
      cell.dataset.date
    ),
    person
  )
) {

  alert(
    "Passet går utanför planeringsperioden.\n\nÄndra passet eller utöka datumintervallet."
  );

  return;

}

person.shifts[
  cell.dataset.date
] = newShift;

    render();

  };

    }
  );  
  document.onkeydown =
  e => {

    if (
      !activeCell
    ) {
      return;
    }
if (
  e.key === "ArrowRight" ||
  e.key === "ArrowLeft" ||
  e.key === "ArrowUp" ||
  e.key === "ArrowDown"
) {

  e.preventDefault();

  const cells =
    Array.from(
      container.querySelectorAll(
        ".day-slot"
      )
    );

  const currentIndex =
    cells.findIndex(
      cell =>
        `${cell.dataset.person}-${cell.dataset.date}` ===
        activeCell
    );

  if (
    currentIndex === -1
  ) {

    return;

  }

  let nextIndex =
    currentIndex;

  if (
    e.key ===
    "ArrowRight"
  ) {

    nextIndex++;

  }

  if (
    e.key ===
    "ArrowLeft"
  ) {

    nextIndex--;

  }

  if (
    e.key ===
    "ArrowDown"
  ) {

    nextIndex += 7;

  }

  if (
    e.key ===
    "ArrowUp"
  ) {

    nextIndex -= 7;

  }

  if (
    nextIndex >= 0 &&
    nextIndex < cells.length
  ) {

    const nextCell =
      cells[nextIndex];

    activeCell =
      `${nextCell.dataset.person}-${nextCell.dataset.date}`;

    render();

  }

  return;

}
    if (
  e.key ===
  "Enter"
) {

  const parts =
    activeCell.split(
      "-"
    );

  const personIndex =
    parts[0];

  const date =
    parts
      .slice(1)
      .join("-");

  const person =
    period.rows[
      Number(
        personIndex
      )
    ];

  createShift(
    cellInput,
    date,
    person
  );

  cellInput =
    "";

  render();

  return;

}

    if (
      e.key ===
      "Backspace"
    ) {

        cellInput =
          cellInput.slice(
            0,
            -1
          );

        render();

        return;

    }

    if (
      e.key.length === 1
    ) {

      cellInput +=
        e.key;

      render();

    }

  };
   
      container
  .querySelectorAll(
    ".heroma-person-row"
  )
  .forEach(
    row => {

      row.onclick = () => {

        const personId =
          Number(
            row.dataset.person
          );

        expandedPerson =
          expandedPerson ===
          personId
            ? null
            : personId;

        if (
          expandedPerson !==
          null
        ) {

          const person =
            period.rows[
              expandedPerson
            ];

          const weeks =
            getWeeksForPerson(
              person
            );

          if (
            weeks.length > 0
          ) {

            selectedWeek =
              weeks[0];

          }

        }

        render();

      };

    }
  );

container
  .querySelectorAll(
    ".timeblock-item"
  )
  .forEach(
    item => {

      item.ondblclick =
        () => {

          editTimeBlock(
            item.dataset.code
          );

          render();

        };

      item.oncontextmenu =
        e => {

          e.preventDefault();

          if (
            confirm(
              `Ta bort ${item.dataset.code}?`
            )
          ) {

            deleteTimeBlock(
              item.dataset.code
            );

            render();

          }

        };

      item.onclick =
        e => {

          if (
            e.ctrlKey
          ) {

            duplicateTimeBlock(
              item.dataset.code
            );

            render();

          }

        };

    }
  );
 container
  .querySelectorAll(
    ".timeblock-item[data-code]"
  )
  .forEach(
    item => {

      item.ondragstart =
        e => {

          e.dataTransfer.setData(
            "text/plain",
            item.dataset.code
          );

        };

    }
  );

container
  .querySelectorAll(
    ".shift-block"
  )
  .forEach(
    item => {

      item.ondragstart =
        e => {

          e.dataTransfer.setData(
            "shift-person",
            item.dataset.shiftPerson
          );

          e.dataTransfer.setData(
            "shift-date",
            item.dataset.shiftDate
          );

        };

    }
  );
const addBlock =
  container.querySelector(
    ".add-timeblock"
  );
  const addRole =
  container.querySelector(
    ".add-role"
  );

if (
  addRole
) {

  addRole.onclick =
    () => {

      createRole();

      render();

    };

}

if (
  addBlock
) {

  addBlock.onclick =
    () => {

      createTimeBlock();

      render();

    };

}

}

render();

return container;

}
