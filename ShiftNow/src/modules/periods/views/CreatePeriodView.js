import { validatePeriod }
    from "../validation/validatePeriod.js";

import { getPeriods, addPeriod } 
    from "../services/periodService.js";

import { showImportModal }
    from "../modals/ImportStaffModal.js";

import { periodFormTemplate }
    from "../templates/periodFormTemplate.js";

import { renderPeriodRows }
    from "../rows/renderPeriodRows.js";

import { createPeriodData }
    from "../helpers/createPeriodData.js";

import { createEmployeeRow }
    from "../helpers/createEmployeeRow.js";



export function CreatePeriodView({ onSave, onCancel }) {

  const container = document.createElement("div");

  let rows = [];

 

container.innerHTML =
    periodFormTemplate();


  const tbody =
    container.querySelector(
      "#grid-body"
    );

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  container.querySelector(
    "#from"
  ).value = today;

  container.querySelector(
    "#planFrom"
  ).value = today;


  function render() {

    renderPeriodRows(
        tbody,
        rows
    );

}

  function saveAndPlan() {

    const validation =
  validatePeriod(
      container
  );

    if (
      !validation.valid
    ) {

      alert(
        validation.message
      );

      return;
    }

    rows = rows.map(
      row => ({
        ...row,
        shifts:
          row.shifts || {}
      })
    );

    const data =
    createPeriodData(
        container,
        rows
    );

    const period =
      addPeriod(data);

    const periods =
      getPeriods();

    import(
      "../shared/state/store.js"
    ).then(
      ({ setState }) => {

        setState(
          "periods",
          periods
        );

        setState(
          "currentPeriod",
          period.id
        );

        setState(
          "currentView",
          "overview"
        );

        window.dispatchEvent(
          new Event(
            "navigate"
          )
        );

      }
    );
  }

  container.querySelector(
    "#add"
  ).onclick = () => {

    const row =
      createEmployeeRow(
        "Nytt obemannat schema"
      );

    row.from =
      container.querySelector(
        "#from"
      ).value;

    row.to =
      container.querySelector(
        "#toDate"
      ).value
      ||
      "Öppet";

    rows.push(row);

    render();
  };

 container.querySelector(
    "#importStaff"
).onclick = () => {

    showImportModal({
        rows,
        container,
        render,
        createEmployeeRow
    });

};

  container.querySelector(
    "#save"
  ).onclick = () => {

    rows = rows.map(
      row => ({
        ...row,
        shifts:
          row.shifts || {}
      })
    );

   const data =
    createPeriodData(
        container,
        rows
    );

    onSave(data);

  };

  container.querySelector(
    "#plan"
  ).onclick =
    saveAndPlan;

  container.querySelector(
    "#cancel"
  ).onclick =
    onCancel;

  render();

  return container;

}