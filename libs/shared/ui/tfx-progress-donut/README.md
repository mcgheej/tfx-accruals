# Progress Donut Library

This library provides a simple circle progress bar UI component. The component doesn't have any animation features and simply displays progress in a range 0 to 100. The component user can specify a number of properties to control the appearance of the progress donut, while other attributes can be set through CSS inheritance (e.g. font colour and font size). The size of the progress donut will fill the parent element (see usage below).

The implementation of this control is based on a blog written by Nikita Hlopov [(Circle progress bar with pure CSS and HTML)](https://nikitahl.com/circle-progress-bar-css).

## API Reference for Progress Donut

The progress donut component is implemented as a standalone Angular component. To use the component in your code first import _TfxProgressDonut_ into your host component's imports list.

```ts
import { CommonModule } from '@angular/common';
import { TfxProgressDonut } from '@tfx-accruals/shared/ui/tfx-progress-donut';

@Component({
  selector: 'your-selector',
  standalone: true,
  imports: [CommonModule, TfxProgressDonutComponent],
  templateUrl: './your.component.html',
  styleUrls: ['./your.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YourComponent {}
```

### TfxProgressDonut

Selector: `tfx-progress-donut`

#### Properties

| Name                                          | Description                                                                             |
| --------------------------------------------- | --------------------------------------------------------------------------------------- |
| @Input() <br /> value: number                 | Value of the progress donut. Defaults to zero.                                          |
| @Input() <br /> color: string                 | Colour of the progress donut. Any valid CSS color string.                               |
| @Input() <br /> width: TfxProgressDonutWidths | Width of the donut ring.                                                                |
| @Input() <br /> showValue: boolean            | If true display value as integer percentage in the centre of the ring. Default is true. |

#### Type Aliases

**TfxProgressDonutWidths**

```ts
type TfxProgressDonutWidths = 'narrow' | 'standard' | 'wide';
```

#### Usage

To use the component simply include it in your HTML. The following code uses Tailwind CSS utility classes for styling.

```html
<tfx-progress-donut class="w-20 h-20 text-xs" [value]="65" [color]="'#e91e63'"></tfx-progress-donut>
```

This will display a progress donut 80px wide by 80px high indicating a progress of 65%. The progress value will be displayed in the centre of the donut using a font size of 12px. The colour of the progress will be shown in reddish colour.
