import React from 'react';
import { connect } from 'react-redux'
import './layer_info.scss'

const LayerInfo = React.createClass({
  propTypes: {
    numberFlights: React.PropTypes.number,
    numberTrees: React.PropTypes.number,
    numberAirport: React.PropTypes.number,
    mode: React.PropTypes.string,
  },

  render() {
    const { numberFlights, numberTrees, numberAirport } = this.props
    return (
      <div id="overlay-control">
        <div className="title-label">
          Trees: {numberTrees}
        </div>
        <div className="title-label">
          Flights: {numberFlights}
        </div>
        <div className="title-label">
          Airport: {numberAirport}
        </div>
      </div>
    )
  },
})

export default connect(null, null)(LayerInfo)
