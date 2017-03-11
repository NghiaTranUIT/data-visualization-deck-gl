import { processHexagons, pointsToArcs, pointsToLines} from './helper'

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
  visah1bDatas: null,
};


// ---- Reducer ---- //
export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'UPDATE_MAP':
    return {...state, mapViewState: action.mapViewState};
  case 'LOAD_FLIGHT_POINT': {

    // Map corrdinate from air-port
    console.log(state.airports)
    console.log(action.points[0])

    const newPoints = action.points.map((item)=>{
      const originalAirport = item.ORIGIN_AIRPORT
      const destinationAirport = item.DESTINATION_AIRPORT
      const line = {
        sourcePosition: state.airports[originalAirport],
        targetPosition: state.airports[destinationAirport],
      }
      return line
    })

    return {...state, flightArcs: newPoints}
  }
  case 'LOAD_AIRPORT': {

    let dict = {}
    action.airports.forEach((item, index)=>{
      dict[item.IATA_CODE] = [Number(item.LONGITUDE), Number(item.LATITUDE)]
    })

    return {...state, airports: dict}
  }
  case 'LOAD_VISA_H1B': {
    let visah1bDatas = action.data.map((item)=>{
      const lat = item.latitude
      const long = item.longitude
      const position = {
        longitude: Number(long),
        latitude: Number(lat),
      }
      return position
    })

    return {...state, visah1bDatas}
  }

  default:
    return state;
  }
}
