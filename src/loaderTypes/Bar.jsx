'use strict'

import React from 'react'
import PropTypes from 'prop-types'

// Bar style loader
export class Bar extends React.Component {
  /**
   * Get the props for the wrapper node
   *
   * @return {Object}
   */
  getWrapperProps () {
    const { width, height, unloadedColor } = this.props.style
    const style = {}
    if (unloadedColor !== undefined) style.backgroundColor = unloadedColor
    if (width !== undefined) style.width = width
    if (height !== undefined) style.height = height
    return {
      className: 'react-finite-loader bar',
      style
    }
  }

  /**
   * Get the props for the loaded node, i.e. the node which represents the
   * portion loaded
   *
   * @return {Object}
   */
  getLoadedProps () {
    const { smooth, transitionTime, progress } = this.props
    const { loadedColor } = this.props.style
    const style = { height: '100%', width: `${progress}%` }
    if (loadedColor !== undefined) style.backgroundColor = loadedColor
    if (smooth) style.transition = `width ${transitionTime}ms ease-out`

    return {
      style,
      className: 'loaded'
    }
  }

  /**
   * Render the loader bar with appropriate styling
   *
   * @return {React Node}
   */
  render () {
    return (
      <div {...this.getWrapperProps()}>
        <div {...this.getLoadedProps()} />
      </div>
    )
  }
}

Bar.propTypes = {
  progress: PropTypes.number,
  smooth: PropTypes.bool,
  transitionTime: PropTypes.number,
  style: PropTypes.shape({
    loadedColor: PropTypes.string,
    unloadedColor: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
  })
}

Bar.defaultProps = {
  smooth: true,
  transitionTime: 200,
  style: {}
}
