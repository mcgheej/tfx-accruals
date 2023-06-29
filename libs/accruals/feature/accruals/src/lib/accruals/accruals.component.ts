import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { AccrualsListComponent } from '../components/accruals-list/accruals-list.component';
import { AccrualsService } from './accruals.service';

@Component({
  selector: 'tfx-accruals',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    AccrualsListComponent,
  ],
  templateUrl: './accruals.component.html',
  providers: [AccrualsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccrualsComponent {
  service = inject(AccrualsService);

  categorisedAccruals$ = this.service.categorisedAccruals$;

  showAddAccrualButton = true;

  setShowAddAccrualButton(flag: boolean) {
    this.showAddAccrualButton = flag;
  }
}
