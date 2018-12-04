import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegistrationComponent } from './registration/registration.component';
import { SharedModule } from '../shared/shared.module';
import { MatJumbotronModule } from '@angular-material-extensions/jumbotron';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    SharedModule,
    MatJumbotronModule,
    MatStepperModule
  ]
})
export class AuthenticationModule { }
