import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentsFormComponent } from './students-form/students-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/utils/shared.module';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MatIconModule } from '@angular/material/icon';
import { StudentSubjectsFormComponent } from './student-subjects-form/student-subjects-form.component';
import { SubjectsComponent } from './student-subjects/subjects.component';


@NgModule({
  declarations: [
    StudentsListComponent,
    StudentsFormComponent,
    StudentSubjectsFormComponent,
    SubjectsComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    RxReactiveFormsModule,
    MatIconModule
  ]
})
export class StudentsModule { }
