'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import BlockSegment from '../components/BlockSegment'

// Grid style loader
export class Grid extends React.Component {
  constructor (props) {
    super(props)
    this.getSegment = this.getSegment.bind(this)
  }

  /**
   * Calculate how many rotations should be completed for the spiral pattern
   *
   * @return {int}
   */
  getSpiralRotations () {
    const filledSegments = this.getFilled()
    const positions = this.getPositionsForSpiral()
    let nextPos = positions[1] || positions[0]
    let rotations = 0
    let currentAxis = nextPos[0] === positions[0][0] ? 'x' : 'y'
    for (let i = 0; i < filledSegments; i++) {
      nextPos = positions[i + 1] || positions[i]
      let nextAxis = nextPos[0] === positions[i][0] ? 'x' : 'y'
      if (currentAxis !== nextAxis) {
        rotations++
        currentAxis = nextAxis
      }
    }

    return rotations
  }

  /**
   * Get the calculated rotation for the wrapper in degrees
   *
   * @return {int}
   */
  getWrapperRotation () {
    const { pattern, gridSize, spin, reverse, reverseSpin } = this.props
    let baseRotation = 0
    if (pattern.match(/^vertical/)) baseRotation = 270
    const filledSegments = this.getFilled()
    let rotations = 0
    if (spin) {
      rotations = pattern === 'spiral'
        ? this.getSpiralRotations()
        : Math.floor(filledSegments / gridSize)
    }

    const multiplier = reverse ^ reverseSpin ? -1 : 1
    return baseRotation + (rotations * 90 * multiplier)
  }

