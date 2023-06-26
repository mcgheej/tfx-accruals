import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AfAccrualsDataService } from '@tfx-accruals/accruals/data-access/af-accruals-data';

@Component({
  selector: 'tfx-accruals',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './accruals.component.html',
  styleUrls: ['./accruals.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccrualsComponent {
  private db = inject(AfAccrualsDataService);

  accruals$ = this.db.accruals$;

  onCreateAccrual() {
    this.db
      .createAccrual({
        name: 'Test2',
        description: '',
        startValue: 0,
        targetValue: 100,
        startDate: '202306',
        durationInMonths: 10,
        depositProfile: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        deleted: false,
      })
      .subscribe({
        error: (err: Error) => console.log(err.message),
      });
  }
}
