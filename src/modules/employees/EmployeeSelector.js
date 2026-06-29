
import { getEmployees, addEmployee, removeEmployee } from "./employeeService.js";

export function EmployeeSelector() {
  const container = document.createElement("div");
  container.innerHTML = `<h2>👥 Personaladministration</h2>`;

  const form = document.createElement("div");
  form.className = "employee-form";
  form.innerHTML = `
    <input id="empName" placeholder="Namn" />
    <input id="empComp" placeholder="Kompetens (t.ex. SSK, USK)" />
    <button id="addEmpBtn">Lägg till</button>
  `;
  container.appendChild(form);

  const list = document.createElement("div");
  list.id = "employeeList";
  container.appendChild(list);

  function render() {
    const employees = getEmployees();
    list.innerHTML = "";
    employees.forEach((emp, idx) => {
      const card = document.createElement("div");
      card.className = "employee-card";
      card.innerHTML = `
        <span><strong>${emp.name}</strong> – ${emp.competence || "Ingen kompetens"}</span>
        <button data-idx="${idx}">Ta bort</button>
      `;
      card.querySelector("button").onclick = () => {
        removeEmployee(idx);
        render();
      };
      list.appendChild(card);
    });
    if (employees.length === 0) {
      list.innerHTML = "<p>Inga anställda ännu.</p>";
    }
  }

  form.querySelector("#addEmpBtn").onclick = () => {
    const name = form.querySelector("#empName").value.trim();
    const comp = form.querySelector("#empComp").value.trim();
    if (name) {
      addEmployee({ name, competence: comp || "SSK" });
      render();
      form.querySelector("#empName").value = "";
      form.querySelector("#empComp").value = "";
    } else {
      alert("Ange ett namn.");
    }
  };

  render();
  return container;
}
