import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { HomePageComponent } from './home-page/home-page.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectSubmissionComponent } from './project-submission/project-submission.component';
import { UserActionsComponent } from './user-actions/user-actions.component';
import { ViewProjectsComponent } from './view-projects/view-projects.component';
import { ProjectCardComponent } from './view-projects/project-card/project-card.component';
import { ProjectService } from '../core/services/project.service';
import { SharedModule } from '../shared/shared.module';
import { ZipFileExplorerModule } from '../zip-file-explorer/zip-file-explorer.module';
import { InputDialogComponent } from './project-submission/input-dialog/input-dialog.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
@NgModule({
  declarations: [
    HomePageComponent,
    ProjectCardComponent,
    ProjectSubmissionComponent,
    UserActionsComponent,
    ViewProjectsComponent,
    InputDialogComponent,
    EditProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule,
    ZipFileExplorerModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  entryComponents: [InputDialogComponent],
  providers: [ProjectService]
})
export class ProjectModule { }
