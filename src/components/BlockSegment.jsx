'use strict'

import React from 'react'
import PropTypes from 'prop-types'

// Block segment component
export default class BlockSegment extends React.Component {
  /**
   * Get the style prop object for a segment, common style for loaded and
   * unloaded segments
   *
   * @return {Object}
   */
  getSegmentStyle () {
    const { spacing, width } = this.props
    return {
      width: `${width}%`,
      padding: spacing,
      boxSizing: 'border-box',
      display: 'inline-block'
    }
  }

  /**
   * Get the style prop object for the fill node
   *
   * @return {Object}
   */
  getFillStyle () {
    const { smooth, transitionTime, rounded, loaded, loadedColor, unloadedColor } = this.props
    const fillStyle = { width: '100%', paddingBottom: '100%' }
    if (loadedColor && loaded) fillStyle.backgroundColor = loadedColor
    if (unloadedColor && !loaded) fillStyle.backgroundColor = unloadedColor
    if (smooth) fillStyle.transition = `background-color ${transitionTime}ms ease-in-out`
    if (rounded) fillStyle.borderRadius = '50%'
    return fillStyle
  }

  /**
   * Render a block segment component with appropriate styling
   *
   * @return {React Node}
   */
  render () {
    const { loaded } = this.props
    const segmentStyle = this.getSegmentStyle()
    const fillStyle = this.getFillStyle()
    const segmentClasses = [ 'segment' ]
    if (loaded) segmentClasses.push('loaded')
    return (
      <div className={segmentClasses.join(' ')} style={segmentStyle}>
        <div className='fill' style={fillStyle} />
      </div>
    )
  }
}

BlockSegment.propTypes = {
  width: PropTypes.number.isRequired,
  smooth: PropTypes.bool,
  rounded: PropTypes.bool,
  loaded: PropTypes.bool.isRequired,
  transitionTime: PropTypes.number,
  spacing: PropTypes.string,
  loadedColor: PropTypes.string,
  unloadedColor: PropTypes.string
}

BlockSegment.defaultProps = {
  transitionTime: 200
}
