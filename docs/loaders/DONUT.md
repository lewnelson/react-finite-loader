# Donut

`import { Donut } from 'react-finite-loader'`

Loader UI component as a donut shape which can extended in width to also be filled in a pie shape.

## Props
| Prop | Type | Description | Default Value | Required |
| ---- | ---- | ----------- | ------------- | -------- |
| progress | number | Number between `1` and `100`, set by the wrapper component so don't need to explicitly set it | N/A | no |
| value | number | Set by the wrapper component so don't need to explicitly set it | N/A | no |
| finish | number | Set by the wrapper component so don't need to explicitly set it | N/A | no |
| labelAsPercentage | boolean | Should the label be displayed as a percentage, alternative is to display as `value / finish` | true | no |
| thickness | number | Floating point number between 0 (exclusive) and 1 (inclusive). If thickness is set to 1 then the loader will be a filled circle | 0.2 | no |
| style | object | see [style](#style) | undefined | no |

## Style
Below is the schema for the `style` prop. The style prop is optional as styling can be done externally via CSS. The style prop just provides a convenient way to style the common properties of the component.

| Prop | Type | Description | Default Value | Required |
| ---- | ---- | ----------- | ------------- | -------- |
| loadedColor | string | The color string of the loaded segment representation | undefined | no |
| unloadedColor | string | The color string of the unloaded segment representation | undefined | no |
| labelColor | string | The font color of the label | undefined | no |
| middleColor | string | The color of the middle of the donut | transparent | no |
| scale | number | Arbitrary number used to scale the component | 10 | no |
| labelFontSize | string | The font size of the label | 0.25em | no |

The `Donut` component renders a container element with the classes `react-finite-loader` and `donut`. It also renders a `label` element for the label. When `labelAsPercentage` is true the `%` symbol is wrapped in a span element with the `percentage` class to allow for it to be styled individually.

A loaded child node is also rendered with the class `loaded` and two child elements with the classes `left-half` and `right-half` respectively.

An unloaded child node is rendered with the class `unloaded`.

The middle is rendered as a child node with the class `middle`.

### Sass Style Example
```
.react-finite-loader {
  &.donut {
    margin: 0 auto;

    label {
      span.percentage {
        opacity: 0.6;
      }
    }

    .loaded {
      div {
        border-color: blue;
      }
    }

    .unloaded {
      border-color: red;
    }

    .middle {
      backgroundColor: orange;
    }
  }
}
```
