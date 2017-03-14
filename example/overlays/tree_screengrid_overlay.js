import React from 'react'
import DeckGL from '../../src/react/deckgl'
import { ScreenGridLayer } from '../../src'

export function _renderTreesOverlay(param) {
    const { mapViewState, trees } = param.props
    const { width, height } = param.state
    return (
      <DeckGL
        id="default-deckgl-overlay"
        width={width}
        height={height}
        debug
        {...mapViewState}
        onWebGLInitialized={param.onWebGLInitialized}
        layers={_renderTreeLayer(param.props)}
        effects={param.effects}
      />
    )
}

function _renderTreeLayer(props) {
  const { trees } = props
  return [
    new ScreenGridLayer({
      id: 'gird',
      data: trees,
      minColor: [0, 0, 0, 0],
      unitWidth: 10,
      unitHeight: 10,
    })
  ];
}
