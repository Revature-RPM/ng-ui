import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatCardModule} from '@angular/material/card';

import { ProjectRoutingModule } from './project-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserActionsComponent } from './user-actions/user-actions.component';
import { ViewProjectsComponent } from './view-projects/view-projects.component';
import { ProjectCardComponent } from './view-projects/project-card/project-card.component';
import { ProjectServiceService } from '../core/services/project-service.service';

@NgModule({
  declarations: [HomePageComponent, NavbarComponent, UserActionsComponent, ViewProjectsComponent, ProjectCardComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    MatDividerModule,
    MatGridListModule,
    FlexLayoutModule,
    MatCardModule
  ],
  providers:[ProjectServiceService]
})
export class ProjectModule { }
