
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './modules/base/base.component';

const routes: Routes = [

  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main',
    component: BaseComponent,
    children: [
      {
        path: 'students',
        loadChildren: () => import('./modules/students/students.module').then(m => m.StudentsModule),
      },    
      { path: '', redirectTo: 'students', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
