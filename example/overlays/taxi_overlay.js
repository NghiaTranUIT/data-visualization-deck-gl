import React from 'react'
import DeckGL from '../../src/react/deckgl'

export function _renderTaxiOverlay(param) {
    const {flightArcs, airports, mapViewState} = param.props
    const {width, height} = param.state
    const layers = []
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
  return []
}

function _renderBuildingLayer(param) {
  return []
}
