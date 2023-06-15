import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tfx-accruals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accruals.component.html',
  styleUrls: ['./accruals.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccrualsComponent {}
