export function CreatePeriodView({ onSave, onCancel }) {
  const container = document.createElement("div");
  let rows = [];

  container.innerHTML = `
    <div class="mv-container">

      <!-- HEADER -->
      <div class="mv-header">
        Personalöversikt Schemperiod
      </div>

      <!-- FORM -->
      <div class="mv-body">
        <div class="mv-left">
          <div class="row">
            <label>Benämning</label>
            <input id="name" class="input-long" value="14101 LUL UAS 04 BSJH KIR AVD" />
          </div>

          <div class="row">
            <label>From</label>
            <input type="date" id="from" class="input-short" value="2026-06-29" />
          </div>

          <div class="row">
            <label>Tom</label>
            <input type="date" id="toDate" class="input-short" value="2026-06-30" />
          </div>

          <div class="row">
            <label>Rullande antal dagar</label>
            <input id="days" type="number" value="0" class="input-short" />
          </div>

          <div class="row">
            <label>Fasta kvoter</label>
            <input type="number" value="0" class="input-short" />
          </div>

          <div class="row">
            <label>Semesterkoefficient</label>
            <input type="number" value="0" class="input-short" />
          </div>

          <div class="row">
            <label>Kalenderdagfaktor</label>
            <input type="number" value="0" class="input-short" />
          </div>

          <div class="row">
            <label>Sekkoefficient</label>
            <input type="number" value="0" class="input-short" />
          </div>

          <div class="row">
            <label>Kvot Övr. frånvaro planering</label>
            <input type="number" value="0" class="input-short" />
          </div>

          <div class="row">
            <label>Skicka bestek med:</label>
            <input type="number" value="0" class="input-short" />
          </div>
        </div>

        <div class="mv-right">
          <div class="row">
            <label>Planeringsperiod from</label>
            <input type="date" id="planFrom" class="input-short" />
          </div>

          <div class="row">
            <label>Planeringsperiod tom</label>
            <input type="date" id="planToDate" class="input-short" />
          </div>

          <div class="row">
            <label>Justering tom</label>
            <input type="date" class="input-short" />
          </div>

          <div class="row">
            <label>Godkänn senast</label>
            <input type="date" id="approveDate" class="input-short" value="2026-06-29" />
          </div>

          <div class="row">
            <label>Ärendemetod</label>
            <select class="input-long">
              <option>Välj ärendemetod</option>
              <option>&lt;Endast arbetsledare&gt;</option>
            </select>
          </div>

          <div class="row">
            <label>Inst för behov i webbplanering</label>
            <select class="input-long">
              <option>Välj ärendemetod</option>
            </select>
          </div>
        </div>
      </div>

      <!-- GRID -->
      <div class="grid-wrapper">

        <!-- FAST HEADER -->
        <table class="grid-header-table">
          <tr>
            <th style="width:25%">Namn</th>
            <th style="width:15%">Från</th>
            <th style="width:15%">Till</th>
            <th style="width:10%">Omfattning</th>
            <th style="width:15%">Kompetens</th>
            <th style="width:20%">Tillgänglighet</th>
          </tr>
        </table>

        <!-- SCROLL AREA -->
        <div class="grid-scroll">
          <table id="grid-body"></table>
        </div>

      </div>

      <!-- FOOTER - GRÖN LÄNGST NER -->
      <div class="grid-footer">
        <button id="remove">Ta bort</button>
        <button id="save">Spara</button>
        <button id="plan">Spara/Planera schema</button>
        <button id="add">Lägg till obemannat schema</button>
        <button id="cancel">Avbryt</button>
      </div>

    </div>
  `;

  const table = container.querySelector("#grid-body");
  const today = new Date().toISOString().split("T")[0];
  
  // Sätt standardvärden
  container.querySelector("#from").value = today;
  container.querySelector("#planFrom").value = today;

  // Standardrader
  rows = [
    {
      name: "Anna Andersson",
      from: "2026-06-29",
      to: "Öppet",
      omfattning: "100%",
      kompetens: "SSK",
      tillgänglighet: "Dag"
    },
    {
      name: "Bengt Berg",
      from: "2026-06-29",
      to: "Öppet",
      omfattning: "80%",
      kompetens: "USK",
      tillgänglighet: "Kväll"
    },
    {
      name: "Cecilia Carlsson",
      from: "2026-06-29",
      to: "2026-08-30",
      omfattning: "100%",
      kompetens: "SSK",
      tillgänglighet: "Natt"
    }
  ];

  function render() {
    table.innerHTML = "";

    rows.forEach((r, i) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td><input value="${r.name}" data-i="${i}" data-f="name" style="width:100%"></td>
        <td><input type="date" value="${r.from}" data-i="${i}" data-f="from" style="width:100%"></td>
        <td>
          <select data-i="${i}" data-f="toMode" style="width:100%">
            <option value="date" ${r.to !== "Öppet" ? "selected" : ""}>Datum</option>
            <option value="open" ${r.to === "Öppet" ? "selected" : ""}>Öppet</option>
          </select>
          <input type="date" value="${r.to === "Öppet" ? "" : r.to}" 
                 data-i="${i}" data-f="toDate"
                 style="${r.to === "Öppet" ? "display:none;width:100%" : "width:100%"}">
        </td>
        <td><input value="${r.omfattning}" data-i="${i}" data-f="omfattning" style="width:100%"></td>
        <td><input value="${r.kompetens}" data-i="${i}" data-f="kompetens" style="width:100%"></td>
        <td><input value="${r.tillgänglighet}" data-i="${i}" data-f="tillgänglighet" style="width:100%"></td>
      `;

      table.appendChild(tr);
    });

    // Input-händelser
    table.querySelectorAll("input").forEach(el => {
      el.oninput = (e) => {
        const i = e.target.dataset.i;
        const f = e.target.dataset.f;
        if (rows[i]) {
          rows[i][f] = e.target.value;
        }
      };
    });

    // Select-händelser
    table.querySelectorAll("select").forEach(el => {
      el.onchange = (e) => {
        const i = e.target.dataset.i;
        const f = e.target.dataset.f;
        const val = e.target.value;
        if (f === "toMode") {
          rows[i].to = val === "open" ? "Öppet" : "";
          render();
        }
      };
    });
  }

  // Lägg till rad
  container.querySelector("#add").onclick = () => {
    rows.push({
      name: "Nytt obemannat schema",
      from: container.querySelector("#from").value || "",
      to: container.querySelector("#toDate").value || "Öppet",
      omfattning: "100%",
      kompetens: "SSK",
      tillgänglighet: "Dag"
    });
    render();
  };

  // Ta bort rad
  container.querySelector("#remove").onclick = () => {
    if (rows.length > 0) {
      rows.pop();
      render();
    }
  };

  // Spara
  container.querySelector("#save").onclick = () => {
    const data = {
      name: container.querySelector("#name").value,
      from: container.querySelector("#from").value,
      to: container.querySelector("#toDate").value,
      days: container.querySelector("#days").value,
      planFrom: container.querySelector("#planFrom").value,
      planTo: container.querySelector("#planToDate").value,
      approveDate: container.querySelector("#approveDate").value,
      rows: rows
    };
    onSave(data);
  };

  // Planera
  container.querySelector("#plan").onclick = () => {
    console.log("Planera schema:", rows);
    alert("Schema planerat! Kolla konsolen.");
  };

  // Avbryt
  container.querySelector("#cancel").onclick = onCancel;

  render();
  return container;
}