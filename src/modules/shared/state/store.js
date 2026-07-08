export const state = {

  currentView: "home",

  periods: [],

  currentPeriod: null,

  selectedPeriod: null

};

export function setState(
  key,
  value
) {

  state[key] = value;

}