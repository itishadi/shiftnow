import { getEmployees } from "../employees/employeeService.js";
import { getPeriods, addPeriod } from "./periodService.js";

export function CreatePeriodView({ onSave, onCancel }) {

  const container = document.createElement("div");

  let rows = [];

  function createEmployeeRow(name = "Ny person") {

    return {

  name,

  status:
    "Planeras",

      personnr: "",

      from: "",

      to: "Öppet",

      passTyp: "Aktiv/Bunden",

      days: 0,

      time: "40:00",

      veckor: "",

      semesterkoeff: "0",

      kalenderdagsfaktor: "1,0",

      dygnsvila: "11:00",

      veckovila: "36:00",

      begransningsperiod: "100%",

      planering: "",

      manuKoeff: "",

      planeriManu: "",

      faktur: "",

      kl: "",

      lhs: "",

      datumKl: "",

      startdatum: "",

      periodDgr: "",

      planFrom: "",

      planTo: "Öppet",

      toSlut: "",

      shifts: {}
    };
  }

  function parseHeromaShift(input) {

    const parts =
      input.trim().split(/\s+/);

    if (parts.length < 2) {
      return null;
    }

    const start =
      parts[0].padStart(4, "0");

    const end =
      parts[1].padStart(4, "0");

    const breakMinutes =
      Number(parts[2] || 0);

    return {

      start:
        `${start.substring(0,2)}:${start.substring(2,4)}`,

      end:
        `${end.substring(0,2)}:${end.substring(2,4)}`,

      break:
        breakMinutes
    };
  }

  container.innerHTML = `

<div class="mv-container">

  <div class="mv-header">

    Inställningar för Schemaperiod

  </div>

  <div class="mv-body">

    <div class="mv-left">

      <div class="row">
        <label>Benämning</label>
        <input
          id="name"
          value="Ny schemaperiod">
      </div>

      <div class="row">
        <label>From</label>
        <input
          id="from"
          type="date">
      </div>

      <div class="row">
        <label>Tom</label>
        <input
          id="toDate"
          type="date">
      </div>

      <div class="row">
        <label>Rullande antal dagar</label>
        <input
          id="days"
          type="number"
          value="0">
      </div>

      <div class="row">
        <label>Semesterkoefficient</label>
        <input
          id="semesterCoeff"
          value="0">
      </div>

      <div class="row">
        <label>Kalenderdagsfaktor</label>
        <input
          id="calendarFactor"
          value="1,0">
      </div>

      <div class="row">
        <label>Sem.koeff planering</label>
        <input
          id="semesterPlanning"
          value="0">
      </div>

    </div>

    <div class="mv-right">

      <div class="row">
        <label>Planperiod from</label>
        <input
          id="planFrom"
          type="date">
      </div>

      <div class="row">
        <label>Planperiod tom</label>
        <input
          id="planToDate"
          type="date">
      </div>

      <div class="row">
        <label>Justering tom</label>
        <input
          value="Öppet">
      </div>

      <div class="row">
        <label>Korrigering tom</label>
        <input
          value="Öppet">
      </div>

      <div class="row">
        <label>Godkänn senast</label>
        <input
          id="approveDate"
          type="date">
      </div>

      <div class="row">
        <label>Ärendemetod</label>

        <select>
          <option>
            Välj ärendemetod
          </option>
        </select>
      </div>

    </div>

  </div>

  <div class="mv-extra-row">

    <label>
      Skicka besked med:
    </label>

    <select>

      <option>
        Skicka inte
      </option>

      <option>
        E-post
      </option>

      <option>
        SMS
      </option>

    </select>

  </div>

  <div class="grid-wrapper">

    <div class="grid-scroll-wrapper">

      <table id="periodTable">

        <thead>

          <tr>

            <th>Namn</th>

            <th>Personnr</th>

            <th>From</th>

            <th>Tom</th>

            <th>Passtyp</th>

            <th>Rullande</th>

            <th>Tid</th>

            <th>Veckor</th>

            <th>Semesterkoeff</th>

            <th>Kalenderfaktor</th>

            <th>Dygnsvila</th>

            <th>Veckovila</th>

            <th>Begr.period</th>

            <th>Planering</th>

          </tr>

        </thead>

        <tbody id="grid-body">

        </tbody>

      </table>

    </div>

  </div>

  <div class="grid-footer">

    <button id="add">
      Lägg till obemannat schema
    </button>

    <button id="importStaff">
      Importera personal
    </button>

    <button id="save">
      Spara
    </button>

    <button id="plan">
      Spara/Planera schema
    </button>

    <button id="cancel">
      Avbryt
    </button>

  </div>

</div>

`;

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

  tbody.innerHTML = "";

  rows.forEach((row, index) => {

    const tr =
      document.createElement("tr");

    tr.innerHTML = `

      <td>
        <input
          value="${row.name || ""}">
      </td>

      <td>
        <input
          value="${row.personnr || ""}">
      </td>

      <td>
        <input
          type="date"
          value="${row.from || ""}">
      </td>

      <td>
        <input
          value="${row.to || ""}">
      </td>

      <td>
        <input
          value="${row.passTyp || ""}">
      </td>

      <td>
        <input
          value="${row.days || 0}">
      </td>

      <td>
        <input
          value="${row.time || ""}">
      </td>

      <td>
        <input
          value="${row.veckor || ""}">
      </td>

      <td>
        <input
          value="${row.semesterkoeff || "0"}">
      </td>

      <td>
        <input
          value="${row.kalenderdagsfaktor || "1,0"}">
      </td>

      <td>
        <input
          value="${row.dygnsvila || "11:00"}">
      </td>

      <td>
        <input
          value="${row.veckovila || "36:00"}">
      </td>

      <td>
        <input
          value="${row.begransningsperiod || "100%"}">
      </td>

      <td>
        <input
          value="${row.planering || ""}">
      </td>

    `;

    tbody.appendChild(tr);

  });

}
  
  function validatePeriod() {

    const from =
      container.querySelector(
        "#from"
      ).value;

    if (!from) {

      return {
        valid: false,
        message:
          "From-datum måste anges."
      };
    }

    return {
      valid: true
    };
  }

  function showImportModal() {

    const employees =
      getEmployees();

    if (
      employees.length === 0
    ) {

      alert(
        "Ingen personal finns."
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
      max-width:500px;
      width:90%;
      max-height:80vh;
      overflow:auto;
    `;

    modal.innerHTML = `

      <h3>
        Importera personal
      </h3>

      <div id="staffList"></div>

      <div
        style="
          margin-top:15px;
          display:flex;
          gap:10px;
        "
      >

        <button id="importBtn">
          Importera
        </button>

        <button id="cancelBtn">
          Avbryt
        </button>

      </div>

    `;

    const list =
      modal.querySelector(
        "#staffList"
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

        row.innerHTML = `

          <input
            type="checkbox"
            data-index="${index}"
            checked>

          ${name}

        `;

        list.appendChild(
          row
        );
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
        "#importBtn"
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

          if (
            rows.some(
              r => r.name === name
            )
          ) {
            return;
          }

          const row =
            createEmployeeRow(
              name
            );
            row.status =
             "Planeras";


          row.from =
            container
              .querySelector(
                "#from"
              )
              .value;

          row.to =
            container
              .querySelector(
                "#toDate"
              )
              .value
            ||
            "Öppet";

          rows.push(row);

        });

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

  function saveAndPlan() {

    const validation =
      validatePeriod();

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

    const data = {

      name:
        container.querySelector(
          "#name"
        ).value,

      from:
        container.querySelector(
          "#from"
        ).value,

      to:
        container.querySelector(
          "#toDate"
        ).value,

      days:
        container.querySelector(
          "#days"
        ).value,

      planFrom:
        container.querySelector(
          "#planFrom"
        ).value,

      planTo:
        container.querySelector(
          "#planToDate"
        ).value,

      approveDate:
        container.querySelector(
          "#approveDate"
        ).value,

      rows
    };

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
  ).onclick =
    showImportModal;

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

    const data = {

      name:
        container.querySelector(
          "#name"
        ).value,

      from:
        container.querySelector(
          "#from"
        ).value,

      to:
        container.querySelector(
          "#toDate"
        ).value,

      days:
        container.querySelector(
          "#days"
        ).value,

      planFrom:
        container.querySelector(
          "#planFrom"
        ).value,

      planTo:
        container.querySelector(
          "#planToDate"
        ).value,

      approveDate:
        container.querySelector(
          "#approveDate"
        ).value,

      rows
    };

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