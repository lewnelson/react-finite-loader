'use strict'

import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import BlockSegment from '../../src/components/BlockSegment'

describe('<BlockSegment />', () => {
  const width = 5
  let wrapper
  function getWrapper (overrideProps) {
    const props = Object.assign({ width, loaded: false }, overrideProps)
    return shallow(<BlockSegment {...props} />)
  }

  function getFillNode (wrapper) {
    return wrapper.childAt(0)
  }

  beforeEach(() => {
    wrapper = getWrapper()
  })

  it('renders the wrapper node with the segment class', () => {
    expect(wrapper.hasClass('segment')).to.be.true()
  })

  it('renders the wrapper with the correct styling', () => {
    expect(wrapper.prop('style')).to.deep.equal({
      width: `${width}%`,
      padding: undefined,
      boxSizing: 'border-box',
      display: 'inline-block'
    })
  })

  it('renders the fill node', () => {
    expect(getFillNode(wrapper).hasClass('fill')).to.be.true()
  })

  it('renders the fill node with the correct styling', () => {
    expect(getFillNode(wrapper).prop('style')).to.deep.equal({
      width: '100%',
      paddingBottom: '100%'
    })
  })

  context('when loaded', () => {
    const loaded = true
    beforeEach(() => {
      wrapper = getWrapper({ loaded })
    })

    it('renders the wrapper node with the loaded class', () => {
      expect(wrapper.hasClass('loaded')).to.be.true()
    })

    context('when loadedColor is provided', () => {
      const loadedColor = '#ffffff'
      beforeEach(() => {
        wrapper = getWrapper({ loaded, loadedColor })
      })

      it('renders the fill node with the background color of loadedColor', () => {
        expect(getFillNode(wrapper).prop('style').backgroundColor).to.equal(loadedColor)
      })
    })
  })

  context('when not loaded', () => {
    const loaded = false
    beforeEach(() => {
      wrapper = getWrapper({ loaded })
    })

    it('renders the wrapper node without the loaded class', () => {
      expect(wrapper.hasClass('loaded')).to.be.false()
    })

    context('when unloadedColor is provided', () => {
      const unloadedColor = '#ffffff'
      beforeEach(() => {
        wrapper = getWrapper({ loaded, unloadedColor })
      })

      it('renders the fill node with the background color of unloadedColor', () => {
        expect(getFillNode(wrapper).prop('style').backgroundColor).to.equal(unloadedColor)
      })
    })
  })

  context('when spacing is provided', () => {
    const spacing = '2px'
    beforeEach(() => {
      wrapper = getWrapper({ spacing })
    })

    it('renders the wrapper with padding equal to spacing', () => {
      expect(wrapper.prop('style').padding).to.equal(spacing)
    })
  })

  context('when smooth is true', () => {
    const smooth = true
    beforeEach(() => {
      wrapper = getWrapper({ smooth })
    })

    it('renders the fill node with the default transition time', () => {
      expect(getFillNode(wrapper).prop('style').transition).to.equal('background-color 200ms ease-in-out')
    })

    context('when transitionTime is provided', () => {
      const transitionTime = 50
      beforeEach(() => {
        wrapper = getWrapper({ smooth, transitionTime })
      })

      it('renders the fill node with the default transition time', () => {
        const expectedTransition = `background-color ${transitionTime}ms ease-in-out`
        expect(getFillNode(wrapper).prop('style').transition).to.equal(expectedTransition)
      })
    })
  })

  context('when rounded is true', () => {
    const rounded = true
    beforeEach(() => {
      wrapper = getWrapper({ rounded })
    })

    it('renders the fill node with a 50% border radius', () => {
      expect(getFillNode(wrapper).prop('style').borderRadius).to.equal('50%')
    })
  })
})
