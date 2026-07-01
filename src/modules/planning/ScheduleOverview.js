export function ScheduleOverview(periods, currentPeriodId) {
  const container = document.createElement("div");
  container.style.cssText = `
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background: white;
    padding: 10px;
    box-sizing: border-box;
  `;

  const period = periods.find(p => p.id === currentPeriodId);
  if (!period) {
    container.innerHTML = `<p>Ingen period vald.</p>`;
    return container;
  }

  if (!period.rows) period.rows = [];

  // ===== TOPP =====
  const topBar = document.createElement("div");
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
    gap: 8px;
  `;

  const title = document.createElement("span");
  const monthNames = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];
  const fromMonth = monthNames[new Date(period.from).getMonth()];
  const fromYear = new Date(period.from).getFullYear();
  title.textContent = `📅 ${fromMonth} ${fromYear} (v.${getWeekNumber(new Date(period.from))})`;
  title.style.fontWeight = "bold";
  title.style.fontSize = "14px";

  const rightSection = document.createElement("div");
  rightSection.style.cssText = `display: flex; align-items: center; gap: 10px;`;

  const select = document.createElement("select");
  select.style.cssText = `
    padding: 4px 10px;
    border-radius: 4px;
    border: none;
    font-size: 12px;
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

  rightSection.appendChild(select);
  topBar.appendChild(title);
  topBar.appendChild(rightSection);
  container.appendChild(topBar);

  // ===== TABELL =====
  const tableWrapper = document.createElement("div");
  tableWrapper.style.cssText = `
    flex: 1;
    overflow: auto;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 4px 4px;
    background: white;
    padding: 10px;
    min-height: 300px;
  `;

  const staffRows = period.rows || [];

  // Generera datum (4 veckor från periodens start)
  const fromDate = new Date(period.from);
  const toDate = new Date(fromDate);
  toDate.setDate(toDate.getDate() + 28);

  // Hitta första måndag
  while (fromDate.getDay() !== 1) {
    fromDate.setDate(fromDate.getDate() - 1);
  }

  const allDates = [];
  const currentDate = new Date(fromDate);
  while (currentDate <= toDate) {
    allDates.push({
      date: currentDate.toISOString().split('T')[0],
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      weekday: currentDate.getDay(),
      week: getWeekNumber(currentDate)
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Gruppera efter vecka
  const weekGroups = {};
  allDates.forEach(d => {
    const weekKey = d.week;
    if (!weekGroups[weekKey]) {
      weekGroups[weekKey] = [];
    }
    weekGroups[weekKey].push(d);
  });

  // ===== BYGG TABELL =====
  let html = `
    <div style="overflow-x: auto; width:100%;">
      <table style="width:100%; border-collapse: collapse; font-size:12px; min-width:800px;">
        <thead>
          <tr>
            <th style="border:1px solid #ccc; padding:6px; background:#d0d3d6; min-width:150px; text-align:left; position:sticky; left:0; z-index:10;">Vecka</th>
  `;

  // 7 dagar: Måndag till Söndag
  const dayNames = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];
  for (let i = 0; i < 7; i++) {
    html += `<th style="border:1px solid #ccc; padding:6px; background:#d0d3d6; min-width:60px; text-align:center; position:sticky; left:${150 + i * 60}px; z-index:10;">${dayNames[i]}</th>`;
  }

  html += `</tr></thead><tbody>`;

  // ===== VECKORADER =====
  Object.keys(weekGroups).forEach(weekNum => {
    const weekDates = weekGroups[weekNum];
    if (weekDates.length === 0) return;

    html += `<tr style="background:#e8f0fe;">`;
    html += `<td style="border:1px solid #ccc; padding:4px; font-weight:bold; color:#333; position:sticky; left:0; z-index:5;">Vecka ${weekNum}</td>`;

    for (let i = 0; i < 7; i++) {
      const dayIndex = i + 1;
      const dayData = weekDates.find(d => d.weekday === dayIndex);
      if (dayData) {
        const dayStr = dayData.day < 10 ? `0${dayData.day}` : dayData.day;
        const monthStr = dayData.month < 10 ? `0${dayData.month}` : dayData.month;
        html += `<td style="border:1px solid #ccc; padding:2px; text-align:center; background:#e8f0fe; font-size:9px; color:#555;">${dayStr}/${monthStr}</td>`;
      } else {
        html += `<td style="border:1px solid #ccc; padding:2px; background:#f9f9f9;"></td>`;
      }
    }
    html += `</tr>`;
  });

  // ===== PERSONALRADER =====
  if (staffRows.length === 0) {
    html += `
      <tr>
        <td colspan="8" style="border:1px solid #ccc; padding:20px; text-align:center; color:#666;">
          👤 Ingen personal tillagd.
        </td>
      </tr>
    `;
  } else {
    staffRows.forEach((row, rowIndex) => {
      const name = row.name || "Namnlös";
      const personFrom = row.from || period.from;
      const personTo = row.to || period.to || 'Öppet';
      const passTyp = row.passTyp || "AB";
      const rollingDays = parseInt(row.days) || 0;

      html += `<tr>`;
      html += `<td style="border:1px solid #ccc; padding:6px; font-weight:bold; background:#f5f5f5; position:sticky; left:0; z-index:5;">
        ${name}<br>
        <span style="font-size:9px; font-weight:normal; color:#555;">${passTyp} ${personFrom} - ${personTo}</span>
      </td>`;

      // 7 dagar
      for (let i = 0; i < 7; i++) {
        const dayIndex = i + 1;
        const dayData = allDates.find(d => d.weekday === dayIndex);
        
        if (dayData) {
          const dDate = new Date(dayData.date);
          const pFrom = new Date(personFrom);
          const pTo = personTo !== 'Öppet' ? new Date(personTo) : new Date(toDate);
          
          let isActive = true;
          if (dDate < pFrom || dDate > pTo) isActive = false;

          if (rollingDays > 0 && isActive) {
            const diffFromStart = Math.floor((dDate - pFrom) / (1000 * 60 * 60 * 24));
            if (diffFromStart % rollingDays !== 0) isActive = false;
          }

          const bgColor = isActive ? "#4caf50" : "#f0f0f0";
          const textColor = isActive ? "white" : "#ccc";
          const label = isActive ? "✓" : "";

          html += `<td style="border:1px solid #ccc; padding:2px; text-align:center; background:${bgColor}; color:${textColor}; font-weight:bold; font-size:10px; cursor:${isActive ? 'pointer' : 'default'};" 
                       data-row="${rowIndex}" data-date="${dayData.date}" data-active="${isActive}"
                       contenteditable="${isActive ? 'true' : 'false'}">${label}</td>`;
        } else {
          html += `<td style="border:1px solid #ccc; padding:2px; background:#f9f9f9;"></td>`;
        }
      }

      html += `</tr>`;
    });
  }

  html += `</tbody></table></div>`;
  tableWrapper.innerHTML = html;
  container.appendChild(tableWrapper);

  // ===== REDIGERBARA CELLER =====
  tableWrapper.querySelectorAll("td[contenteditable='true']").forEach(cell => {
    cell.addEventListener('focus', function() {
      if (this.textContent.trim() === '✓') {
        this.textContent = '';
      }
    });

    cell.addEventListener('blur', function() {
      let value = this.textContent.trim();
      if (value === '') {
        this.textContent = '✓';
      } else {
        const timeRegex = /^([0-9]{1,2}:[0-9]{2})$/;
        if (!timeRegex.test(value) && value !== '✓') {
          this.textContent = '✓';
          alert('Ange tid i formatet HH:MM, t.ex. 07:00 eller 15:30');
        }
      }
    });

    cell.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.blur();
      }
      if (e.key === 'Escape') {
        this.textContent = '✓';
        this.blur();
      }
    });
  });

  // ===== FOOTER =====
  const footer = document.createElement("div");
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
      setState("currentView", "grid");
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