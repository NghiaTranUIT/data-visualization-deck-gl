import React from 'react'
import DeckGL from '../../src/react/deckgl'
import { TaxiLayer } from '../../src'

export function _renderTaxiOverlay(param) {
    const {flightArcs, airports, mapViewState} = param.props
    const {width, height} = param.state
    const layers = _renderTaxiTripLayer(param)
    return (
      <DeckGL
        id="default-deckgl-overlay"
        width={width}
        height={height}
        debug
        {...mapViewState}
        onWebGLInitialized={ param._onWebGLInitialized }
        layers={layers}
        effects={param._effects}
      />
    );
  }

function _renderTaxiTripLayer(param) {
  const { taxi } = param.props
  const { time } = param.state
  return [
    new TaxiLayer({
      id: 'trips',
      data: taxi,
      getPath: d => d.segments,
      getColor: d => d.vendor === 0 ? [253, 128, 93] : [23, 184, 190],
      opacity: 0.3,
      strokeWidth: 2,
      trailLength: 120,
      currentTime: time * 3600
    }),
  ]

}

function _renderBuildingLayer(param) {
  return []
}
