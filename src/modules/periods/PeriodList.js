import {
  getPeriodStatus,
  removePeriod,
  getPeriods
}
from "./periodService.js";

import {
  state,
  setState
}
from "../shared/state/store.js";

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

  periods.forEach(p => {

    const div =
      document.createElement("div");

    const status =
      getPeriodStatus(p);

    div.className =
      status.complete
        ? "period-card complete"
        : "period-card incomplete";

    if (
      state.selectedPeriod === p.id
    ) {

      div.classList.add(
        "selected"
      );

    }

    div.innerHTML = `

      <strong>
        ${p.name}
      </strong>

      <br>

      <small>
        ${p.from}
        →
        ${p.to}
      </small>

      <br>

      <small>
        ${status.approved}
        /
        ${status.total}
        fastställda
      </small>

    `;

    div.onclick = () => {

      setState(
        "selectedPeriod",
        p.id
      );

      window.dispatchEvent(
        new Event(
          "navigate"
        )
      );

    };

    list.appendChild(
      div
    );

  });

  toolbar.querySelector(
    "#planPeriod"
  ).onclick = () => {

    if (
      !state.selectedPeriod
    ) {

      alert(
        "Välj en period först."
      );

      return;

    }

    setState(
      "currentPeriod",
      state.selectedPeriod
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

  };

  toolbar.querySelector(
    "#editPeriod"
  ).onclick = () => {

    if (
      !state.selectedPeriod
    ) {

      alert(
        "Välj en period först."
      );

      return;

    }

    setState(
      "currentPeriod",
      state.selectedPeriod
    );

    setState(
      "currentView",
      "grid"
    );

    window.dispatchEvent(
      new Event(
        "navigate"
      )
    );

  };

  toolbar.querySelector(
    "#newPeriod"
  ).onclick = () => {

    setState(
      "currentView",
      "createPeriod"
    );

    window.dispatchEvent(
      new Event(
        "navigate"
      )
    );

  };

  toolbar.querySelector(
  "#nextPeriod"
).onclick = () => {

  if (
    !state.selectedPeriod
  ) {

    alert(
      "Välj en period först."
    );

    return;

  }

  const current =
    periods.find(
      p =>
        p.id ===
        state.selectedPeriod
    );

  if (!current) {
    return;
  }

  alert(
    "Funktion för efterföljande period kommer härnäst."
  );

};

  toolbar.querySelector(
  "#deletePeriod"
).onclick = () => {

  if (
    !state.selectedPeriod
  ) {

    alert(
      "Välj en period först."
    );

    return;

  }

  const confirmed =
    confirm(
      "Ta bort vald period?"
    );

  if (!confirmed) {
    return;
  }

  removePeriod(
    state.selectedPeriod
  );

  setState(
    "periods",
    getPeriods()
  );

  setState(
    "selectedPeriod",
    null
  );

  window.dispatchEvent(
    new Event(
      "navigate"
    )
  );

};

  return container;

}