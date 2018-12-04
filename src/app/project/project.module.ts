import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule} from '@angular/material/toolbar';

import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectRoutingModule } from './project-routing.module';
import { UserActionsComponent } from './user-actions/user-actions.component';
import { ProjectCardComponent } from './view-projects/project-card/project-card.component';
import { ViewProjectsComponent } from './view-projects/view-projects.component';
import { SharedModule } from '../shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { ProjectServiceService } from '../core/services/project-service.service';

@NgModule({
  declarations: [HomePageComponent, NavbarComponent, UserActionsComponent, ViewProjectsComponent, ProjectCardComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    MatDividerModule,
    MatGridListModule,
    FlexLayoutModule,
    MatCardModule
  ],
  providers:[ProjectServiceService]
})
export class ProjectModule { }
