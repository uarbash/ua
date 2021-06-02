import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';
import {AuthGuardServiceService} from '../services/auth-guard-service.service';
import { ContactsComponent } from './contacts/contacts.component';

const routes: Routes = [
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardServiceService]},
  {path: 'contacts', component: ContactsComponent, canActivate: [AuthGuardServiceService]},
  {path: '**', redirectTo: '../'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class SharedModule { }
