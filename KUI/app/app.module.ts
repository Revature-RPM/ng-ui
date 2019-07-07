import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { LoginRegisterPageComponent } from './login-register-page/login-register-page.component';
import { ProjectViewPageComponent } from './project-view-page/project-view-page.component';
import { ProjectCarouselComponent } from './project-carousel/project-carousel.component';
import { ProjectDescriptionComponent } from './project-description/project-description.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectScreenshotThumbnailsComponent } from './project-screenshot-thumbnails/project-screenshot-thumbnails.component';
import { PrimengCarouselComponent } from './primeng-carousel/primeng-carousel.component';
import { ProjectGridPageComponent } from './project-grid-page/project-grid-page.component';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
import { NgxCarouselComponent } from './ngx-carousel/ngx-carousel.component';
import { ProjectInfoComponent } from './project-info/project-info.component';


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    NavbarComponent,
    LoginComponent,
    NavMenuComponent,
    PageNotFoundComponent,
    RegisterComponent,
    LoginRegisterPageComponent,
    ProjectViewPageComponent,
    ProjectCarouselComponent,
    ProjectDescriptionComponent,
    ProjectListComponent,
    ProjectScreenshotThumbnailsComponent,
    PrimengCarouselComponent,
    ProjectGridPageComponent,
    NgxCarouselComponent,
    ProjectInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    NgxHmCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
