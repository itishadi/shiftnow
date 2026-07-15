import { getEmployees, addEmployee, removeEmployee, importEmployees } from "./employeeService.js";
import { EmployeeDetailView } from "./EmployeeDetailView.js";

export function EmployeeSelector() {
  const container = document.createElement("div");

  function downloadEmployee(emp) {
    const data = JSON.stringify(emp, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${emp.name || 'employee'}.json`;
    a.click();
  }

  function renderList() {
    container.innerHTML = `<h2>👥 Personaladministration</h2>`;

    const exportImport = document.createElement("div");
    exportImport.className = "export-import";
    exportImport.innerHTML = `
      <button id="exportBtn">📤 Exportera alla (grupp)</button>
      <button id="importBtn">📥 Importera</button>
      <input type="file" id="fileInput" accept=".json" style="display:none" />
    `;
    container.appendChild(exportImport);

    const addBtn = document.createElement("button");
    addBtn.textContent = "+ Lägg till ny personal";
    addBtn.style.marginBottom = "15px";
    addBtn.onclick = () => showDetailView(null);
    container.appendChild(addBtn);

    const listContainer = document.createElement("div");
    listContainer.id = "employeeListContainer";
    container.appendChild(listContainer);

    const employees = getEmployees();
    if (employees.length === 0) {
      listContainer.innerHTML = "<p>Inga anställda ännu.</p>";
    } else {
      employees.forEach((emp, idx) => {
        const card = document.createElement("div");
        card.className = "employee-card";
        card.innerHTML = `
          <span><strong>${emp.name || emp.aviseringsnamn || "Namnlös"}</strong> – ${emp.competence || "Ingen kompetens"}</span>
          <div>
            <button class="downloadBtn" data-idx="${idx}">📥 Ladda ner</button>
            <button class="editBtn" data-idx="${idx}">✏️ Redigera</button>
            <button class="deleteBtn" data-idx="${idx}">🗑️ Ta bort</button>
          </div>
        `;
        card.querySelector(".deleteBtn").onclick = () => {
          if (confirm("Ta bort denna person?")) {
            removeEmployee(idx);
            renderList();
          }
        };
        card.querySelector(".editBtn").onclick = () => {
          showDetailView(emp, idx);
        };
        card.querySelector(".downloadBtn").onclick = () => {
          downloadEmployee(emp);
        };
        listContainer.appendChild(card);
      });
    }

    const exportBtn = container.querySelector("#exportBtn");
    const importBtn = container.querySelector("#importBtn");
    const fileInput = container.querySelector("#fileInput");

    if (exportBtn) {
      exportBtn.onclick = () => {
        const data = JSON.stringify(getEmployees(), null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'all_employees.json';
        a.click();
      };
    }

    if (importBtn) {
      importBtn.onclick = () => {
        if (fileInput) fileInput.click();
      };
    }

    if (fileInput) {
      fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          try {
            const data = JSON.parse(ev.target.result);
            if (Array.isArray(data)) {
              importEmployees(data);
              renderList();
              alert("Import lyckades!");
            } else {
              alert("Ogiltigt filformat.");
            }
          } catch (err) {
            alert("Fel vid import: " + err.message);
          }
        };
        reader.readAsText(file);
      };
    }
  }

  function showDetailView(emp, index) {
    container.innerHTML = "";
    const detailView = EmployeeDetailView({
      employee: emp,
      onSave: (data) => {
        if (index !== undefined && index !== null) {
          const employees = getEmployees();
          employees[index] = { ...employees[index], ...data };
          localStorage.setItem("shiftnow_employees", JSON.stringify(employees));
        } else {
          addEmployee(data);
        }
        renderList();
      },
      onCancel: () => {
        renderList();
      }
    });
    container.appendChild(detailView);
  }

  renderList();
  return container;
}