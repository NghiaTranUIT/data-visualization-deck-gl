import React from 'react'
import DeckGL from '../../src/react/deckgl'
import { ArcFlightLayer } from '../../src'

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
        layers={_renderArcFlightLayer(param)}
        effects={param._effects}
      />
    );
  }

  function _renderArcFlightLayer(param) {
    const {flightArcs, airports} = param.props
    const {time} = param.state
    return [
      new ArcFlightLayer({
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
