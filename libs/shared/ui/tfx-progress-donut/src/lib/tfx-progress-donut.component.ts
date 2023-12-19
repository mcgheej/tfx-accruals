import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CssStyles {
  [klass: string]: number | string;
}

export type TfxProgressDonutWidths = 'narrow' | 'standard' | 'wide';

@Component({
  selector: 'tfx-progress-donut',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngStyle]="donutStyles$ | async"></div>
    @if (showValue) {
    <div class="legend">
      <div class="percentage">{{ value }}%</div>
    </div>
    }
  `,
  styles: [
    `
      :host {
        display: grid;
        position: relative;
      }

      .legend {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        display: grid;
      }

      .percentage {
        align-self: center;
        justify-self: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TfxProgressDonutComponent implements OnChanges {
  @Input() value = 0;
  @Input() color = 'green';
  @Input() width: TfxProgressDonutWidths = 'standard';
  @Input() showValue = true;

  private donutStylesSubject = new BehaviorSubject<CssStyles>({});
  public donutStyles$ = this.donutStylesSubject.asObservable();

  ngOnChanges() {
    this.value = this.value < 0 ? 0 : this.value > 100 ? 100 : this.value;
    this.donutStylesSubject.next(
      this.getDonutStyles(this.value, this.color, this.width)
    );
  }

  private getDonutStyles(
    value: number,
    color: string,
    width: TfxProgressDonutWidths
  ): CssStyles {
    const w = width === 'standard' ? 60 : width === 'narrow' ? 80 : 40;
    return {
      width: '100%',
      height: '100%',
      background:
        // `radial-gradient(closest-side, white 40%, transparent 41%),` +
        `radial-gradient(closest-side, white ${w}%, transparent ${w + 1}%),` +
        `conic-gradient(${color} 0% ${value}%, #eeeeee ${value}% 100%)`,
      'border-radius': '50%',
    };
  }
}
