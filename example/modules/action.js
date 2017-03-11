
// ---- Action ---- //
export function updateMap(mapViewState) {
  return {type: 'UPDATE_MAP', mapViewState};
}

export function loadFlightDataPoints(points) {
  return {type: 'LOAD_FLIGHT_POINT', points};
}

export function loadAirport(airports) {
  return {type: 'LOAD_AIRPORT', airports};
}

export function loadTrees(data) {
  return {type: 'LOAD_TREES', data}
}

export function selectMode(mode) {
  return {type: 'SELECT_MODE', mode}
}
