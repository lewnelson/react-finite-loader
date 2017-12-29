'use strict'

import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { Bar } from '../../src/loaderTypes/Bar'

describe('<Bar />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Bar />)
  })

  it('renders the wrapper with the `react-finite-loader` class', () => {
    expect(wrapper.hasClass('react-finite-loader')).to.be.true()
  })

  it('renders the wrapper with the `bar` class', () => {
    expect(wrapper.hasClass('bar')).to.be.true()
  })

  it('renders the loader with the `loaded` class', () => {
    expect(wrapper.childAt(0).hasClass('loaded')).to.be.true()
  })

  context('when style is defined', () => {
    let style
    beforeEach(() => {
      style = {}
    })

    context('when unloadedColor is defined', () => {
      beforeEach(() => {
        style.unloadedColor = '#ffffff'
        wrapper = shallow(<Bar style={style} />)
      })

      it('adds the background color to the wrapper with the unloadedColor value', () => {
        expect(wrapper.prop('style').backgroundColor).to.equal(style.unloadedColor)
      })
    })

    context('when loadedColor is defined', () => {
      beforeEach(() => {
        style.loadedColor = '#000000'
        wrapper = shallow(<Bar style={style} />)
      })

      it('adds the background color to the loader with the loadedColor value', () => {
        expect(wrapper.childAt(0).prop('style').backgroundColor).to.equal(style.loadedColor)
      })
    })

    context('when width is defined', () => {
      beforeEach(() => {
        style.width = '50%'
        wrapper = shallow(<Bar style={style} />)
      })

      it('adds the width style to the wrapper with the width value', () => {
        expect(wrapper.prop('style').width).to.equal(style.width)
      })
    })

    context('when height is defined', () => {
      beforeEach(() => {
        style.height = '100px'
        wrapper = shallow(<Bar style={style} />)
      })

      it('adds the height style to the wrapper with the height value', () => {
        expect(wrapper.prop('style').height).to.equal(style.height)
      })
    })
  })

  context('when progress is defined', () => {
    let progress
    beforeEach(() => {
      progress = 30
      wrapper = shallow(<Bar progress={progress} />)
    })

    it('sets the width of the loader to the progress as a percentage', () => {
      expect(wrapper.childAt(0).prop('style').width).to.equal(`${progress}%`)
    })
  })

  context('when smooth is true', () => {
    beforeEach(() => {
      wrapper = shallow(<Bar smooth />)
    })

    it('sets the transition style on the loader', () => {
      expect(wrapper.childAt(0).prop('style').transition).to.equal('width 200ms ease-out')
    })

    context('when transitionTime is defined', () => {
      let transitionTime
      beforeEach(() => {
        transitionTime = 300
        wrapper = shallow(<Bar smooth transitionTime={transitionTime} />)
      })

      it('sets the transition style with the transition time on the loader', () => {
        expect(wrapper.childAt(0).prop('style').transition)
          .to.equal(`width ${transitionTime}ms ease-out`)
      })
    })
  })

  context('when smooth is false', () => {
    beforeEach(() => {
      wrapper = shallow(<Bar smooth={false} />)
    })

    it('does not set the transition style on the loader', () => {
      expect(wrapper.childAt(0).prop('style').transition).to.be.undefined()
    })
  })
})
