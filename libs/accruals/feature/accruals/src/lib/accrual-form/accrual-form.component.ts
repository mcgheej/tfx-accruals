import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tfx-accrual-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accrual-form.component.html',
  styleUrls: ['./accrual-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccrualFormComponent {}
