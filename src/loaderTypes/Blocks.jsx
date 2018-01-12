'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import BlockSegment from '../components/BlockSegment'

// Blocks style loader
export class Blocks extends React.Component {
  constructor (props) {
    super(props)
    this.getSegment = this.getSegment.bind(this)
  }

  /**
   * Get the props for the wrapper node
   *
   * @return {Object}
   */
  getWrapperProps () {
    const { width, height } = this.props.style
    const style = {}
    if (width !== undefined) style.width = width
    if (height !== undefined) style.height = height
    return {
      className: 'react-finite-loader blocks',
      style
    }
  }

  /**
   * Gets a segment using key for the react key and styles as loaded or unloaded
   * segment based on loaded value
   *
   * @param  {String} key     Unique key
   * @param  {Boolean} loaded Is the segment a loaded segment
   * @return {React Node}     Segment node
   */
  getSegment (key, loaded) {
    const { smooth, transitionTime, style, rounded, spacing, segments } = this.props
    const { loadedColor, unloadedColor } = style
    const width = 100 / segments
    const props = {
      smooth,
      transitionTime,
      rounded,
      spacing,
      loadedColor,
      unloadedColor,
      width,
      loaded,
      key
    }

    return (
      <BlockSegment {...props} />
    )
  }

  /**
   * Get the segment elements
   *
   * @return {Array} Array of React nodes
   */
  getSegments () {
    const { getSegment, props } = this
    const { segments, progress } = props
    const renderedSegments = Math.ceil(segments / 100 * progress)
    const segmentNodes = Array(segments)
    for (let i = 0; i < segments; i++) {
      const key = `segment-${i}`
      segmentNodes[i] = i < renderedSegments ? getSegment(key, true) : getSegment(key, false)
    }

    return segmentNodes
  }

  /**
   * Render the loader bar with appropriate styling
   *
   * @return {React Node}
   */
  render () {
    return (
      <div {...this.getWrapperProps()}>
        {this.getSegments()}
      </div>
    )
  }
}

Blocks.propTypes = {
  progress: PropTypes.number,
  segments: PropTypes.number,
  smooth: PropTypes.bool,
  rounded: PropTypes.bool,
  transitionTime: PropTypes.number,
  spacing: PropTypes.string,
  style: PropTypes.shape({
    loadedColor: PropTypes.string,
    unloadedColor: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
  })
}

Blocks.defaultProps = {
  segments: 20,
  smooth: true,
  rounded: false,
  spacing: '2px',
  transitionTime: 200,
  style: {}
}
