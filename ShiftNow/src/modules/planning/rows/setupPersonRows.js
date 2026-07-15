import { getWeeksForPerson }
from "../dates/getWeeksForPerson.js";

export function setupPersonRows({

  container,
  period,
  render,
  setExpandedPerson,
  getExpandedPerson,
  setSelectedWeek

}) {

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

          const expandedPerson =
            getExpandedPerson();

          const newValue =
            expandedPerson === personId
              ? null
              : personId;

          setExpandedPerson(
            newValue
          );

          if (
            newValue !== null
          ) {

            const person =
              period.rows[
                newValue
              ];

            const weeks =
              getWeeksForPerson(
                person,
                period
              );

            if (
              weeks.length > 0
            ) {

              setSelectedWeek(
                weeks[0]
              );
            }
          }

          render();
        };
      }
    );
}