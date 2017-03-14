import React from 'react'
import DeckGL from '../../src/react/deckgl'
import { FlightLayer } from '../../src'

export function _renderTaxiOverlay(param) {
    const {flightArcs, airports, mapViewState} = param.props
    const {width, height} = param.state
    return (
      <DeckGL
        id="default-deckgl-overlay"
        width={width}
        height={height}
        debug
        {...mapViewState}
        onWebGLInitialized={ param._onWebGLInitialized }
        layers={_renderFlightGLSLLayer(param)}
        effects={param._effects}
      />
    );
  }

  function _renderFlightGLSLLayer(param) {
      const {flightArcs, airports} = param.props
      const {time} = param.state
      return [
        new FlightLayer({
          id: 'flight-trips',
          data: flightArcs,
          getPath: d => d.segments,
          getColor: d => d.vendor === 0 ? [253,128,93] : [23,184,190],
          opacity: 0.3,
          strokeWidth: 10,
          trailLength: 0.25,
          currentTime: time
        })
      ];
  }
