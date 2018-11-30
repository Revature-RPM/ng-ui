import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';

import { ProjectRoutingModule } from './project-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserActionsComponent } from './user-actions/user-actions.component';
import { ViewProjectsComponent } from './view-projects/view-projects.component';

@NgModule({
  declarations: [HomePageComponent, NavbarComponent, UserActionsComponent, ViewProjectsComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    MatToolbarModule
  ]
})
export class ProjectModule { }
