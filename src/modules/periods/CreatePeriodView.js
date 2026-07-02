// import { getEmployees } from "../employees/employeeService.js";
// import { getPeriods, addPeriod } from "./periodService.js";

// export function CreatePeriodView({ onSave, onCancel }) {
//   const container = document.createElement("div");
//   let rows = [];

//   container.innerHTML = `
//     <div class="mv-container">
//       <div class="mv-header">Inställningar för Schemaperiod</div>
//       <div class="mv-body">
//         <div class="mv-left">
//           <div class="row"><label>Benämning</label><input id="name" class="input-long" value="höst schema" /></div>
//           <div class="row"><label>From</label><input type="date" id="from" class="input-short" value="2026-06-30" /></div>
//           <div class="row"><label>Tom</label><input type="date" id="toDate" class="input-short" /></div>
//           <div class="row"><label>Rullande antal dagar</label><input id="days" type="number" value="0" class="input-short" /></div>
//         </div>
//         <div class="mv-right">
//           <div class="row"><label>Planeringsperiod from</label><input type="date" id="planFrom" class="input-short" value="2026-06-30" /></div>
//           <div class="row"><label>Planeringsperiod tom</label><input type="date" id="planToDate" class="input-short" /></div>
//           <div class="row"><label>Godkänn senast</label><input type="date" id="approveDate" class="input-short" /></div>
//           <div class="row"><label>Ärendemethod</label><select class="input-long"><option>&lt;Endast arbetsledare&gt;</option></select></div>
//         </div>
//       </div>

//       <div class="mv-extra-row">Skicka besked med:</div>

//       <div class="grid-wrapper">
//         <div class="grid-scroll-wrapper">
//           <table id="periodTable">
//             <thead>
//               <tr>
//                 <th style="min-width:120px;">Namn</th>
//                 <th style="min-width:110px;">Personnr/Idnr</th>
//                 <th style="min-width:110px;">From</th>
//                 <th style="min-width:120px;">Tom</th>
//                 <th style="min-width:120px;">Passtyp</th>
//                 <th style="min-width:100px;">Rullande</th>
//                 <th style="min-width:100px;">Veckor...</th>
//                 <th style="min-width:110px;">Semesterkoeff.</th>
//                 <th style="min-width:140px;">Kalenderdagsf...</th>
//                 <th style="min-width:110px;">Dygnsvila</th>
//                 <th style="min-width:110px;">Veckovila</th>
//                 <th style="min-width:160px;">Begränsningsperiod (deltid)</th>
//                 <th style="min-width:120px;">Planering</th>
//                 <th style="min-width:130px;">manu... koeff.</th>
//                 <th style="min-width:130px;">planeri... manu...</th>
//                 <th style="min-width:100px;">faktur</th>
//                 <th style="min-width:100px;">manu... kl</th>
//                 <th style="min-width:100px;">LHS</th>
//                 <th style="min-width:130px;">manu... datum/kl</th>
//                 <th style="min-width:130px;">manu... startdatum</th>
//                 <th style="min-width:100px;">period dgr</th>
//                 <th style="min-width:110px;">from</th>
//                 <th style="min-width:110px;">tom</th>
//                 <th style="min-width:110px;">to</th>
//               </tr>
//             </thead>
//             <tbody id="grid-body"></tbody>
//           </table>
//         </div>
//       </div>

//       <div class="grid-footer">
//         <button id="remove">Ta bort</button>
//         <button id="split">Dela</button>
//         <button id="link">Koppla rad</button>
//         <button id="save">Spara</button>
//         <button id="plan">Spara/Planera schema</button>
//         <button id="add">Lägg till obemannat schema</button>
//         <button id="importStaff">📥 Importera personal (välj)</button>
//         <button id="copyPerson">Kopiera schema person</button>
//         <button id="copyGroup">Kopiera schema grupp</button>
//         <button id="grundbehov">Grundbehov</button>
//         <button id="bemanna">Bemanna</button>
//         <button id="cancel">Avbryt</button>
//       </div>
//     </div>
//   `;

