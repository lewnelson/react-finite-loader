'use strict'

import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { Blocks } from '../../src/loaderTypes/Blocks'
import BlockSegment from '../../src/components/BlockSegment'

const sandbox = sinon.sandbox.create()
describe('<Blocks />', () => {
  let wrapper
  function getWrapper (overrideProps) {
    const props = Object.assign({}, overrideProps)
    return shallow(<Blocks {...props} />)
  }

  beforeEach(() => {
    wrapper = getWrapper()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('renders the wrapper with the react-finite-loader class', () => {
    expect(wrapper.hasClass('react-finite-loader')).to.be.true()
  })

  it('renders the wrapper with the blocks class', () => {
    expect(wrapper.hasClass('blocks')).to.be.true()
  })

  it('renders the wrapper with an empty style object', () => {
    expect(wrapper.prop('style')).to.deep.equal({})
  })

  context('when style.height is defined', () => {
    const height = '5px'
    beforeEach(() => {
      wrapper = getWrapper({ style: { height } })
    })

    it('renders the wrapper with the style.height equal to height', () => {
      expect(wrapper.prop('style').height).to.equal(height)
    })
  })

  context('when style.width is defined', () => {
    const width = '500px'
    beforeEach(() => {
      wrapper = getWrapper({ style: { width } })
    })

    it('renders the wrapper with the style.width equal to width', () => {
      expect(wrapper.prop('style').width).to.equal(width)
    })
  })

  it('renders the correct amount of blockSegments', () => {
    expect(wrapper.children().length).to.equal(20)
  })

  it('renders each block segment with an incrementing key', () => {
    wrapper.children().forEach((segment, index) => {
      expect(segment.type()).to.equal(BlockSegment)
      expect(segment.key()).to.equal(`segment-${index}`)
    })
  })

  describe('getSegments', () => {
    let instance
    function setupInstance (wrapper) {
      const instance = wrapper.instance()
      sandbox.stub(instance, 'getSegment')
      instance.getSegment.withArgs(sinon.match.string, true).returns(true)
      instance.getSegment.withArgs(sinon.match.string, false).returns(false)
      return instance
    }

    beforeEach(() => {
      instance = setupInstance(wrapper)
    })

    context('when progress is 0', () => {
      beforeEach(() => {
        instance = setupInstance(getWrapper({ progress: 0 }))
      })

      it('renders 20 unloaded segments', () => {
        expect(instance.getSegments()).to.deep.equal(new Array(20).fill(false))
      })
    })

    context('when progress is 34', () => {
      beforeEach(() => {
        instance = setupInstance(getWrapper({ progress: 34 }))
      })

      it('renders the 7 loaded and 13 unloaded segments', () => {
        const segments = new Array(7).fill(true).concat(new Array(13).fill(false))
        expect(instance.getSegments()).to.deep.equal(segments)
      })

      context('when there are 100 segments', () => {
        beforeEach(() => {
          instance = setupInstance(getWrapper({ progress: 34, segments: 100 }))
        })

        it('renders the 34 loaded and 66 unloaded segments', () => {
          const segments = new Array(34).fill(true).concat(new Array(66).fill(false))
          expect(instance.getSegments()).to.deep.equal(segments)
        })
      })
    })

    context('when progress is 100', () => {
      beforeEach(() => {
        instance = setupInstance(getWrapper({ progress: 100 }))
      })

      it('renders 20 loaded segments', () => {
        expect(instance.getSegments()).to.deep.equal(new Array(20).fill(true))
      })
    })
  })

  describe('getSegment', () => {
    let instance, blockSegment
    function getInstance (wrapper) {
      return wrapper.instance()
    }

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
        spacing: '2px',
        loadedColor: undefined,
        unloadedColor: undefined,
        width: 5,
        loaded: false
      })
    })

    it('renders the block segment with a key of 0', () => {
      expect(blockSegment.key).to.equal('0')
    })

    context('when there are 5 segments', () => {
      beforeEach(() => {
        instance = getInstance(getWrapper({ segments: 5 }))
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
})
