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
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import autobind from 'autobind-decorator';
import MapboxGLMap from 'react-map-gl';
import {FPSStats} from 'react-stats';
import LayerSelector from './layer-selector';
import LayerInfo from './layer-info';
import * as request from 'd3-request';
import DeckGL from '../src/react/deckgl';
import {ReflectionEffect} from '../src/experimental';
import {updateMap, loadChoropleths, loadExtrudedChoropleths, loadHexagons,
loadPoints, swapData, loadAirport} from './action'
import { reducer } from './reducer'
import {
  ChoroplethLayer,
  ScatterplotLayer,
  ArcLayer,
  LineLayer,
  ScreenGridLayer
} from '../src';

// ---- Default Settings ---- //
/* eslint-disable no-process-env */
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN ||
  'pk.eyJ1IjoibmdoaWF0cmFuIiwiYSI6ImNpenhxcjBsejAxc2EycXFycTAzbjBqMHYifQ.lrdb9bCOiTpOjcO254IQBw';
const SMALL_FLIGHT_DATA = './example/data/slight-small-chuck-flight-data_2.csv';
const AIRPORT_DATA = './example/data/airports.csv';

// ---- View ---- //
const ExampleApp = React.createClass({
  propTypes: {

  },

  _effects: [new ReflectionEffect()],

  componentWillMount() {
    this._handleResize();
    window.addEventListener('resize', this._handleResize);

    this._loadCsvFile(AIRPORT_DATA, (data)=>{
      this._handleAirportLoaded(data)
      this._loadCsvFile(SMALL_FLIGHT_DATA, this._handlePointsLoaded);
    });

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

   _handlePointsLoaded(data) {
    this.props.dispatch(loadPoints(data));
  },

  _handleAirportLoaded(data) {
    this.props.dispatch(loadAirport(data));
 },

  _handleResize() {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  },

  _handleViewportChanged(mapViewState) {
    if (mapViewState.pitch > 60) {
      mapViewState.pitch = 60;
    }
    this.props.dispatch(updateMap(mapViewState));
  },

  _onWebGLInitialized(gl) {
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
  },

  _renderFlightLayer() {

    const {points, airports} = this.props
    return [
      new ArcLayer({
        id: 'arc',
        data: points,
        strokeWidth: 3,
        color: [88, 9, 124],
      })
    ];
  },

  _renderOverlay() {
    const {points, airports, mapViewState} = this.props;
    const {width, height} = this.state;

    // wait until data is ready before rendering
    if (!points || !airports) {
      return [];
    }

    return (
      <DeckGL
        id="default-deckgl-overlay"
        width={width}
        height={height}
        debug
        {...mapViewState}
        onWebGLInitialized={ this._onWebGLInitialized }
        layers={this._renderFlightLayer()}
        effects={this._effects}
      />
    );
  },

  _renderMap() {
    const {mapViewState} = this.props;
    const {width, height} = this.state;

    return (
      <MapboxGLMap
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        width={width}
        height={height}
        mapStyle='mapbox://styles/mapbox/dark-v9'
        perspectiveEnabled
        { ...mapViewState }
        onChangeViewport={this._handleViewportChanged}>
        { this._renderOverlay() }
        <FPSStats isActive/>
      </MapboxGLMap>
    );
  },

  render() {
    const {points} = this.props
    const length = points === null ? 0 : points.length
    const layerInfoProps = {numberFlights: length}
    return (
      <div>
        { this._renderMap() }
        <LayerInfo {...layerInfoProps}/>
      </div>
    );
  },

})

// redux states -> react props
function mapStateToProps(state) {
  return {
    mapViewState: state.mapViewState,
    points: state.points,
    airports: state.airports,
  };
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
