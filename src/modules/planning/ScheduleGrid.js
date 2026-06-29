
export function ScheduleGrid(period) {
  const container = document.createElement("div");

  container.innerHTML = `
    <div class="grid-header">Schema för: ${period.name}</div>
  `;

  const table = document.createElement("table");
  table.innerHTML = `
    <tr>
      <th>Namn</th>
      <th>From</th>
      <th>Tom</th>
      <th>Rullande dagar</th>
      <th>Planering from</th>
      <th>Planering tom</th>
    </tr>
  `;

  // Hämta rader från perioden, eller sätt default
  let rows = period.rows && period.rows.length > 0 ? period.rows : [
    { name: "Ellie", from: "2026-06-26", to: "Öppet", days: "7", planFrom: "", planTo: "Öppet" }
  ];

  function render() {
    table.querySelectorAll("tr:not(:first-child)").forEach(r => r.remove());

    rows.forEach((r, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input value="${r.name || ''}" data-i="${i}" data-f="name"></td>
        <td><input type="date" value="${r.from || ''}" data-i="${i}" data-f="from"></td>
        <td>
          <select data-i="${i}" data-f="toMode">
            <option value="date" ${r.to !== "Öppet" ? "selected" : ""}>Datum</option>
            <option value="open" ${r.to === "Öppet" ? "selected" : ""}>Öppet</option>
          </select>
          <input type="date" value="${r.to === "Öppet" ? "" : r.to}" 
                 data-i="${i}" data-f="toDate"
                 style="${r.to === "Öppet" ? "display:none" : ""}">
        </td>
        <td><input value="${r.days || 0}" data-i="${i}" data-f="days"></td>
        <td><input type="date" value="${r.planFrom || ''}" data-i="${i}" data-f="planFrom"></td>
        <td>
          <select data-i="${i}" data-f="planToMode">
            <option value="date" ${r.planTo !== "Öppet" ? "selected" : ""}>Datum</option>
            <option value="open" ${r.planTo === "Öppet" ? "selected" : ""}>Öppet</option>
          </select>
          <input type="date" value="${r.planTo === "Öppet" ? "" : r.planTo}" 
                 data-i="${i}" data-f="planToDate"
                 style="${r.planTo === "Öppet" ? "display:none" : ""}">
        </td>
      `;
      table.appendChild(tr);
    });

    // Händelser
    table.querySelectorAll("input").forEach(el => {
      el.oninput = (e) => {
        const i = e.target.dataset.i;
        const f = e.target.dataset.f;
        rows[i][f] = e.target.value;
      };
    });
    table.querySelectorAll("select").forEach(el => {
      el.onchange = (e) => {
        const i = e.target.dataset.i;
        const f = e.target.dataset.f;
        const val = e.target.value;
        if (f === "toMode") {
          rows[i].to = val === "open" ? "Öppet" : "";
        }
        if (f === "planToMode") {
          rows[i].planTo = val === "open" ? "Öppet" : "";
        }
        render();
      };
    });
  }

  render();
  container.appendChild(table);

  const actions = document.createElement("div");
  actions.className = "grid-actions";
  actions.innerHTML = `
    <button id="add">Lägg till person</button>
    <button id="remove">Ta bort</button>
    <button id="save">Spara schema</button>
    <button id="plan">Planera</button>
  `;
  container.appendChild(actions);

  actions.querySelector("#add").onclick = () => {
    const first = rows[0] || { name: "", from: "", to: "", days: 0, planFrom: "", planTo: "" };
    rows.push({ ...first });
    render();
  };
  actions.querySelector("#remove").onclick = () => {
    if (rows.length > 1) { rows.pop(); render(); }
    else alert("Måste ha minst en rad.");
  };
  actions.querySelector("#save").onclick = () => {
    // Uppdatera periodens rows och spara
    period.rows = rows;
    // Spara till localStorage via periodService
    import("../periods/periodService.js").then(({ savePeriodsToStorage }) => {
      savePeriodsToStorage();
      alert("Schema sparat!");
    });
  };
  actions.querySelector("#plan").onclick = () => {
    alert("Planeringslogik – här kan du generera schema utifrån personalens tillgänglighet.");
  };

  return container;
}
