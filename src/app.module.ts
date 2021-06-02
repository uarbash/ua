import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { SignUpComponent } from './modules/sign-up/sign-up.component';
import { SignInComponent} from './modules/sign-in/sign-in.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { ToggleBoxComponent } from './components/toggle-box/toggle-box.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { HomepageComponent } from './views/homepage/homepage.component';
import {HttpClientModule} from '@angular/common/http';
import {ContactsComponent} from './modules/contacts/contacts.component';
import {ProfileComponent} from './modules/profile/profile.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SignUpComponent,
    CustomInputComponent,
    ToggleBoxComponent,
    SignInComponent,
    HomepageComponent,
    ContactsComponent,
    ProfileComponent,
    NotificationsComponent,
    ChatBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  exports: [
    CustomInputComponent,
    ToggleBoxComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
