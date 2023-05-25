import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'tfx-root',
  template: `<h1 class="border text-green-600">Hello world!</h1>`,
})
export class AppComponent {
  title = 'accruals';
}
