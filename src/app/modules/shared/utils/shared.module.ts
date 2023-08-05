import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../components/loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableResponsiveContainer } from '../components/mat-table-responsive-container/mat-table-responsive-container.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    LoaderComponent,
    MatTableResponsiveContainer,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    LoaderComponent,
    MatTableResponsiveContainer,
    MaterialModule,
  ]
})
export class SharedModule { }
