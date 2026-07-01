import { getEmployees } from "../employees/employeeService.js";

export function ScheduleGrid(period) {
  const container = document.createElement("div");

  container.innerHTML = `
    <div class="grid-container">
      <div class="grid-header">Schema för: ${period.name}</div>
      <div class="grid-scroll-wrapper">
        <table id="scheduleTable">
          <thead>
            <tr>
              <th style="min-width:120px;">Namn</th>
              <th style="min-width:110px;">Personnr</th>
              <th style="min-width:110px;">From</th>
              <th style="min-width:120px;">Tom</th>
              <th style="min-width:120px;">Passtyp</th>
              <th style="min-width:110px;">Rullande</th>
              <th style="min-width:100px;">Tid</th>
              <th style="min-width:140px;">Kalenderdagsfaktor</th>
              <th style="min-width:110px;">Dygnsvila</th>
              <th style="min-width:110px;">Veckovila</th>
              <th style="min-width:160px;">Begränsningsperiod (deltid)</th>
              <th style="min-width:120px;">Planering</th>
              <th style="min-width:130px;">Manuellt datum/kl</th>
              <th style="min-width:130px;">Manuellt startdatum</th>
              <th style="min-width:100px;">Perioddagar</th>
              <th style="min-width:110px;">Plan.from</th>
              <th style="min-width:120px;">Plan.tom</th>
            </tr>
          </thead>
          <tbody id="scheduleBody"></tbody>
        </table>
      </div>
      <div class="grid-actions">
        <button id="add">Lägg till person</button>
        <button id="remove">Ta bort</button>
        <button id="save">Spara schema</button>
        <button id="plan">Planera</button>
        <button id="importStaff">📥 Importera personal (välj)</button>
      </div>
    </div>
  `;

  const tbody = container.querySelector("#scheduleBody");
  let rows = period.rows && period.rows.length > 0 ? period.rows : [];

  if (rows.length === 0) {
    rows.push({
      name: "Ellie",
      personnr: "19700101-1234",
      from: "2026-06-26",
      to: "Öppet",
      passTyp: "Aktiv/Bunden",
      days: 7,
      time: "40:00",
      kalenderdagsfaktor: "1,0",
      dygnsvila: "11:00",
      veckovila: "36:00",
      begransningsperiod: "100%",
      planering: "",
      manuDatumKl: "",
      manuStartdatum: "",
      periodDgr: "",
      planFrom: "",
      planTo: "Öppet"
    });
  }

  function render() {
    tbody.innerHTML = "";
    rows.forEach((r, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input value="${r.name || ''}" data-i="${i}" data-f="name" /></td>
        <td><input value="${r.personnr || ''}" data-i="${i}" data-f="personnr" /></td>
        <td><input type="date" value="${r.from || ''}" data-i="${i}" data-f="from" /></td>
        <td>
          <select data-i="${i}" data-f="toMode">
            <option value="date" ${r.to !== "Öppet" ? "selected" : ""}>Datum</option>
            <option value="open" ${r.to === "Öppet" ? "selected" : ""}>Öppet</option>
          </select>
          <input type="date" value="${r.to === "Öppet" ? "" : r.to}" 
                 data-i="${i}" data-f="toDate"
                 style="${r.to === "Öppet" ? "display:none" : ""}" />
        </td>
        <td><input value="${r.passTyp || 'Aktiv/Bunden'}" data-i="${i}" data-f="passTyp" /></td>
        <td><input type="number" value="${r.days || 0}" data-i="${i}" data-f="days" /></td>
        <td><input value="${r.time || '40:00'}" data-i="${i}" data-f="time" /></td>
        <td><input value="${r.kalenderdagsfaktor || '1,0'}" data-i="${i}" data-f="kalenderdagsfaktor" /></td>
        <td><input value="${r.dygnsvila || '11:00'}" data-i="${i}" data-f="dygnsvila" /></td>
        <td><input value="${r.veckovila || '36:00'}" data-i="${i}" data-f="veckovila" /></td>
        <td><input value="${r.begransningsperiod || '100%'}" data-i="${i}" data-f="begransningsperiod" /></td>
        <td><input value="${r.planering || ''}" data-i="${i}" data-f="planering" /></td>
        <td><input value="${r.manuDatumKl || ''}" data-i="${i}" data-f="manuDatumKl" /></td>
        <td><input value="${r.manuStartdatum || ''}" data-i="${i}" data-f="manuStartdatum" /></td>
        <td><input value="${r.periodDgr || ''}" data-i="${i}" data-f="periodDgr" /></td>
        <td><input type="date" value="${r.planFrom || ''}" data-i="${i}" data-f="planFrom" /></td>
        <td>
          <select data-i="${i}" data-f="planToMode">
            <option value="date" ${r.planTo !== "Öppet" ? "selected" : ""}>Datum</option>
            <option value="open" ${r.planTo === "Öppet" ? "selected" : ""}>Öppet</option>
          </select>
          <input type="date" value="${r.planTo === "Öppet" ? "" : r.planTo}" 
                 data-i="${i}" data-f="planToDate"
                 style="${r.planTo === "Öppet" ? "display:none" : ""}" />
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll("input").forEach(el => {
      el.oninput = (e) => {
        const i = e.target.dataset.i;
        const f = e.target.dataset.f;
        if (rows[i]) rows[i][f] = e.target.value;
      };
    });

    tbody.querySelectorAll("select").forEach(el => {
      el.onchange = (e) => {
        const i = e.target.dataset.i;
        const f = e.target.dataset.f;
        const val = e.target.value;
        if (f === "toMode") {
          rows[i].to = val === "open" ? "Öppet" : "";
          render();
        } else if (f === "planToMode") {
          rows[i].planTo = val === "open" ? "Öppet" : "";
          render();
        }
      };
    });
  }

  // ===== MODAL FÖR IMPORT =====
  function showImportModal() {
    const employees = getEmployees();
    if (employees.length === 0) {
      alert("Det finns ingen personal att importera.");
      return;
    }

    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed; top:0; left:0; width:100%; height:100%;
      background: rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center;
      z-index: 9999;
    `;

    const modal = document.createElement("div");
    modal.style.cssText = `
      background: white; padding: 20px; border-radius: 8px;
      max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;
    `;
    modal.innerHTML = `
      <h3>Välj personal att importera</h3>
      <div id="employeeChecklist" style="margin: 10px 0;"></div>
      <div style="display:flex; gap:10px; margin-top:10px;">
        <button id="selectAllBtn" style="padding:6px 12px;">✅ Markera alla</button>
        <button id="deselectAllBtn" style="padding:6px 12px;">❌ Avmarkera alla</button>
      </div>
      <div style="display:flex; gap:10px; margin-top:15px;">
        <button id="importSelectedBtn" style="padding:8px 20px; background:#2ecc71; color:white; border:none; border-radius:4px;">Importera valda</button>
        <button id="closeModalBtn" style="padding:8px 20px; background:#e74c3c; color:white; border:none; border-radius:4px;">Avbryt</button>
      </div>
    `;

    const checklist = modal.querySelector("#employeeChecklist");
    employees.forEach((emp, idx) => {
      const label = document.createElement("label");
      label.style.display = "block";
      label.style.margin = "4px 0";
      const name = emp.name || emp.aviseringsnamn || `${emp.fornamn} ${emp.efternamn}`.trim() || "Namnlös";
      const checked = !rows.some(r => r.name === name) ? "checked" : "";
      label.innerHTML = `
        <input type="checkbox" data-idx="${idx}" ${checked} />
        ${name} (${emp.competence || "SSK"})
      `;
      checklist.appendChild(label);
    });

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    modal.querySelector("#selectAllBtn").onclick = () => {
      checklist.querySelectorAll("input[type=checkbox]").forEach(cb => cb.checked = true);
    };
    modal.querySelector("#deselectAllBtn").onclick = () => {
      checklist.querySelectorAll("input[type=checkbox]").forEach(cb => cb.checked = false);
    };

    modal.querySelector("#importSelectedBtn").onclick = () => {
      const selected = [];
      checklist.querySelectorAll("input[type=checkbox]:checked").forEach(cb => {
        const idx = parseInt(cb.dataset.idx);
        selected.push(employees[idx]);
      });
      if (selected.length === 0) {
        alert("Inga personer valda.");
        return;
      }
      const from = "2026-06-30";
      const to = "2026-06-30";
      let added = 0;
      selected.forEach(emp => {
        const name = emp.name || emp.aviseringsnamn || `${emp.fornamn} ${emp.efternamn}`.trim();
        if (name && !rows.some(r => r.name === name)) {
          rows.push({
            name: name,
            personnr: "",
            from: from,
            to: to || "Öppet",
            passTyp: "Aktiv/Bunden",
            days: 0,
            time: "40:00",
            kalenderdagsfaktor: "1,0",
            dygnsvila: "11:00",
            veckovila: "36:00",
            begransningsperiod: "100%",
            planering: "",
            manuDatumKl: "",
            manuStartdatum: "",
            periodDgr: "",
            planFrom: "",
            planTo: "Öppet"
          });
          added++;
        }
      });
      if (added === 0) {
        alert("Alla valda personer finns redan i listan.");
      } else {
        alert(`${added} personer importerades.`);
        render();
      }
      document.body.removeChild(overlay);
    };

    modal.querySelector("#closeModalBtn").onclick = () => {
      document.body.removeChild(overlay);
    };

    overlay.onclick = (e) => {
      if (e.target === overlay) document.body.removeChild(overlay);
    };
  }

  // ===== KNAPPAR =====
  container.querySelector("#add").onclick = () => {
    const first = rows[0] || { 
      name: "", from: "", to: "", days: 0, passTyp: "Aktiv/Bunden", time: "40:00",
      kalenderdagsfaktor: "1,0", dygnsvila: "11:00", veckovila: "36:00",
      begransningsperiod: "100%", planering: "", manuDatumKl: "", manuStartdatum: "",
      periodDgr: "", planFrom: "", planTo: "Öppet"
    };
    const newRow = { ...first };
    newRow.name = "Ny person";
    newRow.personnr = "";
    rows.push(newRow);
    render();
  };

  container.querySelector("#remove").onclick = () => {
    if (rows.length > 1) { rows.pop(); render(); }
    else alert("Måste ha minst en rad.");
  };

  container.querySelector("#save").onclick = () => {
    period.rows = rows;
    import("../periods/periodService.js").then(({ savePeriodsToStorage }) => {
      savePeriodsToStorage();
      alert("Schema sparat!");
    });
  };

  // 🔥 Planera-knappen navigerar till overview
  container.querySelector("#plan").onclick = () => {
    import("../shared/state/store.js").then(({ setState }) => {
      setState("currentView", "overview");
      window.dispatchEvent(new Event("navigate"));
    });
  };

  container.querySelector("#importStaff").onclick = showImportModal;

  render();
  return container;
}