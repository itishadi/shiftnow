import { getEmployees }
    from "../../employees/services/employeeService.js";

export function showImportModal({
    rows,
    period,
    render,
    createEmployeeRow
}) {

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
             name,
             period
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