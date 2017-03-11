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

export function loadVisaH1B(data) {
  return {type: 'LOAD_VISA_H1B', data}
}

// Swaps data props when clicked to trigger WebGLBuffer updates
export function swapData() {
  return {type: 'SWAP_DATA'};
}
