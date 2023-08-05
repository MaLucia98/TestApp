import { Component } from "@angular/core";

@Component({
  selector: 'mat-table-responsive-container',
  template: `<div class="mat-table-responsive"><ng-content></ng-content></div>`,
  styleUrls: ['./mat-table-responsive-container.component.scss']
})
export class MatTableResponsiveContainer { }