//   const tbody = container.querySelector("#grid-body");
//   const today = new Date().toISOString().split("T")[0];
//   container.querySelector("#from").value = today;
//   container.querySelector("#planFrom").value = today;

//   function render() {
//     tbody.innerHTML = "";
//     rows.forEach((r, i) => {
//       const tr = document.createElement("tr");
//       tr.innerHTML = `
//         <td><input value="${r.name || ''}" data-i="${i}" data-f="name" /></td>
//         <td><input value="${r.personnr || ''}" data-i="${i}" data-f="personnr" /></td>
//         <td><input type="date" value="${r.from || ''}" data-i="${i}" data-f="from" /></td>
//         <td>
//           <select data-i="${i}" data-f="toMode">
//             <option value="date" ${r.to !== "Öppet" ? "selected" : ""}>Datum</option>
//             <option value="open" ${r.to === "Öppet" ? "selected" : ""}>Öppet</option>
//           </select>
//           <input type="date" value="${r.to === "Öppet" ? "" : r.to}" 
//                  data-i="${i}" data-f="toDate"
//                  style="${r.to === "Öppet" ? "display:none" : ""}" />
//         </td>
//         <td><input value="${r.passTyp || 'Aktiv/Bunden'}" data-i="${i}" data-f="passTyp" /></td>
//         <td><input type="number" value="${r.days || 0}" data-i="${i}" data-f="days" /></td>
//         <td><input value="${r.veckor || ''}" data-i="${i}" data-f="veckor" /></td>
//         <td><input value="${r.semesterkoeff || '0'}" data-i="${i}" data-f="semesterkoeff" /></td>
//         <td><input value="${r.kalenderdagsfaktor || '1,0'}" data-i="${i}" data-f="kalenderdagsfaktor" /></td>
//         <td><input value="${r.dygnsvila || '11:00'}" data-i="${i}" data-f="dygnsvila" /></td>
//         <td><input value="${r.veckovila || '36:00'}" data-i="${i}" data-f="veckovila" /></td>
//         <td><input value="${r.begransningsperiod || '100%'}" data-i="${i}" data-f="begransningsperiod" /></td>
//         <td><input value="${r.planering || ''}" data-i="${i}" data-f="planering" /></td>
//         <td><input value="${r.manuKoeff || ''}" data-i="${i}" data-f="manuKoeff" /></td>
//         <td><input value="${r.planeriManu || ''}" data-i="${i}" data-f="planeriManu" /></td>
//         <td><input value="${r.faktur || ''}" data-i="${i}" data-f="faktur" /></td>
//         <td><input value="${r.kl || ''}" data-i="${i}" data-f="kl" /></td>
//         <td><input value="${r.lhs || ''}" data-i="${i}" data-f="lhs" /></td>
//         <td><input value="${r.datumKl || ''}" data-i="${i}" data-f="datumKl" /></td>
//         <td><input value="${r.startdatum || ''}" data-i="${i}" data-f="startdatum" /></td>
//         <td><input value="${r.periodDgr || ''}" data-i="${i}" data-f="periodDgr" /></td>
//         <td><input type="date" value="${r.planFrom || ''}" data-i="${i}" data-f="planFrom" /></td>
//         <td>
//           <select data-i="${i}" data-f="planToMode">
//             <option value="date" ${r.planTo !== "Öppet" ? "selected" : ""}>Datum</option>
//             <option value="open" ${r.planTo === "Öppet" ? "selected" : ""}>Öppet</option>
//           </select>
//           <input type="date" value="${r.planTo === "Öppet" ? "" : r.planTo}" 
//                  data-i="${i}" data-f="planToDate"
//                  style="${r.planTo === "Öppet" ? "display:none" : ""}" />
//         </td>
//         <td><input value="${r.toSlut || ''}" data-i="${i}" data-f="toSlut" /></td>
//       `;
//       tbody.appendChild(tr);
//     });

