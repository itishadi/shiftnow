export function ScheduleOverview(periods, currentPeriodId) {
  const container = document.createElement("div");
  container.className = "schedule-overview";

  const period = periods.find(p => p.id === currentPeriodId);
  if (!period) {
    container.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%;">
        <p style="font-size:16px; color:#666;">Ingen period vald.</p>
        <p style="font-size:12px; color:#999;">Välj en period i dropdown-menyn eller skapa en ny period.</p>
      </div>
    `;
    return container;
  }

  // ========== TOPP ==========
  const topBar = document.createElement("div");
  topBar.className = "overview-topbar";
  topBar.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    background: #2c3e50;
    color: white;
    border-radius: 4px 4px 0 0;
    flex-shrink: 0;
    flex-wrap: wrap;
    gap: 10px;
  `;

  const title = document.createElement("span");
  title.textContent = `📅 Schema: ${period.name}`;
  title.style.fontWeight = "bold";

  // ========== PERIODVÄLJARE ==========
  const select = document.createElement("select");
  select.style.cssText = `
    padding: 6px 12px;
    border-radius: 4px;
    border: none;
    font-size: 14px;
    background: #34495e;
    color: white;
    cursor: pointer;
  `;

  periods.forEach(p => {
    const option = document.createElement("option");
    option.value = p.id;
    option.textContent = p.name;
    if (p.id === currentPeriodId) option.selected = true;
    select.appendChild(option);
  });

  select.onchange = () => {
    const newId = parseInt(select.value);
    import("../shared/state/store.js").then(({ setState }) => {
      setState("currentPeriod", newId);
      setState("currentView", "overview");
      window.dispatchEvent(new Event("navigate"));
    });
  };

  topBar.appendChild(title);
  topBar.appendChild(select);
  container.appendChild(topBar);

  // ========== KALENDER ==========
  const calendarWrapper = document.createElement("div");
  calendarWrapper.className = "calendar-wrapper";
  calendarWrapper.style.cssText = `
    flex: 1;
    overflow: auto;
    padding: 10px;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 4px 4px;
    background: white;
    min-height: 0;
  `;

  const fromDate = new Date(period.from);
  const toDate = period.to ? new Date(period.to) : new Date(fromDate);
  toDate.setDate(toDate.getDate() + 60);

  const dates = [];
  const currentDate = new Date(fromDate);
  while (currentDate <= toDate) {
    dates.push({
      date: currentDate.toISOString().split('T')[0],
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      weekday: currentDate.getDay(),
      week: getWeekNumber(currentDate)
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const staffRows = period.rows || [];
  const weekdays = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];

  let html = `
    <div style="overflow-x: auto;">
      <table style="width:100%; border-collapse: collapse; font-size:12px; min-width:900px;">
        <thead>
          <tr>
            <th style="border:1px solid #ccc; padding:4px; background:#d0d3d6; min-width:80px;">Vecka</th>
            <th style="border:1px solid #ccc; padding:4px; background:#d0d3d6; min-width:80px;">Dag</th>
  `;

  dates.forEach(d => {
    const weekday = weekdays[d.weekday] || 'Dag';
    html += `<th style="border:1px solid #ccc; padding:4px; background:#d0d3d6; min-width:50px; text-align:center; font-size:9px;">${weekday}<br>${d.day}/${d.month}</th>`;
  });

  html += `</tr></thead><tbody>`;

  // Personalrader
  staffRows.forEach(row => {
    const name = row.name || "Namnlös";
    const personFrom = row.from || period.from;
    const personTo = row.to || period.to || 'Tillsvidare';
    const passTyp = row.passTyp || "AB";
    const rollingDays = parseInt(row.days) || 0;

    html += `<tr>`;
    html += `<td style="border:1px solid #ccc; padding:4px; font-weight:bold; background:#f5f5f5;">${name}</td>`;
    html += `<td style="border:1px solid #ccc; padding:4px; font-size:10px; background:#f5f5f5;">${passTyp}<br>${personFrom} - ${personTo}</td>`;

    dates.forEach(d => {
      const dDate = new Date(d.date);
      const pFrom = new Date(personFrom);
      const pTo = personTo !== 'Tillsvidare' ? new Date(personTo) : new Date(toDate);
      
      let isActive = true;
      if (dDate < pFrom || dDate > pTo) isActive = false;

      if (rollingDays > 0 && isActive) {
        const diffFromStart = Math.floor((dDate - pFrom) / (1000 * 60 * 60 * 24));
        if (diffFromStart % rollingDays !== 0) isActive = false;
      }

      const bgColor = isActive ? "#4caf50" : "#f0f0f0";
      const textColor = isActive ? "white" : "#ccc";
      const label = isActive ? "✓" : "";

      html += `<td style="border:1px solid #ccc; padding:4px; text-align:center; background:${bgColor}; color:${textColor}; font-weight:bold; font-size:11px;">${label}</td>`;
    });

    html += `</tr>`;
  });

  // Veckorader
  const weekGroups = {};
  dates.forEach(d => {
    const weekKey = d.week;
    if (!weekGroups[weekKey]) {
      weekGroups[weekKey] = [];
    }
    weekGroups[weekKey].push(d);
  });

  Object.keys(weekGroups).forEach(weekNum => {
    const weekDates = weekGroups[weekNum];
    if (weekDates.length === 0) return;
    
    const firstDate = weekDates[0];
    const lastDate = weekDates[weekDates.length - 1];
    const fromStr = firstDate.date;
    const toStr = lastDate.date;

    html += `<tr style="background:#e8f0fe;">`;
    html += `<td style="border:1px solid #ccc; padding:4px; font-weight:bold; color:#333;">Vecka ${weekNum}</td>`;
    html += `<td style="border:1px solid #ccc; padding:4px; font-size:10px; color:#555;">${fromStr} - ${toStr}</td>`;

    weekDates.forEach(d => {
      html += `<td style="border:1px solid #ccc; padding:2px; text-align:center; background:#e8f0fe; font-size:8px; color:#555;">v.${weekNum}</td>`;
    });

    html += `</tr>`;
  });

  html += `</tbody></table></div>`;
  calendarWrapper.innerHTML = html;
  container.appendChild(calendarWrapper);

  // ========== FOOTER ==========
  const footer = document.createElement("div");
  footer.className = "overview-footer";
  footer.style.cssText = `
    flex-shrink: 0;
    padding: 8px 16px;
    background: #cfe8a9;
    border-top: 1px solid #ccc;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    border-radius: 0 0 4px 4px;
    flex-wrap: wrap;
  `;

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "⬅️ Tillbaka";
  closeBtn.style.cssText = `
    padding: 6px 16px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  `;
  closeBtn.onclick = () => {
    import("../shared/state/store.js").then(({ setState }) => {
      setState("currentView", "planning");
      window.dispatchEvent(new Event("navigate"));
    });
  };
  footer.appendChild(closeBtn);
  container.appendChild(footer);

  return container;
}

function getWeekNumber(d) {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}