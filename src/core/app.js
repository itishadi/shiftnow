import { getPeriods, addPeriod } from "../modules/periods/periodService.js";
import { PeriodList } from "../modules/periods/PeriodList.js";
import { CreatePeriodView } from "../modules/periods/CreatePeriodView.js";
import { ScheduleGrid } from "../modules/planning/ScheduleGrid.js";
import { state, setState } from "../shared/state/store.js";

const root = document.getElementById("app");

function init() {
  setState("periods", getPeriods());

  document.getElementById("navHome").onclick = () => {
    setState("currentView", "home");
    render();
  };

  document.getElementById("navPlanning").onclick = () => {
    setState("currentView", "planning");
    render();
  };

  render();
}

function selectPeriod(id) {
  setState("currentPeriod", id);
  render();
}

function createNewPeriod() {
  setState("currentView", "createPeriod");
  render();
}

function render() {
  root.innerHTML = "";

  if (state.currentView === "home") {
    root.innerHTML = "<h2>Welcome to ShiftNow</h2>";
  }

  if (state.currentView === "planning") {
    const title = document.createElement("h2");
    title.textContent = "Schemaplanering";
    root.appendChild(title);

    const periods = PeriodList(state.periods, selectPeriod);
    root.appendChild(periods);

    const btn = document.createElement("button");
    btn.textContent = "Ny period";
    btn.onclick = createNewPeriod;
    root.appendChild(btn);
  }

  if (state.currentView === "createPeriod") {
    const view = CreatePeriodView({
      onSave: (data) => {
        addPeriod(data);
        setState("periods", getPeriods());
        setState("currentView", "grid");
        render();
      },
      onCancel: () => {
        setState("currentView", "planning");
        render();
      }
    });

    root.appendChild(view);
  }

  if (state.currentView === "grid") {
    root.appendChild(ScheduleGrid());
  }
}

init();
