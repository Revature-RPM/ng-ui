import 'hammerjs';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SidenavComponent} from './components/HUD/sidenav/sidenav.component';
import {MaterialModule} from './misc-modules/material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from './components/HUD/navbar/navbar.component';
import {LoginComponent} from './components/pages/login-register-auth/login/login.component';
import {NavMenuComponent} from './components/HUD/nav-menu/nav-menu.component';
import {RegisterComponent} from './components/pages/login-register-auth/register/register.component';
import {LoginRegisterPageComponent} from './components/pages/login-register-auth/login-register-page/login-register-page.component';
import {ProjectDescriptionComponent} from './components/pages/project/project-description/project-description.component';
import {ProjectListComponent} from './components/pages/project/project-list/project-list.component';
import {ProjectGridPageComponent} from './components/pages/project/project-grid-page/project-grid-page.component';
import {NgxHmCarouselModule} from 'ngx-hm-carousel';
import {NgxCarouselComponent} from './components/pages/project/ngx-carousel/ngx-carousel.component';
import {ProjectInfoComponent} from './components/pages/project/project-info/project-info.component';
import {EditProjectComponent} from './components/pages/project/edit-project/edit-project.component';
import {PageNotFoundComponent} from './components/pages/page-not-found/page-not-found.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    NavbarComponent,
    LoginComponent,
    NavMenuComponent,
    RegisterComponent,
    LoginRegisterPageComponent,
    ProjectDescriptionComponent,
    ProjectListComponent,
    ProjectGridPageComponent,
    NgxCarouselComponent,
    ProjectInfoComponent,
    EditProjectComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    NgxHmCarouselModule,
    HttpClientModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
