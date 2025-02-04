import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellComponent } from '@tfx-accruals/accruals/shell';

@Component({
    imports: [RouterModule, ShellComponent],
    selector: 'tfx-root',
    template: `<tfx-shell></tfx-shell>`
})
export class AppComponent {}
