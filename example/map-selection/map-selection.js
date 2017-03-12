import React from 'react';
import { connect } from 'react-redux'
import { MapMode } from '../constants'

export const MapSelection = React.createClass({
  propTypes: {
    mapMode: React.PropTypes.object,

    // Weird why dispatch props didn't working
    // Temporary solution
    selectModeFunc: React.PropTypes.func,
  },

  _handleChangeChk(evt, mode) {
    this.props.selectModeFunc(mode)
  },

  render() {
    const { mapMode } = this.props
    return (
      <div id="overlay-map-control">
        <div className='title-label'>Mode Selection</div>
        <div className='selection'>
          <input type="checkbox" checked={mapMode === MapMode.TREES} onChange={(evt)=>{this._handleChangeChk(evt, MapMode.TREES)}}/>
          Trees in New York
        </div>
        <div className='selection'>
          <input type="checkbox" checked={mapMode === MapMode.TREES_HEATMAP} onChange={(evt)=>{this._handleChangeChk(evt, MapMode.TREES_HEATMAP)}}/>
          Trees in New York (HeatMap)
        </div>
        <div className='selection'>
          <input type="checkbox" checked={mapMode === MapMode.FLIGHT} onChange={(evt)=>{this._handleChangeChk(evt, MapMode.FLIGHT)}}/>
          Flight Record
        </div>
        <div className='selection'>
          <input type="checkbox" checked={mapMode === MapMode.FLIGHT_GLSL} onChange={(evt)=>{this._handleChangeChk(evt, MapMode.FLIGHT_GLSL)}}/>
          Flight Record (GLSL)
        </div>
      </div>
    )
  },
})

const mapStateToProps = state => {
  return {
    mapMode: state.mapMode,
  }
}

export default connect(mapStateToProps, null)(MapSelection)
