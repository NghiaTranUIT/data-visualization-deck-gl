import { MapMode } from '../constants'

const SF_LOCATION = {
  latitude: 37.751537058389985,
  longitude: -122.42694203247012,
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
    return {...state, mapViewState: action.mapViewState};
  case 'LOAD_FLIGHT_POINT': {
    const flightArcs = action.points.map((item)=>{
      const originalAirport = item.ORIGIN_AIRPORT
      const destinationAirport = item.DESTINATION_AIRPORT
      return {
        sourcePosition: state.airports[originalAirport],
        targetPosition: state.airports[destinationAirport],
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
        longitude: Number(long),
        latitude: Number(lat),
      }
    })
    return {...state, trees}
  }

  default:
    return state;
  }
}
