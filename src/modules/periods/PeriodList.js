export function PeriodList(periods, onOpen) {
  const container = document.createElement("div");

  const title = document.createElement("h2");
  title.textContent = "Schedule Periods";
  container.appendChild(title);

  periods.forEach(p => {
    const card = document.createElement("div");
    card.className = "period-card";

    card.innerHTML = `
      <strong>${p.name}</strong><br/>
      ${p.start} → ${p.end}
    `;

    card.onclick = () => onOpen(p.id);

    container.appendChild(card);
  });

  return container;
}