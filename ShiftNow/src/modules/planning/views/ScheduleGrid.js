import { createEmployeeRow }
    from "../persons/createEmployee.js";

import { parseHeromaShift }
    from "../shifts/parseHeromaShift.js";

import { showImportModal }
    from "../modals/ImportEmployeeModal.js";

import { renderScheduleGridRows }
    from "../rows/renderScheduleGridRows.js";



export function ScheduleGrid(period) {

  const container =
    document.createElement("div");

  let rows =
    period.rows || [];

  rows.forEach(row => {

    if (!row.shifts) {
      row.shifts = {};
    }

  });

  
  container.innerHTML = `

  <div class="grid-container">

    <div class="grid-header">

      Schema för:
      ${period.name}

    </div>

    <div class="grid-scroll-wrapper">

      <table id="scheduleTable">

       <thead>

  <tr>

    <th>Namn</th>

    <th>Personnr/Idnr</th>

    <th>From</th>

    <th>Tom</th>

    <th>Passtyp</th>

    <th>Rullande</th>

    <th>Tid</th>

    <th>Veckor</th>

    <th>Semesterkoeff.</th>

    <th>Kalenderdagsf.</th>

    <th>Dygnsvila</th>

    <th>Veckovila</th>

    <th>Begränsningsperiod</th>

    <th>Planering</th>

    <th>Status</th>

    <th>Testpass</th>

  </tr>

</thead>

        <tbody id="scheduleBody">

        </tbody>

      </table>

    </div>

    <div class="grid-actions">

      <button id="add">
        Lägg till person
      </button>

      <button id="remove">
        Ta bort
      </button>

      <button id="approve">
       Fastställ alla
      </button>

      <button id="save">
        Spara schema
      </button>

      <button id="plan">
        Planera
      </button>

      <button id="importStaff">
        Importera personal
      </button>

    </div>

  </div>

  `;

  const tbody =
    container.querySelector(
      "#scheduleBody"
    );

 function render() {

    tbody.innerHTML = "";

    renderScheduleGridRows({
        tbody,
        rows,
        period,
        parseHeromaShift
    });

}

  container.querySelector(
    "#add"
  ).onclick = () => {

   rows.push(
    createEmployeeRow(
        "Ny person",
        period
    )
);

    render();

  };

  container.querySelector(
    "#remove"
  ).onclick = () => {

    if (rows.length === 0) {

      alert(
        "Ingen person att ta bort."
      );

      return;
    }

    rows.pop();

    render();

  };

container.querySelector(
    "#importStaff"
).onclick = () => {

    showImportModal({
        rows,
        period,
        render,
        createEmployeeRow
    });

};

  container.querySelector(
    "#save"
  ).onclick = () => {

    period.rows =
      rows.map(row => ({

        ...row,

        shifts:
          row.shifts || {}

      }));

    import(
      "../periods/periodService.js"
    ).then(
      ({
        savePeriodsToStorage
      }) => {

        savePeriodsToStorage();

        alert(
          "Schema sparat."
        );

      }
    );

  };

  container.querySelector(
    "#plan"
  ).onclick = () => {

    period.rows =
      rows.map(row => ({

        ...row,

        shifts:
          row.shifts || {}

      }));

    import(
      "../periods/periodService.js"
    ).then(
      ({
        savePeriodsToStorage
      }) => {

        savePeriodsToStorage();

        import(
          "../shared/state/store.js"
        ).then(
          ({ setState }) => {

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
    );

  };

  container.querySelector(
  "#approve"
).onclick = () => {

  rows.forEach(
    row => {

      row.status =
        "Fastställd";

    }
  );

  render();

};

  render();

  return container;

}

