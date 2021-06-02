import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {SharedModule} from './modules/shared.module';
import {HomepageComponent} from './views/homepage/homepage.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'user', loadChildren: () => import('./modules/shared.module').then(m => m.SharedModule)},
  {path: '**',  redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
