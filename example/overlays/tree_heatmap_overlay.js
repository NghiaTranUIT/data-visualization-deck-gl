import React from 'react'
import DeckGL from '../../src/react/deckgl'
import HeatmapOverlay from 'react-map-gl-heatmap-overlay'

export function _renderTreesHeatMapOverlay(param) {
    const { mapViewState, trees } = param.props
    const { width, height } = param.state
    return (
      <HeatmapOverlay
        locations={trees}
        {...mapViewState}
        width={width}
        height={height}
        lngLatAccessor={(tree) => [tree['position'][0], tree['position'][1]]}
        />
    )
}
