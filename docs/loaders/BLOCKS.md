# Blocks

`import { Blocks } from 'react-finite-loader'`

Loader UI component as a linear bar of block segments.

## Props
| Prop | Type | Description | Default Value | Required |
| ---- | ---- | ----------- | ------------- | -------- |
| progress | number | Number between `1` and `100`, set by the wrapper component so don't need to explicitly set it | N/A | no |
| segments | number | Number of segments to split the bar into | 20 | no |
| smooth | boolean | Should the loading blocks transition be smooth | true | no |
| rounded | boolean | Should the segments be rounded | false | no |
| transitionTime | number | Time in `ms` for the smooth transition, only applies if `smooth` is true | 200 | no |
| spacing | string | Spacing between each segment | 2px | no |
| style | object | see [style](#style) | undefined | no |

## Style
Below is the schema for the `style` prop. The style prop is optional as styling can be done externally via CSS. The style prop just provides a convenient way to style the common properties of the component.

| Prop | Type | Description | Default Value | Required |
| ---- | ---- | ----------- | ------------- | -------- |
| loadedColor | string | The color string of the loaded segment representation | undefined | no |
| unloadedColor | string | The color string of the unloaded segment representation | undefined | no |
| width | string | The width value of the entire component | undefined | no |
| height | string | The height value of the entire component | undefined | no |

The `Blocks` component renders a container element with the classes `react-finite-loader` and `blocks` and child elements for each segment which are formed of a parent element with the class `segment`. The segment wrappers will also contain the `loaded` class when the segment is loaded. Each segment contains a sub element with the class `fill`.

### Sass Style Example
```
.react-finite-loader {
  &.blocks {
    width: 50vw;
    height: 10px;
    border: 1px solid #333;
    background-color: #c1efaa;

    .segment {
      .fill {
        background-color: transparent;
      }

      &.loaded {
        .fill {
          background-color: #4faf1f;
        }
      }
    }
  }
}
```
