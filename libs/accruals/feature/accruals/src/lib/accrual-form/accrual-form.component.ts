import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AfAccrualsDataService } from '@tfx-accruals/accruals/data-access/af-accruals-data';
import { PresentationAccrual } from '@tfx-accruals/accruals/util/accruals-types';

@Component({
  selector: 'tfx-accrual-form',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './accrual-form.component.html',
  styleUrls: ['./accrual-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccrualFormComponent implements OnInit {
  @Input() id?: string;
  @Input() accrual?: PresentationAccrual;

  private db = inject(AfAccrualsDataService);

  ngOnInit() {
    console.log(`ID: ${this.id}`);
    console.log(`accrual: ${this.accrual?.name}`);
  }

  onCreateAccrual() {
    this.db
      .createAccrual({
        name: 'Test2',
        description: '',
        startValue: 0,
        targetValue: 100,
        startDate: '202306',
        durationInMonths: 10,
        depositSchedule: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        deleted: false,
      })
      .subscribe({
        error: (err: Error) => console.log(err.message),
      });
  }
}
