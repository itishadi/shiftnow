export function PeriodList(periods, onSelect) {
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "8px";

  if (!periods || periods.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Inga perioder ännu.";
    container.appendChild(empty);
    return container;
  }

  periods.forEach(p => {
    const div = document.createElement("div");
    div.className = "period-card";
    div.innerHTML = `
      <strong>${p.name}</strong><br/>
      <small>${p.from} → ${p.to}</small>
    `;
    div.onclick = () => onSelect(p.id);
    container.appendChild(div);
  });

  return container;
}