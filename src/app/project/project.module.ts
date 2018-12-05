import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HomePageComponent } from './home-page/home-page.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectSubmissionComponent } from './project-submission/project-submission.component';
import { UserActionsComponent } from './user-actions/user-actions.component';
import { ViewProjectsComponent } from './view-projects/view-projects.component';
import { ProjectCardComponent } from './view-projects/project-card/project-card.component';
import { ProjectService } from '../core/services/project.service';
import { SharedModule } from '../shared/shared.module';
import { ZipFileExplorerModule } from '../zip-file-explorer/zip-file-explorer.module';

@NgModule({
  declarations: [
    HomePageComponent,
    UserActionsComponent,
    ViewProjectsComponent,
    ProjectCardComponent,
    ProjectSubmissionComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    MatTabsModule,
    MatDividerModule,
    SharedModule,
    ZipFileExplorerModule,
    MatDialogModule
  ],
  providers: [ProjectService]
})
export class ProjectModule { }
