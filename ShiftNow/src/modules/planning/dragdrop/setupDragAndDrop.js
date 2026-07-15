export function setupDragAndDrop({

  container,
  period,
  timeBlocks,
  shiftOutsidePeriod,
  render

}) {

  container
    .querySelectorAll(
      ".day-slot"
    )
    .forEach(
      cell => {

        cell.ondragover =
          e => {

            if (
              cell.dataset.active !==
              "true"
            ) {
              return;
            }

            e.preventDefault();
          };

        cell.ondrop =
          e => {

            if (
              cell.dataset.active !==
              "true"
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
              sourcePerson ===
                cell.dataset.person &&
              sourceDate ===
                cell.dataset.date
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
                targetPerson.shifts =
                  {};
              }

              if (
                shiftOutsidePeriod(
                  shift,
                  new Date(
                    cell.dataset.date
                  ),
                  targetPerson,
                  period
                )
              ) {

                alert(
                  "Passet går utanför planeringsperioden."
                );

                return;
              }

              targetPerson.shifts[
                cell.dataset.date
              ] = {
                ...shift
              };

              delete
                fromPerson.shifts[
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
                person,
                period
              )
            ) {

              alert(
                "Passet går utanför planeringsperioden."
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
}