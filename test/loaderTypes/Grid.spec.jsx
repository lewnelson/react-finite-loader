'use strict'

import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { Grid } from '../../src/loaderTypes/Grid'
import BlockSegment from '../../src/components/BlockSegment'

const sandbox = sinon.sandbox.create()
const spiralPositions = {
  1: [[ 0, 0 ]],
  2: [
    [ 0, 0 ],
    [ 0, 1 ],
    [ 1, 1 ],
    [ 1, 0 ]
  ],
  3: [
    [ 0, 0 ],
    [ 0, 1 ],
    [ 0, 2 ],
    [ 1, 2 ],
    [ 2, 2 ],
    [ 2, 1 ],
    [ 2, 0 ],
    [ 1, 0 ],
    [ 1, 1 ]
  ]
}

describe('<Grid />', () => {
  const progress = 0
  let wrapper, instance
  function getWrapper (overrideProps) {
    const props = Object.assign({ progress }, overrideProps)
    return shallow(<Grid {...props} />)
  }

  function getInstance (wrapper) {
    return wrapper.instance()
  }

  beforeEach(() => {
    wrapper = getWrapper()
    instance = getInstance(wrapper)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('renders the wrapper with the react-finite-loader class', () => {
    expect(wrapper.hasClass('react-finite-loader')).to.be.true()
  })

  it('renders the wrapper with the grid class', () => {
    expect(wrapper.hasClass('grid')).to.be.true()
  })

  it('renders the wrapper with the correct style prop', () => {
    expect(wrapper.prop('style')).to.deep.equal({
      width: '100%',
      paddingBottom: '100%',
      height: '0px',
      transform: 'rotate(270deg)',
      transition: 'transform 200ms ease-in-out',
      transformOrigin: 'center'
    })
  })

  context('when style.size is defined', () => {
    const size = 50
    beforeEach(() => {
      wrapper = getWrapper({ style: { size } })
    })

    it(`renders the wrappers style.width as ${size}%`, () => {
      expect(wrapper.prop('style').width).to.equal(`${size}%`)
    })

    it(`renders the wrappers style.paddingBottom as ${size}%`, () => {
      expect(wrapper.prop('style').paddingBottom).to.equal(`${size}%`)
    })
  })

  it('renders 6 rows', () => {
    expect(wrapper.children().length).to.equal(6)
    wrapper.children().forEach((row, index) => {
      expect(row.key()).to.equal(`${index}`)
      expect(row.prop('style')).to.deep.equal({
        height: 0,
        paddingBottom: `${100 / 6}%`
      })
    })
  })

  it('renders 6 segments per row', () => {
    wrapper.children().forEach((row, rowIndex) => {
      row.children().forEach((segment, colIndex) => {
        expect(segment.type()).to.equal(BlockSegment)
        expect(segment.key()).to.equal(`${rowIndex}${colIndex}`)
      })
    })
  })

  describe('getSpiralRotations', () => {
    let rotations
    function getSpiralRotations (instance) {
      return instance.getSpiralRotations()
    }

    function setup (props) {
      wrapper = getWrapper(props)
      instance = getInstance(wrapper)
      rotations = getSpiralRotations(instance)
    }

    context('when gridSize is 3', () => {
      const gridSize = 3
      context('when progress is 0', () => {
        const progress = 0
        beforeEach(() => {
          setup({ gridSize, progress })
        })

        it('has 0 rotations', () => {
          expect(rotations).to.equal(0)
        })
      })

      context('when progress is 35', () => {
        const progress = 35
        beforeEach(() => {
          setup({ gridSize, progress })
        })

        it('has 1 rotation', () => {
          expect(rotations).to.equal(1)
        })
      })

      context('when progress is 80', () => {
        const progress = 80
        beforeEach(() => {
          setup({ gridSize, progress })
        })

        it('has 3 rotations', () => {
          expect(rotations).to.equal(3)
        })
      })

      context('when progress is 100', () => {
        const progress = 100
        beforeEach(() => {
          setup({ gridSize, progress })
        })

        it('has 4 rotations', () => {
          expect(rotations).to.equal(4)
        })
      })
    })

    context('when gridSize is 2', () => {
      const gridSize = 2
      context('when progress is 0', () => {
        const progress = 0
        beforeEach(() => {
          setup({ gridSize, progress })
        })

        it('has 0 rotations', () => {
          expect(rotations).to.equal(0)
        })
      })

      context('when progress is 48', () => {
        const progress = 48
        beforeEach(() => {
          setup({ gridSize, progress })
        })

        it('has 0 rotations', () => {
          expect(rotations).to.equal(0)
        })
      })

      context('when progress is 50', () => {
        const progress = 50
        beforeEach(() => {
          setup({ gridSize, progress })
        })

        it('has 1 rotation', () => {
          expect(rotations).to.equal(1)
        })
      })

      context('when progress is 100', () => {
        const progress = 100
        beforeEach(() => {
          setup({ gridSize, progress })
        })

        it('has 2 rotations', () => {
          expect(rotations).to.equal(2)
        })
      })
    })
  })

  describe('getWrapperRotation', () => {
    let rotation
    function getWrapperRotation (instance) {
      return instance.getWrapperRotation()
    }

    function setup (props) {
      wrapper = getWrapper(props)
      instance = getInstance(wrapper)
      rotation = getWrapperRotation(instance)
    }

    context('when gridSize is 3', () => {
      const gridSize = 3
      context('when the pattern is horizontal', () => {
        const pattern = 'horizontal'
        context('when progress is 50', () => {
          const progress = 50
          context('when spin is false', () => {
            const spin = false
            beforeEach(() => {
              setup({ gridSize, progress, spin, pattern })
            })

            it('returns a rotation of 0', () => {
              expect(rotation).to.equal(0)
            })
          })

          context('when spin is true', () => {
            const spin = true
            beforeEach(() => {
              setup({ gridSize, progress, spin, pattern })
            })

            it('returns a rotation of 90', () => {
              expect(rotation).to.equal(90)
            })

            context('when reverse is true', () => {
              const reverse = true
              beforeEach(() => {
                setup({ gridSize, progress, spin, pattern, reverse })
              })

              it('returns a rotation of -90', () => {
                expect(rotation).to.equal(-90)
              })

              context('when reverseSpin is true', () => {
                const reverseSpin = true
                beforeEach(() => {
                  setup({ gridSize, progress, spin, pattern, reverse, reverseSpin })
                })

                it('returns a rotation of 90', () => {
                  expect(rotation).to.equal(90)
                })
              })
            })

            context('when reverseSpin is true', () => {
              const reverseSpin = true
              beforeEach(() => {
                setup({ gridSize, progress, spin, pattern, reverseSpin })
              })

              it('returns a rotation of -90', () => {
                expect(rotation).to.equal(-90)
              })
            })
          })
        })
      })

      context('when the pattern is vertical', () => {
        const pattern = 'vertical'
        context('when progress is 50', () => {
          const progress = 50
          context('when spin is false', () => {
            const spin = false
            beforeEach(() => {
              setup({ gridSize, progress, spin, pattern })
            })

            it('returns a rotation of 270', () => {
              expect(rotation).to.equal(270)
            })
          })

          context('when spin is true', () => {
            const spin = true
            beforeEach(() => {
              setup({ gridSize, progress, spin, pattern })
            })

            it('returns a rotation of 360', () => {
              expect(rotation).to.equal(360)
            })
          })
        })
      })

      context('when the pattern is spiral', () => {
        const pattern = 'spiral'
        context('when progress is 75', () => {
          const progress = 75
          context('when spin is true', () => {
            const spin = true
            beforeEach(() => {
              setup({ gridSize, progress, spin, pattern })
            })

            it('returns a rotation of 180', () => {
              expect(rotation).to.equal(180)
            })
          })
        })
      })
    })
  })

  describe('getSegment', () => {
    let blockSegment
    function getBlockSegment (instance, loaded, key) {
      key = key || '0'
      loaded = loaded || false
      return instance.getSegment(key, loaded)
    }

    beforeEach(() => {
      instance = getInstance(wrapper)
      blockSegment = getBlockSegment(instance)
    })

    it('returns a BlockSegment component', () => {
      expect(blockSegment.type).to.equal(BlockSegment)
    })

    it('returns a BlockSegment with the correct props', () => {
      expect(blockSegment.props).to.deep.equal({
        smooth: true,
        transitionTime: 200,
        rounded: false,
        spacing: '0px',
        loadedColor: undefined,
        unloadedColor: undefined,
        width: 100 / 6,
        loaded: false
      })
    })

    it('renders the block segment with a key of 0', () => {
      expect(blockSegment.key).to.equal('0')
    })

    context('when the grid size is 5', () => {
      beforeEach(() => {
        instance = getInstance(getWrapper({ gridSize: 5 }))
        blockSegment = getBlockSegment(instance)
      })

      it('renders the block segment with a width of 20', () => {
        expect(blockSegment.props.width).to.equal(20)
      })
    })

    context('when loaded is true', () => {
      beforeEach(() => {
        blockSegment = getBlockSegment(instance, true)
      })

      it('renders the block segment with the loaded prop as true', () => {
        expect(blockSegment.props.loaded).to.be.true()
      })
    })

    context('when smooth is true', () => {
      beforeEach(() => {
        instance = getInstance(getWrapper({ smooth: true }))
        blockSegment = getBlockSegment(instance)
      })

      it('renders the block segment with the smooth prop as true', () => {
        expect(blockSegment.props.smooth).to.be.true()
      })
    })

    context('when rounded is true', () => {
      beforeEach(() => {
        instance = getInstance(getWrapper({ rounded: true }))
        blockSegment = getBlockSegment(instance)
      })

      it('renders the block segment with the rounded prop as true', () => {
        expect(blockSegment.props.rounded).to.be.true()
      })
    })

    context('when transitionTime is provided', () => {
      const transitionTime = 10
      beforeEach(() => {
        instance = getInstance(getWrapper({ transitionTime }))
        blockSegment = getBlockSegment(instance)
      })

      it('renders the block segment with the transitionTime prop equal to transitionTime', () => {
        expect(blockSegment.props.transitionTime).to.equal(transitionTime)
      })
    })

    context('when spacing is provided', () => {
      const spacing = '10px'
      beforeEach(() => {
        instance = getInstance(getWrapper({ spacing }))
        blockSegment = getBlockSegment(instance)
      })

      it('renders the block segment with the spacing prop equal to spacing', () => {
        expect(blockSegment.props.spacing).to.equal(spacing)
      })
    })

    context('when style.loadedColor is provided', () => {
      const loadedColor = '#000000'
      beforeEach(() => {
        instance = getInstance(getWrapper({ style: { loadedColor } }))
        blockSegment = getBlockSegment(instance)
      })

      it('renders the block segment with the loadedColor prop equal to loadedColor', () => {
        expect(blockSegment.props.loadedColor).to.equal(loadedColor)
      })
    })

    context('when style.unloadedColor is provided', () => {
      const unloadedColor = '#000000'
      beforeEach(() => {
        instance = getInstance(getWrapper({ style: { unloadedColor } }))
        blockSegment = getBlockSegment(instance)
      })

      it('renders the block segment with the unloadedColor prop equal to unloadedColor', () => {
        expect(blockSegment.props.unloadedColor).to.equal(unloadedColor)
      })
    })
  })

  describe('reverseRows', () => {
    const grid = [
      [ true, true, true, false ],
      [ true, false, false, false ],
      [ false, false, false, true ],
      [ false, true, false, false ]
    ]

    const expectedReversedGrid = [
      [ true, true, true, false ],
      [ false, false, false, true ],
      [ false, false, false, true ],
      [ false, false, true, false ]
    ]

    let reversedGrid
    function reverseRows (instance) {
      const gridClone = grid.slice().map((row) => row.slice())
      return instance.reverseRows(gridClone)
    }

    function setup (props) {
      wrapper = getWrapper(props)
      instance = getInstance(wrapper)
      reversedGrid = reverseRows(instance)
    }

    const patternsReversed = {
      verticalAlt: true,
      horizontalAlt: true,
      horizontal: false,
      vertical: false,
      spiral: false
    }

    function testForPattern (pattern) {
      context(`when pattern is ${pattern}`, () => {
        beforeEach(() => {
          setup({ pattern })
        })

        const statement = patternsReversed[pattern]
          ? 'does reverse the grid'
          : 'does not reverse the grid'

        it(statement, () => {
          const expectedGrid = patternsReversed[pattern] ? expectedReversedGrid : grid
          expect(reversedGrid).to.deep.equal(expectedGrid)
        })
      })
    }

    Object.keys(patternsReversed).map((key) => {
      testForPattern(key)
    })
  })

  describe('getEmptyGrid', () => {
    let emptyGrid
    function getEmptyGrid (instance) {
      return instance.getEmptyGrid()
    }

    function setup (props) {
      wrapper = getWrapper(props)
      instance = getInstance(wrapper)
      emptyGrid = getEmptyGrid(instance)
    }

    function testForGridSize (gridSize) {
      context(`when gridSize is ${gridSize}`, () => {
        beforeEach(() => {
          setup({ gridSize })
        })

        it(`returns a ${gridSize}x${gridSize} grid filled with false values`, () => {
          expect(emptyGrid.length).to.equal(gridSize)
          emptyGrid.map((row) => {
            expect(row.length).to.equal(gridSize)
            row.forEach((val) => {
              expect(val).to.be.false()
            })
          })
        })
      })
    }

    [ 3, 8, 40 ].forEach((gridSize) => {
      testForGridSize(gridSize)
    })
  })

  describe('getFilled', () => {
    let filled
    function getFilled (instance) {
      return instance.getFilled()
    }

    function setup (props) {
      wrapper = getWrapper(props)
      instance = getInstance(wrapper)
      filled = getFilled(instance)
    }

    function testForGridSize (gridSize) {
      context(`when gridSize is ${gridSize}`, () => {
        function testForProgress (progress) {
          context(`when progress is ${progress}`, () => {
            beforeEach(() => {
              setup({ gridSize, progress })
            })

            const expectedFilled = Math.floor(((gridSize * gridSize) / 100) * progress)
            it(`returns ${expectedFilled}`, () => {
              expect(filled).to.equal(expectedFilled)
            })
          })
        }

        [ 0, 20, 40, 60, 80, 100 ].forEach((progress) => {
          testForProgress(progress)
        })
      })
    }

    [ 3, 8, 40 ].forEach((gridSize) => {
      testForGridSize(gridSize)
    })
  })

  describe('getGrid', () => {
    let grid
    const linearGrid = []
    const spiralGrid = []
    function getGrid (instance) {
      return instance.getGrid()
    }

    function setup (props) {
      wrapper = getWrapper(props)
      instance = getInstance(wrapper)
      sandbox.stub(instance, 'getGridForLinear').returns(linearGrid)
      sandbox.stub(instance, 'getGridForSpiral').returns(spiralGrid)
      grid = getGrid(instance)
    }

    const patternGrids = {
      horizontal: linearGrid,
      horizontalAlt: linearGrid,
      vertical: linearGrid,
      verticalAlt: linearGrid,
      spiral: spiralGrid
    }

    function testForPattern (pattern, expectedGrid) {
      context(`for pattern ${pattern}`, () => {
        beforeEach(() => {
          setup({ pattern })
        })

        let statement
        if (expectedGrid === linearGrid) {
          statement = 'returns the value from getGridForLinear'
        } else if (expectedGrid === spiralGrid) {
          statement = 'returns the value from getGridForSpiral'
        }

        it(statement, () => {
          expect(grid).to.equal(expectedGrid)
        })
      })
    }

    Object.keys(patternGrids).forEach((pattern) => {
      testForPattern(pattern, patternGrids[pattern])
    })
  })

  describe('getGridForLinear', () => {
    let grid
    function getGridForLinear (instance) {
      return instance.getGridForLinear()
    }

    function setup (props) {
      wrapper = getWrapper(props)
      instance = getInstance(wrapper)
      grid = getGridForLinear(instance)
    }

    context('for a gridSize of 3', () => {
      const gridSize = 3
      context('for a progress of 0', () => {
        const expectedGrid = [
          [ false, false, false ],
          [ false, false, false ],
          [ false, false, false ]
        ]

        const progress = 0
        beforeEach(() => {
          setup({ gridSize, progress })
        })

        it('returns the correct grid', () => {
          expect(grid).to.deep.equal(expectedGrid)
        })
      })

      context('for a progress of 50', () => {
        const expectedGrid = [
          [ true, true, true ],
          [ true, false, false ],
          [ false, false, false ]
        ]

        const progress = 50
        beforeEach(() => {
          setup({ gridSize, progress })
        })

        it('returns the correct grid', () => {
          expect(grid).to.deep.equal(expectedGrid)
        })
      })

      context('for a progress of 100', () => {
        const expectedGrid = [
          [ true, true, true ],
          [ true, true, true ],
          [ true, true, true ]
        ]

        const progress = 100
        beforeEach(() => {
          setup({ gridSize, progress })
        })

        it('returns the correct grid', () => {
          expect(grid).to.deep.equal(expectedGrid)
        })
      })
    })
  })

  describe('getPositionsForSpiral', () => {
    let positions
    function getPositionsForSpiral (instance) {
      return instance.getPositionsForSpiral()
    }

    function setup (props) {
      wrapper = getWrapper(props)
      instance = getInstance(wrapper)
      positions = getPositionsForSpiral(instance)
    }

    function testForGridSize (gridSize) {
      context(`when grid size is ${gridSize}`, () => {
        beforeEach(() => {
          setup({ gridSize })
        })

        it('returns the correct positions', () => {
          expect(positions).to.deep.equal(spiralPositions[gridSize])
        })

        context('when reverse is true', () => {
          beforeEach(() => {
            setup({ gridSize, reverse: true })
          })

          it('returns the correct positions reversed', () => {
            const expectedPositions = spiralPositions[gridSize].slice()
            expectedPositions.reverse()
            expect(positions).to.deep.equal(expectedPositions)
          })
        })
      })
    }

    Object.keys(spiralPositions).forEach((gridSize) => {
      testForGridSize(parseInt(gridSize))
    })
  })

  describe('getGridForSpiral', () => {
    let grid
    function getGridForSpiral (instance) {
      return instance.getGridForSpiral()
    }

    function setup (props) {
      wrapper = getWrapper(props)
      instance = getInstance(wrapper)
      grid = getGridForSpiral(instance)
    }

    context('for a gridSize of 3', () => {
      const gridSize = 3
      context('for a progress of 0', () => {
        const expectedGrid = [
          [ false, false, false ],
          [ false, false, false ],
          [ false, false, false ]
        ]

        const progress = 0
        beforeEach(() => {
          setup({ gridSize, progress })
        })

        it('returns the correct grid', () => {
          expect(grid).to.deep.equal(expectedGrid)
        })
      })

      context('for a progress of 50', () => {
        const expectedGrid = [
          [ true, true, true ],
          [ false, false, true ],
          [ false, false, false ]
        ]

        const progress = 50
        beforeEach(() => {
          setup({ gridSize, progress })
        })

        it('returns the correct grid', () => {
          expect(grid).to.deep.equal(expectedGrid)
        })
      })

      context('for a progress of 75', () => {
        const expectedGrid = [
          [ true, true, true ],
          [ false, false, true ],
          [ false, true, true ]
        ]

        const progress = 75
        beforeEach(() => {
          setup({ gridSize, progress })
        })

        it('returns the correct grid', () => {
          expect(grid).to.deep.equal(expectedGrid)
        })
      })

      context('for a progress of 100', () => {
        const expectedGrid = [
          [ true, true, true ],
          [ true, true, true ],
          [ true, true, true ]
        ]

        const progress = 100
        beforeEach(() => {
          setup({ gridSize, progress })
        })

        it('returns the correct grid', () => {
          expect(grid).to.deep.equal(expectedGrid)
        })
      })
    })
  })
})
