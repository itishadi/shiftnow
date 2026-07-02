import { getEmployees } from "../employees/employeeService.js";

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

  function createEmployeeRow(name) {

    return {

      name,

      personnr: "",

      from: period.from || "",

      to: period.to || "Öppet",

      passTyp: "Aktiv/Bunden",

      days: 0,

      time: "40:00",

      kalenderdagsfaktor: "1,0",

      dygnsvila: "11:00",

      veckovila: "36:00",

      begransningsperiod: "100%",

      shifts: {}
    };
  }

  function parseHeromaShift(text) {

    const parts =
      text.trim().split(/\s+/);

    if (parts.length < 2) {
      return null;
    }

    const start =
      parts[0].padStart(4, "0");

    const end =
      parts[1].padStart(4, "0");

    const pause =
      Number(parts[2] || 0);

    return {

      start:
        `${start.slice(0,2)}:${start.slice(2,4)}`,

      end:
        `${end.slice(0,2)}:${end.slice(2,4)}`,

      break:
        pause
    };
  }

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

            <th>Personnr</th>

            <th>From</th>

            <th>Tom</th>

            <th>Passtyp</th>

            <th>Tid</th>

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

    rows.forEach(
      (row, index) => {

        const tr =
          document.createElement("tr");

        tr.innerHTML = `

          <td>

            <input
              value="${row.name || ""}"
              data-i="${index}"
              data-f="name">

          </td>

          <td>

            <input
              value="${row.personnr || ""}"
              data-i="${index}"
              data-f="personnr">

          </td>

          <td>

            <input
              type="date"
              value="${row.from || ""}"
              data-i="${index}"
              data-f="from">

          </td>

          <td>

            <input
              value="${row.to || ""}"
              data-i="${index}"
              data-f="to">

          </td>

          <td>

            <input
              value="${row.passTyp || ""}"
              data-i="${index}"
              data-f="passTyp">

          </td>

          <td>

            <input
              value="${row.time || ""}"
              data-i="${index}"
              data-f="time">

          </td>

          <td>

            <input
              placeholder="645 1515 30"
              data-shift="${index}">

          </td>

        `;

        tbody.appendChild(tr);

      }
    );

    tbody
      .querySelectorAll("input[data-i]")
      .forEach(input => {

        input.oninput = e => {

          const index =
            Number(
              e.target.dataset.i
            );

          const field =
            e.target.dataset.f;

          rows[index][field] =
            e.target.value;

        };

      });

    tbody
      .querySelectorAll(
        "input[data-shift]"
      )
      .forEach(input => {

        input.onkeydown = e => {

          if (
            e.key !== "Enter"
          ) {
            return;
          }

          const index =
            Number(
              e.target.dataset.shift
            );

          const shift =
            parseHeromaShift(
              e.target.value
            );

          if (!shift) {

            alert(
              "Fel format. Exempel: 645 1515 30"
            );

            return;
          }

          const date =
            rows[index].from
            ||
            period.from;

          rows[index].shifts[
            date
          ] = shift;

          e.target.style.background =
            "#c8f7c5";

          e.target.title =
            `${shift.start}-${shift.end} Rast ${shift.break}`;

        };

      });

  }

  function showImportModal() {

    const employees =
      getEmployees();

    if (
      employees.length === 0
    ) {

      alert(
        "Ingen personal finns att importera."
      );

      return;
    }

    const overlay =
      document.createElement(
        "div"
      );

    overlay.style.cssText = `
      position:fixed;
      inset:0;
      background:rgba(0,0,0,.4);
      display:flex;
      justify-content:center;
      align-items:center;
      z-index:9999;
    `;

    const modal =
      document.createElement(
        "div"
      );

    modal.style.cssText = `
      background:white;
      padding:20px;
      border-radius:8px;
      width:500px;
      max-height:80vh;
      overflow:auto;
    `;

    modal.innerHTML = `

      <h3>
        Importera personal
      </h3>

      <div id="list"></div>

      <div style="
        margin-top:15px;
        display:flex;
        gap:10px;
      ">

        <button id="okBtn">
          Importera
        </button>

        <button id="cancelBtn">
          Avbryt
        </button>

      </div>

    `;

    const list =
      modal.querySelector(
        "#list"
      );

    employees.forEach(
      (employee, index) => {

        const name =
          employee.name
          ||
          employee.aviseringsnamn
          ||
          `${employee.fornamn || ""}
           ${employee.efternamn || ""}`
          .trim();

        const row =
          document.createElement(
            "label"
          );

        row.style.display =
          "block";

        row.style.margin =
          "4px 0";

        row.innerHTML = `

          <input
            type="checkbox"
            checked
            data-index="${index}">

          ${name}

        `;

        list.appendChild(row);

      }
    );

    modal
      .querySelector(
        "#cancelBtn"
      )
      .onclick = () => {

      document.body.removeChild(
        overlay
      );

    };

    modal
      .querySelector(
        "#okBtn"
      )
      .onclick = () => {

      const selected = [];

      modal
        .querySelectorAll(
          "input[type='checkbox']:checked"
        )
        .forEach(cb => {

          selected.push(
            employees[
              Number(
                cb.dataset.index
              )
            ]
          );

        });

      selected.forEach(
        employee => {

          const name =
            employee.name
            ||
            employee.aviseringsnamn
            ||
            `${employee.fornamn || ""}
             ${employee.efternamn || ""}`
            .trim();

          const exists =
            rows.some(
              row =>
                row.name ===
                name
            );

          if (exists) {
            return;
          }

          rows.push(
            createEmployeeRow(
              name
            )
          );

        }
      );

      render();

      document.body.removeChild(
        overlay
      );

    };

    overlay.appendChild(
      modal
    );

    document.body.appendChild(
      overlay
    );
  }

  container.querySelector(
    "#add"
  ).onclick = () => {

    rows.push(
      createEmployeeRow(
        "Ny person"
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
  ).onclick =
    showImportModal;

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

  render();

  return container;

}