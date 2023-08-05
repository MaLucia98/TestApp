import { CollectionComponent } from './collection/collection.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {
    path: '',
    component: CollectionComponent
  },
  {
    path: 'report',
    component: ReportComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecaudosRoutingModule { }
