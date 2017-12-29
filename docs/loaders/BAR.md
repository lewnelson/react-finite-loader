# Bar

`import { Bar } from 'react-finite-loader'`

Loader UI component as a standard blocked loading bar.

## Props
| Prop | Type | Description | Default Value | Required |
| ---- | ---- | ----------- | ------------- | -------- |
| progress | number | Number between `1` and `100`, set by the wrapper component so don't need to explicitly set it | N/A | no |
| smooth | boolean | Should the loading bar transition be smooth | true | no |
| transitionTime | number | Time in `ms` for the smooth transition, only applies if `smooth` is true | 200 | no |
| style | object | see [style](#style) | undefined | no |

## Style
Below is the schema for the `style` prop. The style prop is optional as styling can be done externally via CSS. The style prop just provides a convenient way to style the common properties of the component.

| Prop | Type | Description | Default Value | Required |
| ---- | ---- | ----------- | ------------- | -------- |
| loadedColor | string | The color string of the loaded segment representation | undefined | no |
| unloadedColor | string | The color string of the unloaded segment representation | undefined | no |
| width | string | The width value of the entire component | undefined | no |
| height | string | The height value of the entire component | undefined | no |

The `Bar` component renders two elements, a container element with the classes `react-finite-loader` and`bar` and a child element with the class of `loaded`.

### Sass Style Example
```
.react-finite-loader {
  &.bar {
    width: 50vw;
    height: 10px;
    border: 1px solid #333;
    background-color: #c1efaa;

    .loaded {
      background-color: #4faf1f;
    }
  }
}
```
