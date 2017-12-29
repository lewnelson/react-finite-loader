'use strict'

import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { ReactFiniteLoader } from '../src/ReactFiniteLoader'

describe('<ReactFiniteLoader />', () => {
  let wrapper, value
  beforeEach(() => {
    value = 50
    wrapper = mount(
      <ReactFiniteLoader value={value}>
        <p />
      </ReactFiniteLoader>
    )
  })

  it('renders the loader component with the calculated percentage', () => {
    expect(wrapper.getDOMNode().nodeName.toLowerCase()).to.equal('p')
  })

  it('renders the loader with the progress value', () => {
    expect(wrapper.childAt(0).prop('progress')).to.equal(value)
  })

  context('when a finish value for progress is provided', () => {
    let expectedValue, finishValue
    beforeEach(() => {
      finishValue = 200
      expectedValue = value / 2
      wrapper = mount(
        <ReactFiniteLoader value={value} finish={finishValue}>
          <p />
        </ReactFiniteLoader>
      )
    })

    it('calculates the correct value based on the finish value', () => {
      expect(wrapper.childAt(0).prop('progress')).to.equal(expectedValue)
    })

    context('when a start value for progress is provided', () => {
      let startValue
      beforeEach(() => {
        startValue = value
        expectedValue = 0
        wrapper = mount(
          <ReactFiniteLoader value={value} finish={finishValue} start={startValue}>
            <p />
          </ReactFiniteLoader>
        )
      })

      it('calculates the correct value based on the start and finish value', () => {
        expect(wrapper.childAt(0).prop('progress')).to.equal(expectedValue)
      })
    })
  })
})
