import React from 'react';
import { connect } from 'react-redux'
import './layer_info.scss'

const LayerInfo = React.createClass({
  propTypes: {
    numberFlights: React.PropTypes.number,
    numberTrees: React.PropTypes.number,
    mode: React.PropTypes.string,
  },

  render() {
    const {numberFlights, numberTrees} = this.props
    return (
      <div id="overlayControl">
        <div className="titleLabel">
          Trees count: {numberTrees}
        </div>
      </div>
    )
  },
})

export default connect(null, null)(LayerInfo)
