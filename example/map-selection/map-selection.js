import React from 'react';
import { connect } from 'react-redux'
import { selectMode } from '../modules/action'

export const MapSelection = React.createClass({
  propTypes: {
    mapMode: React.PropTypes.object,
  },

  render() {
    const { mapMode } = this.props
    return (
      <div id="overlay-map-control">
        <div className='title-label'>Mode Selection</div>
      </div>
    )
  },
})

const mapStateToProps = state => {
  return {
    mapMode: state.mapMode,
  }
}

const mapDispatchToProps = {
  selectMode: selectMode,
}

export default connect(mapStateToProps, mapDispatchToProps)(MapSelection)
