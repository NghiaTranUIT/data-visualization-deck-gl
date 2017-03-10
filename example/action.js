// ---- Action ---- //
export function updateMap(mapViewState) {
  return {type: 'UPDATE_MAP', mapViewState};
}

export function loadChoropleths(choropleths) {
  return {type: 'LOAD_CHOROPLETHS', choropleths};
}

export function loadExtrudedChoropleths(extrudedChoropleths) {
  return {type: 'LOAD_EXTRUDED_CHOROPLETHS', extrudedChoropleths};
}

export function loadHexagons(hexagons) {
  return {type: 'LOAD_HEXAGONS', hexagons};
}

export function loadPoints(points) {
  return {type: 'LOAD_POINTS', points};
}

// Swaps data props when clicked to trigger WebGLBuffer updates
export function swapData() {
  return {type: 'SWAP_DATA'};
}
