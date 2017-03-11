/* eslint-disable no-unused-vars */
/* eslint-disable no-inline-comments */
import React from 'react';
import { connect } from 'react-redux'
import './layer_info.scss'

const LayerInfo = React.createClass({
  propTypes: {
    numberFlights: React.PropTypes.number,
    numberVisa: React.PropTypes.number
  },

  render() {
    const {numberFlights, numberVisa} = this.props
    return (
      <div id="overlayControl">
        <div className="titleLabel">
          Trees count: {numberVisa}
        </div>
      </div>
    )
  },
})

export default connect(null, null)(LayerInfo)
