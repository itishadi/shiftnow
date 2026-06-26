export function PeriodList(periods, onSelect) {
  const container = document.createElement("div");

  periods.forEach(p => {
    const div = document.createElement("div");
    div.className = "period-card";
    div.textContent = p.name;

    div.onclick = () => onSelect(p.id);

    container.appendChild(div);
  });

  return container;
}
``