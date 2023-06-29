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
  /**
   * The following inputs are bound to the routes targeting this component
   * through Component Input Binding.
   *
   * id:      this is bound to the path param /:id from the path "accruals/edit/:id"
   * accrual: this is bound to output of a resolver that gets the accrual
   *          object associated with the id in the path "accruals/edit/:id"
   *
   * The other path that routes to this component is "accruals/add". In this case
   * both the component properties will be undefined.
   */
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
