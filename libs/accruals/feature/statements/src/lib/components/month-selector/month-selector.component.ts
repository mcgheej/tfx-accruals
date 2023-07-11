import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { add, format, sub } from 'date-fns';

@Component({
  selector: 'tfx-month-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
  ],
  templateUrl: './month-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthSelectorComponent {
  @Input({ required: true }) statementMonth!: Date;
  @Output() monthChanged = new EventEmitter<string>();

  setMonthAndYear(
    normalizedMonthAndYear: Date,
    datepicker: MatDatepicker<Date>
  ) {
    const newStatementMonth = format(normalizedMonthAndYear, 'yyyyMM');
    datepicker.close();
    this.monthChanged.emit(newStatementMonth);
  }

  displayStatementMonth(): string {
    return format(this.statementMonth, 'MMMM yyyy');
  }

  onPrevMonth() {
    const newStatementMonth = format(
      sub(this.statementMonth, { months: 1 }),
      'yyyyMM'
    );
    this.monthChanged.emit(newStatementMonth);
  }

  onNextMonth() {
    const newStatementMonth = format(
      add(this.statementMonth, { months: 1 }),
      'yyyyMM'
    );
    this.monthChanged.emit(newStatementMonth);
  }

  onOpenDatepicker(picker: MatDatepicker<Date>, btn: MatIcon) {
    picker.open();
    btn._elementRef.nativeElement.blur();
  }
}
