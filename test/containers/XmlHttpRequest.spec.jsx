'use strict'

import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { XmlHttpRequest } from '../../src/containers/XmlHttpRequest'
import { ReactFiniteLoader } from '../../src/ReactFiniteLoader'
import sinon from 'sinon'

const sandbox = sinon.sandbox.create()
describe('<XmlHttpRequest />', () => {
  let wrapper, xmlHttpRequest, instance
  beforeEach(() => {
    xmlHttpRequest = {
      addEventListener: sandbox.stub()
    }

    wrapper = mount(
      <XmlHttpRequest xmlHttpRequest={xmlHttpRequest}>
        <p />
      </XmlHttpRequest>
    )

    instance = wrapper.instance()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('renders a <ReactFiniteLoader /> component', () => {
    expect(wrapper.childAt(0).type()).to.equal(ReactFiniteLoader)
  })

  it('sets the initial value on the <ReactFiniteLoader /> component', () => {
    expect(wrapper.childAt(0).prop('value')).to.equal(0)
  })

  it('sets the initial start on the <ReactFiniteLoader /> component', () => {
    expect(wrapper.childAt(0).prop('start')).to.equal(0)
  })

  it('sets the initial finish on the <ReactFiniteLoader /> component', () => {
    expect(wrapper.childAt(0).prop('finish')).to.equal(100)
  })

  context('when mounted', () => {
    it('attaches the progress event listener to the XMLHttpRequest', () => {
      expect(xmlHttpRequest.addEventListener)
        .to.have.been.calledWith('progress', instance.updateProgress)
    })

    it('attaches the load event listener to the XMLHttpRequest', () => {
      expect(xmlHttpRequest.addEventListener)
        .to.have.been.calledWith('load', instance.onLoaded)
    })
  })

  context('when unmounted', () => {
    beforeEach(() => {
      wrapper.unmount()
    })

    it('sets the internal `_isMounted` property to false', () => {
      expect(instance._isMounted).to.be.false()
    })
  })

  describe('onLoaded', () => {
    context('when mounted', () => {
      beforeEach(() => {
        instance._isMounted = true
        instance.onLoaded()
      })

      it('sets the finish state to 100', () => {
        expect(wrapper.state('finish')).to.equal(100)
      })

      it('sets the value state to 100', () => {
        expect(wrapper.state('value')).to.equal(100)
      })
    })

    context('when unmounted', () => {
      beforeEach(() => {
        instance._isMounted = false
        sandbox.stub(instance, 'setState')
        instance.onLoaded()
      })

      it('does not set any new state', () => {
        expect(instance.setState).to.not.have.been.called()
      })
    })
  })

  describe('updateProgress', () => {
    context('when mounted', () => {
      let e
      beforeEach(() => {
        instance._isMounted = true
        e = { total: 1234, loaded: 123 }
      })

      context('when event has lengthComputable', () => {
        beforeEach(() => {
          e.lengthComputable = true
          instance.updateProgress(e)
        })

        it('sets the finish state as the total value', () => {
          expect(wrapper.state('finish')).to.equal(e.total)
        })

        it('sets the value state as the loaded value', () => {
          expect(wrapper.state('value')).to.equal(e.loaded)
        })
      })

      context('when event does not have lengthComputable', () => {
        beforeEach(() => {
          sandbox.stub(instance, 'setState')
          instance.updateProgress(e)
        })

        it('does not set any new state', () => {
          expect(instance.setState).to.not.have.been.called()
        })
      })
    })

    context('when unmounted', () => {
      beforeEach(() => {
        instance._isMounted = false
        sandbox.stub(instance, 'setState')
        instance.updateProgress()
      })

      it('does not set any new state', () => {
        expect(instance.setState).to.not.have.been.called()
      })
    })
  })
})
