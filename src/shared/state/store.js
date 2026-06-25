export const state = {
  currentView: "home", 
  periods: [],
  currentPeriod: null
};

export function setState(key, value) {
  state[key] = value;
}
``