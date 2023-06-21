import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TfxProgressDonutComponent } from '@tfx-accruals/shared/ui/tfx-progress-donut';

@Component({
  selector: 'tfx-accruals',
  standalone: true,
  imports: [CommonModule, TfxProgressDonutComponent],
  templateUrl: './accruals.component.html',
  styleUrls: ['./accruals.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccrualsComponent {}
