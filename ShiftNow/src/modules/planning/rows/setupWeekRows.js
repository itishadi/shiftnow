export function setupWeekRows({

  container,
  render,
  setSelectedWeek

}) {

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

          setSelectedWeek({

            number:
              Number(
                row.dataset.week
              ),

            start:
              weekStart,

            end:
              weekEnd,

            dates

          });

          render();
        };
      }
    );
}