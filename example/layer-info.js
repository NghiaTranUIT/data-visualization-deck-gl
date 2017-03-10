/* eslint-disable no-unused-vars */
/* eslint-disable no-inline-comments */
import React from 'react';
import { connect } from 'react-redux'
import './layer_info.scss'

const LayerInfo = React.createClass({
  propTypes: {
    numberFlights: React.PropTypes.number
  },

  render() {
    const {numberFlights} = this.props
    return (
      <div id="overlayControl">
        <div className="titleLabel">
          Number of flight {numberFlights}
        </div>
      </div>
    )
  },
})

export default connect(null, null)(LayerInfo)
