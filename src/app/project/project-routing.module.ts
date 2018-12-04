import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProjectSubmissionComponent } from './project-submission/project-submission.component';
import { ZipComponentComponent } from '../zip-file-explorer/zip-component/zip-component.component'

const routes: Routes = [
  { path: 'home', component: HomePageComponent }, // home component
  {path: 'home/project_submission', component: ProjectSubmissionComponent}
  // { path: ':id', component:  }, // view project metadata
  // { path: ':id/code', component:  }, // view project codebase
  // { path: ':id/edit', component:  }, // make project edits
  // { path: '**', redirectTo: 'home' }
  { path: 'codebase', component: ZipComponentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
