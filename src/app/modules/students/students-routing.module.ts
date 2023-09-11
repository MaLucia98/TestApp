import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentsFormComponent } from './students-form/students-form.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsListComponent,

  },
  {
    path: 'create',
    component: StudentsFormComponent,

  },
  {
    path: 'edit/:id',
    component: StudentsFormComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
