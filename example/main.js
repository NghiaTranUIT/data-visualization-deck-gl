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
loadPoints, swapData} from './action'
import { reducer } from './reducer'

// ---- Default Settings ---- //
/* eslint-disable no-process-env */
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN ||
  'pk.eyJ1IjoibmdoaWF0cmFuIiwiYSI6ImNpenhxcjBsejAxc2EycXFycTAzbjBqMHYifQ.lrdb9bCOiTpOjcO254IQBw';

const CHOROPLETHS_FILE = './example/data/sf.zip.geo.json';
const EXTRUDED_CHOROPLETHS_FILE = './example/data/sf.zip.geo.json';
const HEXAGONS_FILE = './example/data/hexagons.csv';
const POINTS_FILE = './example/data/sf.bike.parking.csv';

// ---- View ---- //
class ExampleApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedHexagons: [],
      hoverHexagon: null,
      hoverPoint: null,
      hoverArc: null,
      hoverChoropleth: null,
      clickItem: null
    };

    this._effects = [new ReflectionEffect()];
  }

  componentWillMount() {
    this._handleResize();
    window.addEventListener('resize', this._handleResize);
    this._loadCsvFile(POINTS_FILE, this._handlePointsLoaded);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
  }

  _loadCsvFile(path, onDataLoaded) {
    request.csv(path, function loadJson(error, data) {
      if (error) {
        console.error(error);
      }
      onDataLoaded(data);
    });
  }

  @autobind _updateArcStrokeWidth() {
    this.setState({arcStrokeWidth: 1});
  }

  @autobind _handleHexagonsLoaded(data) {
    this.props.dispatch(loadHexagons(data));
  }

  @autobind _handlePointsLoaded(data) {
    this.props.dispatch(loadPoints(data));
  }

  @autobind _handleResize() {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  @autobind _handleViewportChanged(mapViewState) {
    if (mapViewState.pitch > 60) {
      mapViewState.pitch = 60;
    }
    this.props.dispatch(updateMap(mapViewState));
  }

  @autobind _onWebGLInitialized(gl) {
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
  }

  _renderExamples() {
    return [];
  }

  _renderOverlay() {
    const {points, mapViewState} = this.props;
    const {width, height} = this.state;

    // wait until data is ready before rendering
    if (!points ) {
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
        layers={this._renderExamples()}
        effects={this._effects}
      />
    );
  }

  _renderMap() {
    const {mapViewState} = this.props;
    const {width, height} = this.state;

    return (
      <MapboxGLMap
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        width={width}
        height={height}
        perspectiveEnabled
        { ...mapViewState }
        onChangeViewport={this._handleViewportChanged}>
        { this._renderOverlay() }
        <FPSStats isActive/>
      </MapboxGLMap>
    );
  }

  render() {
    return (
      <div>
        { this._renderMap() }
        <LayerInfo { ...this.state }/>
      </div>
    );
  }
}

// redux states -> react props
function mapStateToProps(state) {
  return {
    mapViewState: state.mapViewState,
    choropleths: state.choropleths,
    extrudedChoropleths: state.extrudedChoropleths,
    hexagons: state.hexagons,
    points: state.points,
    arcs: state.arcs,
    arcs2: state.arcs2,
    lines: state.lines,
    hexData: state.hexData,
    hexData2: state.hexData2
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
