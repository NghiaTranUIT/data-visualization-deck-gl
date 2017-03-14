import React from 'react'
import DeckGL from '../../src/react/deckgl'
import { FlightLayer } from '../../src'

export function _renderFlightOverlay(param) {
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
        layers={_renderFlightLayer(param)}
        effects={param._effects}
      />
    );
  }

  function _renderFlightLayer(param) {
    const {flightArcs, airports} = param.props
    const {time} = param.state
    return [
      new FlightLayer({
        id: 'arc-flight',
        data: flightArcs,
        strokeWidth: 3,
        color: [88, 9, 124],
        trailLength: 0.5,
        currentTime: time,
        timestamp: 400 / 2000
      })
    ];
  }
