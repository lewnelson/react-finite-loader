# Grid

`import { Grid } from 'react-finite-loader'`

Loader UI component as a square grid shape.

## Props
| Prop | Type | Description | Default Value | Required |
| ---- | ---- | ----------- | ------------- | -------- |
| progress | number | Number between `1` and `100`, set by the wrapper component so don't need to explicitly set it | N/A | no |
| gridSize | number | The size of the grid i.e. number of rows and columns | 6 | no |
| smooth | boolean | Should the segments transition be smooth | true | no |
| rounded | boolean | Should the segments be rounded | false | no |
| transitionTime | number | Time in `ms` for the smooth transition, only applies if `smooth` is true | 200 | no |
| spacing | string | Spacing between each segment | 0px | no |
| pattern | enum | One of - `horizontal`, `horizontalAlt`, `vertical`, `verticalAlt`, `spiral`. Pattern to use when rendering the loader | vertical | no |
| spin | boolean | Should the grid spin as the segments are loaded | false | no |
| reverseSpin | boolean | Should the spin direction be reversed, has no effect if spin is false | false | no |
| reverse | boolean | Should the pattern be reversed | false | no |
| style | object | see [style](#style) | undefined | no |

## Style
Below is the schema for the `style` prop. The style prop is optional as styling can be done externally via CSS. The style prop just provides a convenient way to style the common properties of the component.

| Prop | Type | Description | Default Value | Required |
| ---- | ---- | ----------- | ------------- | -------- |
| loadedColor | string | The color string of the loaded segment representation | undefined | no |
| unloadedColor | string | The color string of the unloaded segment representation | undefined | no |
| size | number | Relative size of component as a percentage | 100 | no |

The `Grid` component renders a container element with the classes `react-finite-loader` and `grid`. It also renders a child element for each row. Each row has a segment node representing each column on that row.

The segment wrappers have the class of `segment`. The segment wrappers will also contain the `loaded` class when the segment is loaded. Each segment contains a sub element with the class `fill`.

### Sass Style Example
```
.react-finite-loader {
  &.grid {
    // row
    > div {
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
}
```
