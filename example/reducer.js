import { processHexagons, pointsToArcs, pointsToLines} from './helper'

const INITIAL_STATE = {
  mapViewState: {
    latitude: 37.751537058389985,
    longitude: -122.42694203247012,
    zoom: 11.5,
    pitch: 0,
    bearing: 0
  },
  choropleths: null,
  extrudedChoropleths: null,
  hexagons: null,
  points: null,
  arcs: null,
  arcs2: null,
  lines: null,
  arcStrokeWidth: 1
};


// ---- Reducer ---- //
export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'UPDATE_MAP':
    return {...state, mapViewState: action.mapViewState};
  case 'LOAD_CHOROPLETHS':
    return {...state, choropleths: action.choropleths};
  case 'LOAD_EXTRUDED_CHOROPLETHS':
    return {...state, extrudedChoropleths: action.extrudedChoropleths};
  case 'LOAD_HEXAGONS': {
    const {hexagons} = action;
    const hexData2 = processHexagons(hexagons);
    const hexData = hexData2.slice(hexData2.length / 2);
    return {...state, hexagons, hexData, hexData2};
  }
  case 'LOAD_POINTS': {
    const points = action.points.map(point => {
      const coordString = point.COORDINATES;
      const p0 = coordString.indexOf('(') + 1;
      const p1 = coordString.indexOf(')');
      const coords = coordString.slice(p0, p1).split(',');
      return {
        position: [Number(coords[1]), Number(coords[0]), 0],
        color: [88, 9, 124],
        radius: (Math.random() * (15 - 5 + 1) + 5) / 10
      };
    });

    const arcs = pointsToArcs(points);
    const arcs1 = arcs.slice(0, arcs.length / 2);
    const arcs2 = arcs.slice(arcs.length / 2);
    const lines = pointsToLines(points);
    return {...state, points, arcs: arcs1, arcs2, lines};
  }
  case 'SWAP_DATA': {
    state = {
      ...state,
      hexData: state.hexData2,
      hexData2: state.hexData
    };
    return state;
  }
  default:
    return state;
  }
}
