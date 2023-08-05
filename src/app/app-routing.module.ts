
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
        path: 'recaudos',
        loadChildren: () => import('./modules/recaudos/recaudos.module').then(m => m.RecaudosModule),
      },
        { path: '', redirectTo: 'recaudos', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
