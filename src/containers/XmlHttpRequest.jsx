'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { ReactFiniteLoader } from '../ReactFiniteLoader'

// Wrapper component for XMLHttpRequest loaders
export class XmlHttpRequest extends React.Component {
  /**
   * Setup state
   *
   * @param  {Object} props Component props
   * @return {void}
   */
  constructor (props) {
    super(props)
    this.updateProgress = this.updateProgress.bind(this)
    this._isMounted = false
    this.state = {
      finish: 100,
      value: 0
    }
  }

  /**
   * XMLHttpRequest load event handler
   *
   * @param  {Object} e Load event
   * @return {void}
   */
  onLoaded (e) {
    if (!this._isMounted) return
    this.setState({ finish: 100, value: 100 })
  }

  /**
   * XMLHttpRequest progress event handler
   *
   * @param  {Object} e Progress event
   * @return {void}
   */
  updateProgress (e) {
    if (!this._isMounted) return
    if (e.lengthComputable) {
      this.setState({ finish: e.total, value: e.loaded })
    }
  }

  /**
   * When the component has mounted the XMLHttpRequest event handlers are
   * attached
   *
   * @return {void}
   */
  componentDidMount () {
    this._isMounted = true
    const { xmlHttpRequest } = this.props
    xmlHttpRequest.addEventListener('progress', this.updateProgress)
    xmlHttpRequest.addEventListener('load', this.onLoaded)
  }

  /**
   * Ensure all event handlers can check that component is mounted/unmounted
   *
   * @return {void}
   */
  componentWillUnmount () {
    this._isMounted = false
  }

  /**
   * Renders a ReactFiniteLoader component with the loader passed as a child
   * component and the appropriate progress props
   *
   * @return {React Node}
   */
  render () {
    const { value, finish } = this.state
    const props = {
      value,
      start: 0,
      finish
    }

    return (
      <ReactFiniteLoader {...props}>
        {this.props.children}
      </ReactFiniteLoader>
    )
  }
}

XmlHttpRequest.propTypes = {
  children: PropTypes.node.isRequired,
  xmlHttpRequest: PropTypes.shape({
    addEventListener: PropTypes.func.isRequired
  }).isRequired
}
