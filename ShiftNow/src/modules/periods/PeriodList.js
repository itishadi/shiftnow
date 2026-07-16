import { renderPeriodCards }
    from "./rows/renderPeriodCards.js";

import { setupPeriodToolbar }
    from "./helpers/setupPeriodToolbar.js";

export function PeriodList(
  periods,
  onSelect
) {

  const container =
    document.createElement("div");

  container.style.display =
    "flex";

  container.style.flexDirection =
    "column";

  container.style.height =
    "100%";

  container.style.overflow =
    "hidden";

  const toolbar =
    document.createElement("div");

  toolbar.className =
    "period-toolbar";

  toolbar.innerHTML = `

    <button id="newPeriod">
      Ny period
    </button>

    <button id="nextPeriod">
      Ny efterföljande period
    </button>

    <button id="editPeriod">
      Visa/Ändra period
    </button>

    <button id="deletePeriod">
      Ta bort period
    </button>

    <button id="planPeriod">
      Planera/Kontrollera schema
    </button>

  `;

  container.appendChild(
    toolbar
  );

  const list =
    document.createElement("div");

  list.style.flex = "1";

  list.style.overflowY =
    "auto";

  list.style.padding =
    "8px";

  list.style.display =
    "flex";

  list.style.flexDirection =
    "column";

  list.style.gap =
    "8px";

  container.appendChild(
    list
  );

renderPeriodCards(
    periods,
    list
);
 
setupPeriodToolbar({
    toolbar,
    periods
});

  return container;

}