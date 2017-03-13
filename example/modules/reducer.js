import { MapMode } from '../constants'

const SF_LOCATION = {
  latitude: 37.751537058389985,
  longitude: -122.42694203247012,
}

const WA_LOCATION = {
  latitude: 47.44298,
  longitude: -122.32931,
}

const NY_LOCATION = {
  latitude: 40.70237278,
  longitude: -74.01143532,
}

const INITIAL_STATE = {
  mapViewState: {
    latitude: NY_LOCATION.latitude,
    longitude: NY_LOCATION.longitude,
    zoom: 11.5,
    pitch: 0,
    bearing: 0
  },
  flightArcs: null,
  airports: null,
  trees: null,
  mapMode: MapMode.NONE,
};


// ---- Reducer ---- //
export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'UPDATE_MAP':
    return {...state, mapViewState: action.mapViewState}

  case 'SELECT_MODE':
  const mapViewState = state.mapViewState

    // Move to NY
    if (action.mode === MapMode.TREES || action.mode === MapMode.TREES_HEATMAP) {
      mapViewState.latitude = NY_LOCATION.latitude
      mapViewState.longitude = NY_LOCATION.longitude
    }

    // Move to SF
    if (action.mode === MapMode.FLIGHT || action.mode === MapMode.FLIGHT_GLSL) {
      mapViewState.latitude = WA_LOCATION.latitude
      mapViewState.longitude = WA_LOCATION.longitude
    }

    return {...state, mapViewState, mapMode: action.mode}

  case 'LOAD_FLIGHT_POINT': {
    const flightArcs = action.points.map((item)=>{
      const originalAirport = item.ORIGIN_AIRPORT
      const destinationAirport = item.DESTINATION_AIRPORT
      return {
        sourcePosition: state.airports[originalAirport],
        targetPosition: state.airports[destinationAirport],
        vendor: 1,
        segments: linearInterpolation(state.airports[originalAirport], state.airports[destinationAirport], 10)
      }
    })
    return {...state, flightArcs}
  }

  case 'LOAD_AIRPORT': {
    let airports = {}
    action.airports.forEach((item, index)=>{
      airports[item.IATA_CODE] = [Number(item.LONGITUDE), Number(item.LATITUDE)]
    })

    return {...state, airports}
  }

  case 'LOAD_TREES': {
    let trees = action.data.map((item)=>{
      const lat = item.latitude
      const long = item.longitude
      return {
        position: [Number(long), Number(lat)]
      }
    })
    return {...state, trees}
  }

  default:
    return state;
  }
}

export function linearInterpolation(start, end, count) {
  let start_long = start[0]
  let start_lat = start[1]
  let end_long = end[0]
  let end_lat = end[1]

  let denta_long = (end_long - start_long) / count
  let denta_lat = (end_lat - start_lat) / count

  let segments = []
  for (var i = 0; i < count + 1; i++) {
    let x = start_long + denta_long * i
    let y = start_lat + denta_lat * i
    let z = (50 * i) / 2000
    let ptr = [x, y, z]
    segments.push(ptr)
  }
  return segments
}

export function ziczacInterpolation(start, end, count) {
  let start_long = start[0]
  let start_lat = start[1]
  let end_long = end[0]
  let end_lat = end[1]

  let denta_long = (end_long - start_long) / count
  let denta_lat = (end_lat - start_lat) / count

  let segments = []
  for (var i = 0; i < count; i++) {
    let positive = i % 2 == 0 ? 1 : -1
    let denta = denta_long * positive
    let x = start_long + denta_long * i + denta
    let y = start_lat + denta_lat * i
    let z = (50 * i) / 2000
    let ptr = [x, y, z]

    segments.push(ptr)
  }
  return segments
}
