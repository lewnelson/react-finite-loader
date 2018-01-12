'use strict'

import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { Donut } from '../../src/loaderTypes/Donut'

const sandbox = sinon.sandbox.create()
describe('<Donut />', () => {
  const progress = 10
  const value = 100
  const finish = 1000
  let wrapper, instance
  function getWrapper (overrideProps) {
    const props = Object.assign({ progress, value, finish }, overrideProps)
    return shallow(<Donut {...props} />)
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

  it('renders the wrapper with the donut class', () => {
    expect(wrapper.hasClass('donut')).to.be.true()
  })

  it('renders the wrapper with the correct style object', () => {
    expect(wrapper.prop('style')).to.deep.equal({
      width: '1em',
      height: '1em',
      position: 'relative',
      fontSize: '10em'
    })
  })

  context('when style.scale is provided', () => {
    const scale = 4
    beforeEach(() => {
      wrapper = getWrapper({ style: { scale } })
    })

    it('renders the wrapper with the correct scale', () => {
      expect(wrapper.prop('style').fontSize).to.equal(`${scale}em`)
    })
  })

  it('renders the label node', () => {
    expect(wrapper.childAt(0).type()).to.equal('label')
  })

  it('renders the loaded node', () => {
    expect(wrapper.childAt(1).hasClass('loaded')).to.be.true()
  })

  it('renders the unloaded node', () => {
    expect(wrapper.childAt(2).hasClass('unloaded')).to.be.true()
  })

  it('renders the middle node', () => {
    expect(wrapper.childAt(3).hasClass('middle')).to.be.true()
  })

  describe('getLabel', () => {
    let label
    function getLabel (instance) {
      return shallow(instance.getLabel())
    }

    function setup (props) {
      wrapper = getWrapper(props)
      instance = getInstance(wrapper)
      label = getLabel(instance)
    }

    beforeEach(() => {
      label = getLabel(instance)
    })

    it('renders the label with the correct style prop', () => {
      expect(label.prop('style')).to.deep.equal({
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        zIndex: 2,
        fontSize: '0.25em',
        color: undefined
      })
    })

    context('when labelAsPercentage is true', () => {
      const labelAsPercentage = true
      beforeEach(() => {
        setup({ labelAsPercentage })
      })

      it('renders the percentage value', () => {
        expect(label.text()).to.equal(`${progress}%`)
      })

      it('renders the % symbol in a span.percentage node', () => {
        expect(label.find('span.percentage').length).to.equal(1)
        expect(label.find('span.percentage').text()).to.equal('%')
      })
    })

    context('when labelAsPercentage is false', () => {
      const labelAsPercentage = false
      beforeEach(() => {
        setup({ labelAsPercentage })
      })

      it('renders the text as `value / finish`', () => {
        expect(label.text()).to.equal(`${value} / ${finish}`)
      })
    })

    context('when style.labelFontSize is provided', () => {
      const labelFontSize = '0.5em'
      beforeEach(() => {
        setup({ style: { labelFontSize } })
      })

      it('renders the label with the fontSize equal to labelFontSize', () => {
        expect(label.prop('style').fontSize).to.equal(labelFontSize)
      })
    })

    context('when style.labelColor is provided', () => {
      const labelColor = '#000000'
      beforeEach(() => {
        setup({ style: { labelColor } })
      })

      it('renders the label with the color equal to labelColor', () => {
        expect(label.prop('style').color).to.equal(labelColor)
      })
    })
  })

  describe('getCommonHalfStyle', () => {
    let commonHalfStyle
    function getCommonHalfStyle (instance) {
      return instance.getCommonHalfStyle()
    }

    function setup (props) {
      wrapper = getWrapper(props)
      instance = getInstance(wrapper)
      commonHalfStyle = getCommonHalfStyle(instance)
    }

    beforeEach(() => {
      commonHalfStyle = getCommonHalfStyle(instance)
    })

    it('returns the correct style object', () => {
      expect(commonHalfStyle).to.deep.equal({
        width: '100%',
        height: '100%',
        clip: 'rect(0, 0.5em, 1em, 0)',
        borderRadius: '50%',
        position: 'absolute',
        top: 0,
        left: 0,
        borderWidth: '0.1em',
        borderStyle: 'solid',
        borderColor: undefined
      })
    })

    context('when a thickness is provided', () => {
      const thickness = 0.4
      beforeEach(() => {
        setup({ thickness })
      })

      it('returns a borderWidth of thickness / 2', () => {
        expect(commonHalfStyle.borderWidth).to.equal(`${thickness / 2}em`)
      })
    })

    context('when style.loadedColor is provided', () => {
      const loadedColor = '#000'
      beforeEach(() => {
        setup({ style: { loadedColor } })
      })

      it('returns a borderColor of loadedColor', () => {
        expect(commonHalfStyle.borderColor).to.equal(loadedColor)
      })
    })
  })

  describe('getLoadedLeftHalf', () => {
    let loadedLeftHalf
    function getLoadedLeftHalf (instance) {
      return shallow(instance.getLoadedLeftHalf())
    }

    function setup (props) {
      wrapper = getWrapper(props)
      instance = getInstance(wrapper)
      loadedLeftHalf = getLoadedLeftHalf(instance)
    }

    beforeEach(() => {
      loadedLeftHalf = getLoadedLeftHalf(instance)
    })

    it('has a class of left-half', () => {
      expect(loadedLeftHalf.hasClass('left-half')).to.be.true()
    })

    context('when progress is less than or equal to 50', () => {
      const progress = 50
      beforeEach(() => {
        setup({ progress })
      })

      it('has a transform style of undefined', () => {
        expect(loadedLeftHalf.prop('style').transform).to.be.undefined()
      })

      it('has display none style', () => {
        expect(loadedLeftHalf.prop('style').display).to.equal('none')
      })
    })

    context('when progress is greater than 50', () => {
      const progress = 51
      beforeEach(() => {
        setup({ progress })
      })

      it('has a transform style with the calculated rotation', () => {
        const rotation = 360 / 100 * progress
        expect(loadedLeftHalf.prop('style').transform).to.equal(`rotate(${rotation}deg)`)
      })

      it('has a display style of undefined', () => {
        expect(loadedLeftHalf.prop('style').display).to.be.undefined()
      })
    })
  })

  describe('getLoadedRightHalf', () => {
    let loadedRightHalf
    function getLoadedRightHalf (instance) {
      return shallow(instance.getLoadedRightHalf())
    }

    function setup (props) {
      wrapper = getWrapper(props)
      instance = getInstance(wrapper)
      loadedRightHalf = getLoadedRightHalf(instance)
    }

    beforeEach(() => {
      loadedRightHalf = getLoadedRightHalf(instance)
    })

    it('has a class of right-half', () => {
      expect(loadedRightHalf.hasClass('right-half')).to.be.true()
    })

    context('when progress is less than or equal to 50', () => {
      const progress = 50
      beforeEach(() => {
        setup({ progress })
      })

      it('has a transform style with the calculated rotation', () => {
        const rotation = 360 / 100 * progress
        expect(loadedRightHalf.prop('style').transform).to.equal(`rotate(${rotation}deg)`)
      })
    })

    context('when progress is greater than 50', () => {
      const progress = 51
      beforeEach(() => {
        setup({ progress })
      })

      it('has a transform style with a rotation of 180deg', () => {
        expect(loadedRightHalf.prop('style').transform).to.equal('rotate(180deg)')
      })
    })
  })

  describe('getLoaded', () => {
    let loaded
    function getLoaded (instance) {
      return shallow(instance.getLoaded())
    }

    function setup (props) {
      wrapper = getWrapper(props)
      instance = getInstance(wrapper)
      loaded = getLoaded(instance)
    }

    beforeEach(() => {
      loaded = getLoaded(instance)
    })

    it('renders the node with the loaded class', () => {
      expect(loaded.hasClass('loaded')).to.be.true()
    })

    it('renders the left half', () => {
      expect(loaded.childAt(0).hasClass('left-half')).to.be.true()
    })

    it('renders the right half', () => {
      expect(loaded.childAt(1).hasClass('right-half')).to.be.true()
    })

    it('renders the correct style', () => {
      expect(loaded.prop('style')).to.deep.equal({
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        clip: 'rect(0, 1em, 1em, 0.5em)',
        zIndex: 1
      })
    })

    context('when progress is less than or equal to 50', () => {
      const progress = 50
      beforeEach(() => {
        setup({ progress })
      })

      it('renders the clip style as rect(0, 1em, 1em, 0.5em)', () => {
        expect(loaded.prop('style').clip).to.equal('rect(0, 1em, 1em, 0.5em)')
      })
    })

    context('when progress is greater than 50', () => {
      const progress = 51
      beforeEach(() => {
        setup({ progress })
      })

      it('renders the clip style as rect(auto, auto, auto, auto)', () => {
        expect(loaded.prop('style').clip).to.equal('rect(auto, auto, auto, auto)')
      })
    })
  })

  describe('getUnloaded', () => {
    let unloaded
    function getUnloaded (instance) {
      return shallow(instance.getUnloaded())
    }

    function setup (props) {
      wrapper = getWrapper(props)
      instance = getInstance(wrapper)
      unloaded = getUnloaded(instance)
    }

    beforeEach(() => {
      unloaded = getUnloaded(instance)
    })

    it('renders with the class unloaded', () => {
      expect(unloaded.hasClass('unloaded')).to.be.true()
    })

    it('renders the correct style prop', () => {
      expect(unloaded.prop('style')).to.deep.equal({
        borderRadius: '50%',
        borderWidth: '0.1em',
        borderStyle: 'solid',
        borderColor: undefined,
        width: '100%',
        height: '100%',
        position: 'absolute'
      })
    })

    context('when thickness is defined', () => {
      const thickness = 0.8
      beforeEach(() => {
        setup({ thickness })
      })

      it('renders the border width as half the thickness', () => {
        expect(unloaded.prop('style').borderWidth).to.equal(`${thickness / 2}em`)
      })
    })

    context('when style.unloadedColor is defined', () => {
      const unloadedColor = '#ffffff'
      beforeEach(() => {
        setup({ style: { unloadedColor } })
      })

      it('renders the border color as half the unloadedColor value', () => {
        expect(unloaded.prop('style').borderColor).to.equal(unloadedColor)
      })
    })
  })

  describe('getMiddle', () => {
    let middle
    function getMiddle (instance) {
      return shallow(instance.getMiddle())
    }

    function setup (props) {
      wrapper = getWrapper(props)
      instance = getInstance(wrapper)
      middle = getMiddle(instance)
    }

    beforeEach(() => {
      middle = getMiddle(instance)
    })

    it('renders with the middle class', () => {
      expect(middle.hasClass('middle')).to.be.true()
    })

    it('renders with the correct style', () => {
      expect(middle.prop('style')).to.deep.equal({
        backgroundColor: undefined,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'calc(100% - 0.2em)',
        height: 'calc(100% - 0.2em)',
        borderRadius: '50%'
      })
    })

    context('when thickness is defined', () => {
      const thickness = 0.6
      beforeEach(() => {
        setup({ thickness })
      })

      it('renders the calculated width using the thickness', () => {
        expect(middle.prop('style').width).to.equal(`calc(100% - ${thickness}em)`)
      })

      it('renders the calculated height using the thickness', () => {
        expect(middle.prop('style').height).to.equal(`calc(100% - ${thickness}em)`)
      })
    })

    context('when style.middleColor is defined', () => {
      const middleColor = '#ffffff'
      beforeEach(() => {
        setup({ style: { middleColor } })
      })

      it('renders the backgroundColor as middleColor', () => {
        expect(middle.prop('style').backgroundColor).to.equal(middleColor)
      })
    })
  })
})
