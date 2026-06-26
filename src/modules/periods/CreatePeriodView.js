export function CreatePeriodView({ onSave, onCancel }) {
  const container = document.createElement("div");
  container.className = "green-form";

  container.innerHTML = `
    <div class="column">
      <label>Benämning</label>
      <input id="name"/>

      <label>From</label>
      <input type="date" id="from"/>

      <label>Tom</label>
      <select id="toMode">
        <option value="date">Datum</option>
        <option value="open">Öppet</option>
      </select>
      <input type="date" id="toDate"/>

      <label>Rullande dagar</label>
      <input type="number" id="days" value="7"/>
    </div>

    <div class="column">
      <label>Planeringsperiod from</label>
      <input type="date" id="planFrom"/>

      <label>Planeringsperiod tom</label>
      <select id="planToMode">
        <option value="date">Datum</option>
        <option value="open">Öppet</option>
      </select>
      <input type="date" id="planToDate"/>

      <label>Godkänn senast</label>
      <input type="date" id="approveDate"/>
    </div>

    <div style="width:100%">
      <button id="save">Spara / Planera schema</button>
      <button id="cancel">Avbryt</button>
    </div>
  `;

  const toMode = container.querySelector("#toMode");
  const toDate = container.querySelector("#toDate");

  const planToMode = container.querySelector("#planToMode");
  const planToDate = container.querySelector("#planToDate");

  toMode.onchange = () => {
    toDate.style.display = toMode.value === "date" ? "block" : "none";
  };

  planToMode.onchange = () => {
    planToDate.style.display = planToMode.value === "date" ? "block" : "none";
  };

  container.querySelector("#save").onclick = () => {
    const data = {
      name: container.querySelector("#name").value,
      from: container.querySelector("#from").value,
      to: toMode.value === "open" ? "Öppet" : toDate.value,
      days: container.querySelector("#days").value,
      planFrom: container.querySelector("#planFrom").value,
      planTo: planToMode.value === "open" ? "Öppet" : planToDate.value,
      approveDate: container.querySelector("#approveDate").value
    };

    onSave(data);
  };

  container.querySelector("#cancel").onclick = onCancel;

  return container;
}