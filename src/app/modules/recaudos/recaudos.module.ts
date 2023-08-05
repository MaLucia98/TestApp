import { CollectionComponent } from './collection/collection.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecaudosRoutingModule } from './recaudos-routing.module';
import { ReportComponent } from './report/report.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/utils/shared.module';


@NgModule({
  declarations: [
    CollectionComponent,
    ReportComponent
  ],
  imports: [
    CommonModule,
    RecaudosRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class RecaudosModule { }
