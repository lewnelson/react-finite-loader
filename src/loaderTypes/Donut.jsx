'use strict'

import React from 'react'
import PropTypes from 'prop-types'

// Donut style loader
export class Donut extends React.Component {
  /**
   * Get the props for the wrapper node
   *
   * @return {Object}
   */
  getWrapperProps () {
    const scale = this.props.style.scale || 10
    const style = {
      width: '1em',
      height: '1em',
      position: 'relative',
      fontSize: `${scale}em`
    }

    return {
      className: 'react-finite-loader donut',
      style
    }
  }

  /**
   * Get the styled label node
   *
   * @return {React Node}
   */
  getLabel () {
    const { progress, labelAsPercentage, value, finish } = this.props
    const { labelColor } = this.props.style
    const labelFontSize = this.props.style.labelFontSize || '0.25em'
    const style = {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      position: 'absolute',
      zIndex: 2,
      fontSize: labelFontSize,
      color: labelColor
    }

    const text = labelAsPercentage
      ? (<span>{Math.floor(progress)}<span className='percentage'>%</span></span>)
      : (<span>{Math.floor(value)} / {Math.floor(finish)}</span>)

    return (<label style={style}>{text}</label>)
  }

  /**
   * Get the common styling for each loaded half
   *
   * @return {Object} Common styles
   */
  getCommonHalfStyle () {
    const { thickness } = this.props
    const { loadedColor } = this.props.style
    return {
      width: '100%',
      height: '100%',
      clip: 'rect(0, 0.5em, 1em, 0)',
      borderRadius: '50%',
      position: 'absolute',
      top: 0,
      left: 0,
      borderWidth: `${thickness / 2}em`,
      borderStyle: 'solid',
      borderColor: loadedColor
    }
  }

  /**
   * Get the loaded left half node
   *
   * @return {React Node}
   */
  getLoadedLeftHalf () {
    const { progress } = this.props
    const rotation = 360 / 100 * progress
    const leftStyle = Object.assign({
      transform: progress > 50 ? `rotate(${rotation}deg)` : undefined,
      display: progress > 50 ? undefined : 'none'
    }, this.getCommonHalfStyle())

    return (
      <div className='left-half' style={leftStyle} />
    )
  }

  /**
   * Get the loaded right half node
   *
   * @return {React Node}
   */
  getLoadedRightHalf () {
    const { progress } = this.props
    const rotation = 360 / 100 * progress
    const rightStyle = Object.assign({
      transform: progress > 50 ? 'rotate(180deg)' : `rotate(${rotation}deg)`
    }, this.getCommonHalfStyle())

    return (
      <div className='right-half' style={rightStyle} />
    )
  }

  /**
   * Get the loaded node with each loaded half
   *
   * @return {React Node}
   */
  getLoaded () {
    const { progress } = this.props
    const wrapperStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      clip: progress <= 50 ? 'rect(0, 1em, 1em, 0.5em)' : 'rect(auto, auto, auto, auto)',
      zIndex: 1
    }

    return (
      <div className='loaded' style={wrapperStyle}>
        {this.getLoadedLeftHalf()}
        {this.getLoadedRightHalf()}
      </div>
    )
  }

  /**
   * Get the unloaded node
   *
   * @return {React Node}
   */
  getUnloaded () {
    const { thickness } = this.props
    const { unloadedColor } = this.props.style
    const style = {
      borderRadius: '50%',
      borderWidth: `${thickness / 2}em`,
      borderStyle: 'solid',
      borderColor: unloadedColor,
      width: '100%',
      height: '100%',
      position: 'absolute'
    }

    return (
      <div className='unloaded' style={style} />
    )
  }

  /**
   * Get the middle node
   *
   * @return {React Node}
   */
  getMiddle () {
    const { thickness } = this.props
    const { middleColor } = this.props.style
    const style = {
      backgroundColor: middleColor,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: `calc(100% - ${thickness}em)`,
      height: `calc(100% - ${thickness}em)`,
      borderRadius: '50%'
    }

    return (
      <div className='middle' style={style} />
    )
  }

  /**
   * Render the loader donut with appropriate styling
   *
   * @return {React Node}
   */
  render () {
    return (
      <div {...this.getWrapperProps()}>
        {this.getLabel()}
        {this.getLoaded()}
        {this.getUnloaded()}
        {this.getMiddle()}
      </div>
    )
  }
}

Donut.propTypes = {
  progress: PropTypes.number,
  value: PropTypes.number,
  finish: PropTypes.number,
  labelAsPercentage: PropTypes.bool,
  // Proportion of radius i.e. 1 == radius
  thickness: (props, propName, componentName) => {
    const value = props[propName]
    const err = new Error(`${propName} must be a number greater than 0 and less than or equal to 1`)
    if (typeof value === 'number') return !(value > 0 && value <= 1) ? err : null
    return value !== undefined ? err : null
  },
  style: PropTypes.shape({
    loadedColor: PropTypes.string,
    unloadedColor: PropTypes.string,
    labelColor: PropTypes.string,
    middleColor: PropTypes.string,
    scale: PropTypes.number,
    labelFontSize: PropTypes.string
  })
}

Donut.defaultProps = {
  labelAsPercentage: true,
  thickness: 0.2,
  style: {}
}