//     tbody.querySelectorAll("input").forEach(el => {
//       el.oninput = (e) => {
//         const i = e.target.dataset.i;
//         const f = e.target.dataset.f;
//         if (rows[i]) rows[i][f] = e.target.value;
//       };
//     });

//     tbody.querySelectorAll("select").forEach(el => {
//       el.onchange = (e) => {
//         const i = e.target.dataset.i;
//         const f = e.target.dataset.f;
//         const val = e.target.value;
//         if (f === "toMode") {
//           rows[i].to = val === "open" ? "Öppet" : "";
//           render();
//         } else if (f === "planToMode") {
//           rows[i].planTo = val === "open" ? "Öppet" : "";
//           render();
//         }
//       };
//     });
//   }

//   function validatePeriod() {
//     const daysInput = container.querySelector("#days");
//     const days = parseInt(daysInput.value) || 0;
//     const toDate = container.querySelector("#toDate").value;
//     const fromDate = container.querySelector("#from").value;
    
//     if (!fromDate) {
//       return { valid: false, message: "Startdatum (From) måste anges." };
//     }
    
//     if (toDate) {
//       return { valid: true };
//     }
    
//     if (!toDate && days === 0) {
//       return {
//         valid: false,
//         message: "Rullande dagar måste vara satt på schemaperioden för att utrullning av grundbehov ska kunna ske."
//       };
//     }
    
//     if (!toDate && days > 0) {
//       return { 
//         valid: true,
//         rolling: true,
//         rollingDays: days,
//         startDate: fromDate,
//         endDate: null
//       };
//     }
    
//     return { valid: true };
//   }

//   function showWarningDialog(message) {
//     const overlay = document.createElement("div");
//     overlay.style.cssText = `
//       position: fixed; top:0; left:0; width:100%; height:100%;
//       background: rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center;
//       z-index: 99999;
//     `;

//     const dialog = document.createElement("div");
//     dialog.style.cssText = `
//       background: white; padding: 30px 40px; border-radius: 8px;
//       max-width: 500px; width: 90%; box-shadow: 0 4px 20px rgba(0,0,0,0.3);
//       text-align: left;
//     `;

//     dialog.innerHTML = `
//       <h3 style="margin-top: 0; color: #c0392b;">❌ Kan ej spara</h3>
//       <p style="font-size: 14px; line-height: 1.6; margin: 10px 0 20px 0;">${message}</p>
//       <div style="display: flex; justify-content: flex-end;">
//         <button id="warningOkBtn" style="padding: 8px 30px; background: #3498db; color: white; border: none; border-radius: 4px; font-size: 14px; cursor: pointer;">OK</button>
//       </div>
//     `;

//     overlay.appendChild(dialog);
//     document.body.appendChild(overlay);

//     dialog.querySelector("#warningOkBtn").onclick = () => {
//       document.body.removeChild(overlay);
//     };

//     overlay.onclick = (e) => {
//       if (e.target === overlay) document.body.removeChild(overlay);
//     };
//   }

//   // ===== SPARA OCH PLANERA =====
//   function saveAndPlan() {
//     const validation = validatePeriod();
    
//     if (!validation.valid) {
//       showWarningDialog(validation.message);
//       return;
//     }
    
//     if (rows.length === 0) {
//       alert("⚠️ Du måste lägga till minst en person i schemat innan du planerar.");
//       return;
//     }
    
//     const data = {
//       name: container.querySelector("#name").value || "Namnlös period",
//       from: container.querySelector("#from").value,
//       to: container.querySelector("#toDate").value,
//       days: container.querySelector("#days").value || 0,
//       planFrom: container.querySelector("#planFrom").value,
//       planTo: container.querySelector("#planToDate").value,
//       approveDate: container.querySelector("#approveDate").value,
//       rows: rows
//     };
    
//     const newPeriod = addPeriod(data);
//     const allPeriods = getPeriods();
//     localStorage.setItem("shiftnow_periods", JSON.stringify(allPeriods));
    
