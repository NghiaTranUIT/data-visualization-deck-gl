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
};


// ---- Reducer ---- //
export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'UPDATE_MAP':
    return {...state, mapViewState: action.mapViewState};
  case 'LOAD_POINTS': {
    return {...state}
  }
  default:
    return state;
  }
}
