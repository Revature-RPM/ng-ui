import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatCardModule} from '@angular/material/card';

import { MatInputModule, MatButtonModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ProjectRoutingModule } from './project-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserActionsComponent } from './user-actions/user-actions.component';
import { ViewProjectsComponent } from './view-projects/view-projects.component';
import { ProjectCardComponent } from './view-projects/project-card/project-card.component';
import { ProjectServiceService } from '../core/services/project-service.service';
import { ProjectSubmissionComponent } from './project-submission/project-submission.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatJumbotronModule } from '@angular-material-extensions/jumbotron';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { ZipFileExplorerModule } from '../zip-file-explorer/zip-file-explorer.module';

@NgModule({
  declarations: [HomePageComponent, NavbarComponent, UserActionsComponent, ViewProjectsComponent, ProjectCardComponent, ProjectSubmissionComponent],
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
    MatCardModule,
    FormsModule,
    SharedModule,
    MatJumbotronModule,
    MatFormFieldModule,
    MatInputModule,
    ZipFileExplorerModule,
    MatDialogModule
  ],
  providers:[ProjectServiceService]
})
export class ProjectModule { }
