import { processHexagons, pointsToArcs, pointsToLines} from './helper'

const INITIAL_STATE = {
  mapViewState: {
    latitude: 37.751537058389985,
    longitude: -122.42694203247012,
    zoom: 11.5,
    pitch: 0,
    bearing: 0
  },
  points: null,
  airports: null,
};


// ---- Reducer ---- //
export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'UPDATE_MAP':
    return {...state, mapViewState: action.mapViewState};
  case 'LOAD_POINTS': {

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

    return {...state, points: newPoints}
  }
  case 'LOAD_AIRPORT': {

    let dict = {}
    action.airports.forEach((item, index)=>{
      dict[item.IATA_CODE] = [Number(item.LONGITUDE), Number(item.LATITUDE)]
    })

    return {...state, airports: dict}
  }
  default:
    return state;
  }
}