//     // 🔥 Navigera till overview med den nya perioden
//     import("../shared/state/store.js").then(({ setState }) => {
//       setState("periods", allPeriods);
//       setState("currentPeriod", newPeriod.id);
//       setState("currentView", "overview");
//       window.dispatchEvent(new Event("navigate"));
//     });
//   }

//   // ===== IMPORTERA PERSONAL =====
//   function showImportModal() {
//     const employees = getEmployees();
//     if (employees.length === 0) {
//       alert("Det finns ingen personal att importera.");
//       return;
//     }

//     const overlay = document.createElement("div");
//     overlay.style.cssText = `
//       position: fixed; top:0; left:0; width:100%; height:100%;
//       background: rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center;
//       z-index: 9999;
//     `;

//     const modal = document.createElement("div");
//     modal.style.cssText = `
//       background: white; padding: 20px; border-radius: 8px;
//       max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;
//     `;
//     modal.innerHTML = `
//       <h3>Välj personal att importera</h3>
//       <div id="employeeChecklist" style="margin: 10px 0;"></div>
//       <div style="display:flex; gap:10px; margin-top:10px;">
//         <button id="selectAllBtn" style="padding:6px 12px;">✅ Markera alla</button>
//         <button id="deselectAllBtn" style="padding:6px 12px;">❌ Avmarkera alla</button>
//       </div>
//       <div style="display:flex; gap:10px; margin-top:15px;">
//         <button id="importSelectedBtn" style="padding:8px 20px; background:#2ecc71; color:white; border:none; border-radius:4px;">Importera valda</button>
//         <button id="closeModalBtn" style="padding:8px 20px; background:#e74c3c; color:white; border:none; border-radius:4px;">Avbryt</button>
//       </div>
//     `;

//     const checklist = modal.querySelector("#employeeChecklist");
//     employees.forEach((emp, idx) => {
//       const label = document.createElement("label");
//       label.style.display = "block";
//       label.style.margin = "4px 0";
//       const name = emp.name || emp.aviseringsnamn || `${emp.fornamn} ${emp.efternamn}`.trim() || "Namnlös";
//       const checked = !rows.some(r => r.name === name) ? "checked" : "";
//       label.innerHTML = `
//         <input type="checkbox" data-idx="${idx}" ${checked} />
//         ${name} (${emp.competence || "SSK"})
//       `;
//       checklist.appendChild(label);
//     });

//     overlay.appendChild(modal);
//     document.body.appendChild(overlay);

//     modal.querySelector("#selectAllBtn").onclick = () => {
//       checklist.querySelectorAll("input[type=checkbox]").forEach(cb => cb.checked = true);
//     };
//     modal.querySelector("#deselectAllBtn").onclick = () => {
//       checklist.querySelectorAll("input[type=checkbox]").forEach(cb => cb.checked = false);
//     };

//     modal.querySelector("#importSelectedBtn").onclick = () => {
//       const selected = [];
//       checklist.querySelectorAll("input[type=checkbox]:checked").forEach(cb => {
//         const idx = parseInt(cb.dataset.idx);
//         selected.push(employees[idx]);
//       });
//       if (selected.length === 0) {
//         alert("Inga personer valda.");
//         return;
//       }
//       const from = container.querySelector("#from").value;
//       const to = container.querySelector("#toDate").value;
//       let added = 0;
//       selected.forEach(emp => {
//         const name = emp.name || emp.aviseringsnamn || `${emp.fornamn} ${emp.efternamn}`.trim();
//         if (name && !rows.some(r => r.name === name)) {
//           rows.push({
//             name: name,
//             personnr: "",
//             from: from,
//             to: to || "Öppet",
//             passTyp: "Aktiv/Bunden",
//             days: 0,
//             time: "40:00",
//             veckor: "",
//             semesterkoeff: "0",
//             kalenderdagsfaktor: "1,0",
//             dygnsvila: "11:00",
//             veckovila: "36:00",
//             begransningsperiod: "100%",
//             planering: "",
//             manuKoeff: "",
//             planeriManu: "",
//             faktur: "",
//             kl: "",
//             lhs: "",
//             datumKl: "",
//             startdatum: "",
//             periodDgr: "",
//             planFrom: "",
//             planTo: "Öppet",
//             toSlut: ""
//           });
//           added++;
//         }
//       });
//       if (added === 0) {
//         alert("Alla valda personer finns redan i listan.");
//       } else {
//         alert(`${added} personer importerades.`);
//         render();
//       }
//       document.body.removeChild(overlay);
//     };

