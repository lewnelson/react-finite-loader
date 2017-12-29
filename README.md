# React Finite Loader
Finite loader components for [React](https://reactjs.org/).

React finite loader provides loader components for loading resources where the size of the resource is known. For example downloading a file.

React finite loader provides a set of loading UI components as well as a set of container components to interface with resource loading methods such as `XMLHttpRequest` objects.

## Contents
----
1. [Getting Started](#getting-started)
1. [UI Components](#ui-components)
1. [API Documentation](#api-documentation)

## Getting Started
----
Install and save as a dependency.
`npm install --save react-finite-loader`

### Using the XMLHttpRequest container
In the example below we make use of the provided `XmlHttpRequestContainer` component which accepts an [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) instance and a loader type as a child for the UI.

In this instance we simply start the `XMLHttpRequest` once the component has been loaded. For our UI component (`Bar`) we have passed some styling attributes. Styling can be handled within the component via Javascript or externally via CSS, see [API documentation](#api-documentation) for more details.
```
import React from 'react'
import { XmlHttpRequestContainer, Bar } from 'react-finite-loader'

export default class ResourceDownloader extends React.Component {
  componentDidMount () {
    const { xmlHttpRequest, url } = this.props
    xmlHttpRequest.open('GET', url)
    xmlHttpRequest.send()
  }

  render () {
    const { xmlHttpRequest } = this.props
    return (
      <XmlHttpRequestContainer xmlHttpRequest={xmlHttpRequest}>
        <Bar
          style={{
            width: '100%',
            height: '20px',
            loadedColor: '#2c69cc',
            unloadedColor: '#9cbbed'
          }}
        />
      </XmlHttpRequestContainer>
    )
  }
}
```

In this example our `ResourceDownloader` takes two props; `xmlHttpRequest` and `url`. Where `xmlHttpRequest` is our `XMLHttpRequest` instance and `url` is the URL location of the resource we are running our `GET` request against.

### Using the ReactFiniteLoader component
If there are no suitable container components you can use the `ReactFiniteLoader` component directly, this is the component used by the container components to interface with the various resource loading methods.

In this example we imitate a resource loading in by setting a randomly incrementing loading value at random intervals.

```
import React from 'react'
import { ReactFiniteLoader, Bar } from 'react-finite-loader'

export default class ResourceDownloader extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: 0 }
    this.incrementValue = this.incrementValue.bind(this)
    this.getRand = this.getRand.bind(this)
  }

  incrementValue () {
    setTimeout(function () {
      const value = this.state.value + this.getRand(1, 12)
      if (this.state.value >= 100) {
        this.setState({ value: 100 })
      } else {
        this.setState({ value })
        this.incrementValue()
      }
    }, this.getRand(600, 1800))
  }

  componentDidMount () {
    this.incrementValue()
  }

  getRand (min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }

  render () {
    const { value } = this.state
    return (
      <ReactFiniteLoader value={value}>
        <Bar
          style={{
            width: '100%',
            height: '20px',
            loadedColor: '#2c69cc',
            unloadedColor: '#9cbbed'
          }}
        />
      </ReactFiniteLoader>
    )
  }
}
```

We use the same UI component as in the previous example, but this time instead of using the `XmlHttpRequestContainer` component we are using the `ReactFiniteLoader` component instead. This allows us to control the progress. In this example we only pass a `value` prop, by default our inital and final values are `0` and `100` respectively. See the [API docs](#api-documentation) for more details.

Once our component has mounted we start our progress value incrementer which recursively increments our value until it has reached `100` at random time intervals and random increments.

## UI Components
As well as being able to use the bundled loader UI components you can also create your own custom UI components.

All UI components receive a `progressPercentage` prop which is the progress percentage value between `0%` and `100%` inclusive. Any additional props are component specific. The `progressPercentage` prop is handled by the `ReactFiniteLoader` component.

Therefore to create a custom UI loader component all you need to do is create a component which accepts a `progressPercentage` prop and handle the value on `progressPercentage` accordingly.

See the [API documentation](#api-documentation) for further detail on the bundled UI components.

## API Documentation
----
1. [Container Components](https://github.com/lewnelson/react-finite-loader/blob/master/docs/CONTAINERS.md)
1. [UI Loader Components](https://github.com/lewnelson/react-finite-loader/blob/master/docs/LOADERS.md)
