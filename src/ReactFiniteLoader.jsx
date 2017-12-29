'use strict'

import React from 'react'
import PropTypes from 'prop-types'

export class ReactFiniteLoader extends React.Component {
  /**
   * Calculate the progress as a percentage to represent the loading state
   *
   * @return {Number} Percentage between 0 and 100 inclusive
   */
  getProgressPercentage () {
    const { value, start, finish } = this.props
    return ((value - start) / (finish - start)) * 100
  }

  /**
   * Get the props object for the loader component
   *
   * @return {Object} Object with the progress state
   */
  getLoaderProps () {
    const progress = this.getProgressPercentage()
    return { progress }
  }

  /**
   * Renders the child component with the calculated progress
   *
   * @return {React Node}
   */
  render () {
    const { children } = this.props
    const props = this.getLoaderProps()
    return React.cloneElement(children, props)
  }
}

ReactFiniteLoader.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  start: PropTypes.number,
  finish: PropTypes.number
}

ReactFiniteLoader.defaultProps = {
  start: 0,
  finish: 100
}
