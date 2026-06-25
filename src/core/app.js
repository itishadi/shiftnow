import { getPeriods } from "../modules/periods/periodService.js";
import { PeriodList } from "../modules/periods/PeriodList.js";
import { state, setState } from "../shared/state/store.js";

const root = document.getElementById("app");

// init
function init() {
  setState("periods", getPeriods());

  setupNavigation();
  render();
}

// navigation
function setupNavigation() {
  document.getElementById("navHome").onclick = () => {
    state.currentView = "home";
    render();
  };

  document.getElementById("navPlanning").onclick = () => {
    state.currentView = "planningList";
    render();
  };
}

// öppna period
function openPeriod(id) {
  state.currentPeriod = id;
  state.currentView = "periodDetail";
  render();
}

// render
function render() {
  root.innerHTML = "";

  if (state.currentView === "home") {
    root.innerHTML = "<h2>Welcome to ShiftNow</h2>";
  }

  if (state.currentView === "planningList") {
    root.appendChild(
      PeriodList(state.periods, openPeriod)
    );
  }

  if (state.currentView === "periodDetail") {
    root.innerHTML = `
      <h2>Period Detail</h2>
      <p>Selected period ID: ${state.currentPeriod}</p>
      <button id="backBtn">Back</button>
    `;

    document.getElementById("backBtn").onclick = () => {
      state.currentView = "planningList";
      render();
    };
  }
}

init();