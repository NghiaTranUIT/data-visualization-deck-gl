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

import {Layer, assembleShaders} from '../../..';
import {GL, Model, Geometry} from 'luma.gl';
import {readFileSync} from 'fs';
import {join} from 'path';

const DEFAULT_COLOR = [253, 128, 93, 255];
const defaultGetSourcePosition = x => x.sourcePosition;
const defaultGetTargetPosition = x => x.targetPosition;
const defaultGetColor = x => x.color;

export default class FlightLayer extends Layer {

  static layerName = 'FlightLayer';

  /**
   * @classdesc
   * ArcLayer
   *
   * @class
   * @param {object} props
   */
  constructor({
    strokeWidth = 1,
    getSourcePosition = defaultGetSourcePosition,
    getTargetPosition = defaultGetTargetPosition,
    getSourceColor = defaultGetColor,
    getTargetColor = defaultGetColor,
    ...props
  } = {}) {
    super({
      strokeWidth,
      getSourcePosition,
      getTargetPosition,
      getSourceColor,
      getTargetColor,
      ...props
    });
  }

  updateState({props, changeFlags: {dataChanged}}) {
    // Implement here
  }

  initializeState() {
    // Implement here
  }

  draw({uniforms}) {
    // Implement here
  }

  _createModel(gl) {
    // Implement here
  }

  calculateInstanceSourcePositions(attribute) {
    // Implement here
  }

  calculateInstanceTargetPositions(attribute) {
    // Implement here
  }

  calculateInstanceSourceColors(attribute) {
    // Implement here
  }

  calculateInstanceTargetColors(attribute) {
    // Implement here
  }

  getShaders() {
    return {
      vs: readFileSync(join(__dirname, './flight-layer-vertex.glsl'), 'utf8'),
      fs: readFileSync(join(__dirname, './flight-layer-fragment.glsl'), 'utf8')
    };
  }
}