  /**
   * Get the props for the wrapper node
   *
   * @return {Object}
   */
  getWrapperProps () {
    const size = this.props.style.size || 100
    const style = { width: `${size}%`, paddingBottom: `${size}%`, height: '0px' }
    style.transform = `rotate(${this.getWrapperRotation()}deg)`
    style.transition = 'transform 200ms ease-in-out'
    style.transformOrigin = 'center'
    return {
      className: 'react-finite-loader grid',
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
    const { smooth, transitionTime, style, rounded, spacing, gridSize } = this.props
    const { loadedColor, unloadedColor } = style
    const width = 100 / gridSize
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
   * @param {Array} grid Array of arrays rows -> columns
   * @return {Array} Array of React nodes
   */
  getSegments (grid) {
    const rowStyle = { height: 0, paddingBottom: `${100 / grid.length}%` }
    return grid.map((row, rowIndex) => {
      const cols = row.map((col, colIndex) => this.getSegment(`${rowIndex}${colIndex}`, col))
      return (
        <div key={rowIndex} style={rowStyle}>
          {cols}
        </div>
      )
    })
  }

  /**
   * If the pattern specified should alternate then this will reverse alternate
   * rows
   *
   * @param  {Array} grid Array of rows (arrays)
   * @return {Array}      The rearranged grid
   */
  reverseRows (grid) {
    const { pattern } = this.props
    const reversablePatterns = [ 'horizontalAlt', 'verticalAlt' ]
    const isReversable = reversablePatterns.indexOf(pattern) > -1
    return grid.map((row, index) => {
      if (index % 2 !== 0 && isReversable) row.reverse()
      return row
    })
  }

  /**
   * Get a grid of correct size filled with `false`
   *
   * @return {Array} Array of rows (arrays)
   */
  getEmptyGrid () {
    const { gridSize } = this.props
    return Array(gridSize).fill(Array(gridSize).fill(false)).map((row) => row.slice())
  }

  /**
   * Get the amount of filled segments for the grid
   *
   * @return {int}
   */
  getFilled () {
    const { gridSize, progress } = this.props
    return Math.floor((gridSize * gridSize) / 100 * progress)
  }

  /**
   * Get the grid for the correct pattern
   *
   * @return {Array} Array of rows (arrays)
   */
  getGrid () {
    const { pattern } = this.props
    switch (pattern) {
      case 'horizontal':
      case 'horizontalAlt':
      case 'vertical':
      case 'verticalAlt':
        return this.getGridForLinear()
      case 'spiral':
        return this.getGridForSpiral()
    }
  }

  /**
   * Build the grid for linear patterns
   *
   * @return {Array} Array of rows (arrays)
   */
  getGridForLinear () {
    const { reverse } = this.props
    let grid = this.getEmptyGrid()
    let filled = this.getFilled()
    let row = 0
    let col = 0
    grid = this.reverseRows(grid)
    while (filled > 0) {
      if (grid[row][col] === undefined) {
        row++
        col = 0
      }

      grid[row][col] = true
      col++
      filled--
    }

    grid = this.reverseRows(grid)
    if (reverse) grid.reverse()
    return grid
  }

  /**
   * Calculate the ordering of positions to be filled for a spiral pattern
   * e.g. for a 3x3 grid
   *  [
   *    [ 0, 0 ],
   *    [ 0, 1 ],
   *    [ 0, 2 ],
   *    [ 1, 2 ],
   *    [ 2, 2 ],
   *    [ 2, 1 ],
   *    [ 2, 0 ],
   *    [ 1, 0 ],
   *    [ 1, 1 ]
   *  ]
   *
   * @return {Array} Array of co-oridinates (arrays)
   */
  getPositionsForSpiral () {
    const { gridSize, reverse } = this.props
    const squares = gridSize * gridSize
    const positions = []
    let xRange = [ 0, gridSize - 1 ]
    let yRange = [ 0, gridSize - 1 ]
    let x = xRange[0]
    let y = yRange[0]
    while (positions.length < squares) {
      positions.push([ x, y ])
      if (y + 1 > yRange[1]) {
        if (x + 1 > xRange[1]) {
          y--
        } else {
          x++
        }
      } else if (x + 1 > xRange[1]) {
        if (y - 1 < yRange[0]) {
          x--
        } else {
          y--
        }
      } else {
        if (x === xRange[0]) {
          y++
        } else if (x - 1 === xRange[0]) {
          xRange = [ xRange[0] + 1, xRange[1] - 1 ]
          yRange = [ yRange[0] + 1, yRange[1] - 1 ]
          x = xRange[0]
          y = yRange[0]
        } else {
          x--
        }
      }
    }

    if (reverse) positions.reverse()
    return positions
  }

  /**
   * Build the grid for spiral patterns
   *
   * @return {Array} Array of rows (arrays)
   */
  getGridForSpiral () {
    const positions = this.getPositionsForSpiral()
    let grid = this.getEmptyGrid()
    let filled = this.getFilled()
    let index = 0
    while (filled > 0) {
      grid[positions[index][0]][positions[index][1]] = true
      filled--
      index++
    }

    return grid
  }

  /**
   * Render the loader bar with appropriate styling
   *
   * @return {React Node}
   */
  render () {
    return (
      <div {...this.getWrapperProps()}>
        {this.getSegments(this.getGrid())}
      </div>
    )
  }
}

Grid.propTypes = {
  progress: PropTypes.number,
  gridSize: PropTypes.number,
  smooth: PropTypes.bool,
  rounded: PropTypes.bool,
  transitionTime: PropTypes.number,
  spacing: PropTypes.string,
  pattern: PropTypes.oneOf([ 'horizontal', 'horizontalAlt', 'spiral', 'vertical', 'verticalAlt' ]),
  spin: PropTypes.bool,
  reverseSpin: PropTypes.bool,
  reverse: PropTypes.bool,
  style: PropTypes.shape({
    loadedColor: PropTypes.string,
    unloadedColor: PropTypes.string,
    size: PropTypes.number
  })
}

Grid.defaultProps = {
  gridSize: 6,
  smooth: true,
  rounded: false,
  spin: false,
  reverseSpin: false,
  reverse: false,
  spacing: '0px',
  transitionTime: 200,
  pattern: 'vertical',
  style: {}
}
