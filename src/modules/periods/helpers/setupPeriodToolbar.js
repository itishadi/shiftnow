 import {
    state,
    setState
} from "../../shared/state/store.js";

import {
    removePeriod,
    getPeriods
} from "../periodService.js";

export function setupPeriodToolbar({
    toolbar,
    periods
}) {
 
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
}