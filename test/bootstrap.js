'use strict'

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { JSDOM } from 'jsdom'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import dirtyChai from 'dirty-chai'

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

function copyProps (src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => (Object.assign(result, {
      [prop]: Object.getOwnPropertyDescriptor(src, prop)
    })), {})
  Object.defineProperties(target, props)
}

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
}

copyProps(window, global)
configure({ adapter: new Adapter() })
chai.use(sinonChai)
chai.use(dirtyChai)
