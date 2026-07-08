import {
  getPeriods,
  addPeriod
}
from "../modules/periods/periodService.js";

import {
  PeriodList
}
from "../modules/periods/PeriodList.js";

import {
  CreatePeriodView
}
from "../modules/periods/CreatePeriodView.js";

import {
  ScheduleGrid
}
from "../modules/planning/ScheduleGrid.js";

import {
  ScheduleOverview
}
from "../modules/planning/ScheduleOverview.js";

import {
  EmployeeSelector
}
from "../modules/employees/EmployeeSelector.js";

import {
  state,
  setState
}
from "../modules/shared/state/store.js";

const root =
  document.getElementById("app");

function init() {

  const saved =
    localStorage.getItem(
      "shiftnow_periods"
    );

  if (saved) {

    setState(
      "periods",
      JSON.parse(saved)
    );

  } else {

    setState(
      "periods",
      getPeriods()
    );

  }

  document.getElementById(
    "navHome"
  ).onclick = () => {

    setState(
      "currentView",
      "home"
    );

    render();

  };

  document.getElementById(
    "navPlanning"
  ).onclick = () => {

    setState(
      "currentView",
      "planning"
    );

    render();

  };

  document.getElementById(
    "navEmployees"
  ).onclick = () => {

    setState(
      "currentView",
      "employees"
    );

    render();

  };

  window.addEventListener(
    "navigate",
    render
  );

  setState(
    "currentView",
    "home"
  );

  render();

}

function selectPeriod(id) {

  setState(
    "selectedPeriod",
    id
  );

  render();

}

function createNewPeriod() {

  setState(
    "currentView",
    "createPeriod"
  );

  render();

}

function render() {

  root.innerHTML = "";

  switch (
    state.currentView
  ) {

    case "home":

      root.innerHTML = `

        <h2>
          🏠 Välkommen till ShiftNow
        </h2>

        <p>
          Välj en funktion i menyn till vänster.
        </p>

      `;

      break;

    case "planning": {

      const title =
        document.createElement(
          "h2"
        );

      title.textContent =
        "📅 Schemaperioder";

      root.appendChild(
        title
      );

      const list =
        PeriodList(
          state.periods,
          selectPeriod
        );

      root.appendChild(
        list
      );

      break;
    }

    case "createPeriod": {

      const view =
        CreatePeriodView({

          onSave: data => {

            addPeriod(data);

            setState(
              "periods",
              getPeriods()
            );

            localStorage.setItem(
              "shiftnow_periods",
              JSON.stringify(
                getPeriods()
              )
            );

            setState(
              "currentView",
              "planning"
            );

            render();

          },

          onCancel: () => {

            setState(
              "currentView",
              "planning"
            );

            render();

          }

        });

      root.appendChild(
        view
      );

      break;

    }

    case "grid": {

      const period =
        state.periods.find(
          p =>
            p.id ===
            state.currentPeriod
        );

      if (!period) {

        root.innerHTML =
          "<p>Perioden hittades inte.</p>";

        break;

      }

      const grid =
        ScheduleGrid(
          period
        );

      root.appendChild(
        grid
      );

      break;

    }

    case "overview": {

      const overview =
        ScheduleOverview(
          state.periods,
          state.currentPeriod
        );

      root.appendChild(
        overview
      );

      break;

    }

    case "employees": {

      const selector =
        EmployeeSelector();

      root.appendChild(
        selector
      );

      break;

    }

    default:

      root.innerHTML =
        "<p>Okänd vy.</p>";

  }

}

init();