//     modal.querySelector("#closeModalBtn").onclick = () => {
//       document.body.removeChild(overlay);
//     };

//     overlay.onclick = (e) => {
//       if (e.target === overlay) document.body.removeChild(overlay);
//     };
//   }

//   // ===== KNAPPAR =====
//   container.querySelector("#add").onclick = () => {
//     const from = container.querySelector("#from").value;
//     const to = container.querySelector("#toDate").value;
//     rows.push({
//       name: "Nytt obemannat schema",
//       personnr: "",
//       from: from,
//       to: to || "Öppet",
//       passTyp: "Aktiv/Bunden",
//       days: 0,
//       time: "40:00",
//       veckor: "",
//       semesterkoeff: "0",
//       kalenderdagsfaktor: "1,0",
//       dygnsvila: "11:00",
//       veckovila: "36:00",
//       begransningsperiod: "100%",
//       planering: "",
//       manuKoeff: "",
//       planeriManu: "",
//       faktur: "",
//       kl: "",
//       lhs: "",
//       datumKl: "",
//       startdatum: "",
//       periodDgr: "",
//       planFrom: "",
//       planTo: "Öppet",
//       toSlut: ""
//     });
//     render();
//   };

//   container.querySelector("#importStaff").onclick = showImportModal;

//   container.querySelector("#remove").onclick = () => {
//     if (rows.length > 0) { rows.pop(); render(); }
//   };

//   container.querySelector("#save").onclick = () => {
//     const data = {
//       name: container.querySelector("#name").value,
//       from: container.querySelector("#from").value,
//       to: container.querySelector("#toDate").value,
//       days: container.querySelector("#days").value,
//       planFrom: container.querySelector("#planFrom").value,
//       planTo: container.querySelector("#planToDate").value,
//       approveDate: container.querySelector("#approveDate").value,
//       rows: rows
//     };
//     onSave(data);
//   };

//   // 🔥 Båda knapparna använder samma funktion
//   container.querySelector("#plan").onclick = saveAndPlan;

//   container.querySelector("#cancel").onclick = onCancel;

//   container.querySelector("#split").onclick = () => alert("Dela – funktion kommer snart");
//   container.querySelector("#link").onclick = () => alert("Koppla rad – funktion kommer snart");
//   container.querySelector("#copyPerson").onclick = () => alert("Kopiera schema person – funktion kommer snart");
//   container.querySelector("#copyGroup").onclick = () => alert("Kopiera schema grupp – funktion kommer snart");
//   container.querySelector("#grundbehov").onclick = () => alert("Grundbehov – funktion kommer snart");
//   container.querySelector("#bemanna").onclick = () => alert("Bemanna – funktion kommer snart");

//   render();
//   return container;
// }
import { getEmployees } from "../employees/employeeService.js";
import { getPeriods, addPeriod } from "./periodService.js";

export function CreatePeriodView({ onSave, onCancel }) {

  const container = document.createElement("div");

  let rows = [];

  function createEmployeeRow(name = "Ny person") {

    return {

      name,

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
          <input id="name"
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
          <label>Rullande dagar</label>
          <input
            id="days"
            type="number"
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
          <label>Godkänn senast</label>
          <input
             id="approveDate"
             type="date">
        </div>

      </div>

    </div>

    <div class="grid-wrapper">

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

          </tr>

        </thead>

        <tbody id="grid-body">

        </tbody>

      </table>

    </div>

    <div class="grid-footer">

      <button id="add">
        Lägg till schema
      </button>

      <button id="importStaff">
        📥 Importera personal
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
        document.createElement(
          "tr"
        );

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