import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'tfx-hamburger-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 cursor-pointer md:hidden block"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      (click)="onMenuButtonClick()"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HamburgerButtonComponent {
  @Output() menuToggle = new EventEmitter<void>();

  onMenuButtonClick() {
    this.menuToggle.emit();
  }
}
