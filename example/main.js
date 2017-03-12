// Copyright (c) 2015 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
/* eslint-disable func-style */
/* eslint-disable no-console */
/* global console, process */
/* global document, window */
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import MapboxGLMap from 'react-map-gl'
import {FPSStats} from 'react-stats'
import LayerInfo from './info/layer-info'
import * as request from 'd3-request'
import DeckGL from '../src/react/deckgl'
import {ReflectionEffect} from '../src/experimental'
import {interpolateViridis} from 'd3-scale'
import { reducer } from './modules/reducer'
import HeatmapOverlay from 'react-map-gl-heatmap-overlay'
import { ArcLayer,ScreenGridLayer } from '../src'
import { MapSelection } from './map-selection/map-selection'
import { updateMap, loadFlightDataPoints, loadAirport, loadTrees, selectMode } from './modules/action'
import { MAPBOX_ACCESS_TOKEN, MapMode, SMALL_FLIGHT_DATA, AIRPORT_DATA, TREE_DATA} from './constants'

// ---- View ---- //
const ExampleApp = React.createClass({
  propTypes: {

  },

  _effects: [new ReflectionEffect()],

  componentWillMount() {
    this._handleResize();
    window.addEventListener('resize', this._handleResize);

    // Load Flight Data
    this._loadCsvFile(AIRPORT_DATA, (data)=>{
      this.props.dispatch(loadAirport(data))
      this._loadCsvFile(SMALL_FLIGHT_DATA, (data)=>{this.props.dispatch(loadFlightDataPoints(data))})
    });

    // Load Tree
    this._loadCsvFile(TREE_DATA, (data)=>{this.props.dispatch(loadTrees(data))})
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
  },

  _loadCsvFile(path, onDataLoaded) {
    request.csv(path, function loadJson(error, data) {
      if (error) {
        console.error(error);
      }
      onDataLoaded(data);
    });
  },

  _handleResize() {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  },

  _handleViewportChanged(mapViewState) {
    if (mapViewState.pitch > 60) {
      mapViewState.pitch = 60
    }
    this.props.dispatch(updateMap(mapViewState))
  },

  _onWebGLInitialized(gl) {
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
  },

  _renderFlightLayer() {
    const {flightArcs, airports} = this.props
    return [
      new ArcLayer({
        id: 'arc',
        data: flightArcs,
        strokeWidth: 3,
        color: [88, 9, 124],
      })
    ];
  },

  _renderTreeLayer() {
    const { trees } = this.props
    return [
      new ScreenGridLayer({
        id: 'gird',
        data: trees,
        minColor: [0, 0, 0, 0],
        unitWidth: 10,
        unitHeight: 10,
      })
    ];
  },

  _renderFlightGLSLOverlay() {
    return null
  },

  _renderFlightOverlay() {
    const {flightArcs, airports, mapViewState} = this.props
    const {width, height} = this.state
    return (
      <DeckGL
        id="default-deckgl-overlay"
        width={width}
        height={height}
        debug
        {...mapViewState}
        onWebGLInitialized={ this._onWebGLInitialized }
        layers={this._renderTreeLayer()}
        effects={this._effects}
      />
    );
  },

  _renderTreesOverlay() {
    const { mapViewState, trees } = this.props
    const { width, height } = this.state
    return (
      <DeckGL
        id="default-deckgl-overlay"
        width={width}
        height={height}
        debug
        {...mapViewState}
        onWebGLInitialized={ this._onWebGLInitialized }
        layers={this._renderTreeLayer()}
        effects={this._effects}
      />
    );
  },

  _renderTreesHeatMapOverlay() {
    const { mapViewState, trees } = this.props
    const { width, height } = this.state
    return (
      <HeatmapOverlay
        locations={trees}
        {...mapViewState}
        width={width}
        height={height}/>
    )
  },

  _renderVisualizationOverlay() {
    const { flightArcs, airports, mapMode, trees } = this.props

    // wait until data is ready before rendering
    if (flightArcs === null|| airports === null || trees === null) {
      return []
    }

    return (
      <div>
        { mapMode === MapMode.TREES && this._renderTreesOverlay() }
        { mapMode === MapMode.TREES_HEATMAP && this._renderTreesHeatMapOverlay() }
        { mapMode === MapMode.FLIGHT && this._renderFlightOverlay() }
        { mapMode === MapMode.FLIGHT_GLSL && this._renderFlightGLSLOverlay() }
      </div>
    )
  },

  _renderMap() {
    const { mapViewState, mapMode } = this.props
    const { width, height } = this.state
    const isActiveOverlay = mapMode !== MapMode.NONE
    return (
      <MapboxGLMap
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        width={width}
        height={height}
        mapStyle='mapbox://styles/mapbox/dark-v9'
        perspectiveEnabled
        { ...mapViewState }
        onChangeViewport={this._handleViewportChanged}>
        {isActiveOverlay && this._renderVisualizationOverlay()}
        <FPSStats isActive/>
      </MapboxGLMap>
    );
  },

  render() {
    const { flightArcs, trees, mapMode, airports } = this.props
    const layerInfoProps = {
      numberFlights: this._getLength(flightArcs),
      numberTrees: this._getLength(trees),
      numberAirport: this._getLength(airports),
      mode: mapMode,
    }
    const mapSelectionProps = {
      mapMode: this.props.mapMode,
      selectModeFunc: this._handleSelectMode
    }
    return (
      <div>
        { this._renderMap() }
        <div className='overlay-contol-container'>
          <MapSelection {...mapSelectionProps}/>
          <LayerInfo {...layerInfoProps}/>
        </div>
      </div>
    )
  },

  _getLength(data) {
    if (data === null) {
      return 0
    }
    return Object.keys(data).length
  },

  _handleSelectMode(mode) {
    this.props.dispatch(selectMode(mode))
  },

})

// redux states -> react props
function mapStateToProps(state) {
  return {
    mapViewState: state.mapViewState,
    flightArcs: state.flightArcs,
    airports: state.airports,
    trees: state.trees,
    mapMode: state.mapMode,
  }
}

// ---- Main ---- //
const store = createStore(reducer);
const App = connect(mapStateToProps)(ExampleApp);

const container = document.createElement('div');
document.body.appendChild(container);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  container
);
/* eslint-enable func-style */
/* eslint-enable no-console */
