/* eslint-disable no-unused-vars */
/* eslint-disable no-inline-comments */
import React from 'react';
import { connect } from 'react-redux'

const LayerInfo = React.createClass({
  propTypes: {
    numberFlights: React.PropTypes.number
  },

  render() {
    const {numberFlights} = this.props
    return (
      <div id="overlay-control" style={ {
        position: 'absolute',
        bottom: 20,
        left: 20,
        zIndex: 99,
        pointerEvents: 'none'
      } }>

        <div style={ {
          padding: '1em',
          marginBottom: '1em',
          width: 300
        } }>
          <div>Number of flight {numberFlights}</div>
        </div>
      </div>
    )
  },
})

export default connect(null, null)(LayerInfo)
