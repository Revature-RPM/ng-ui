import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
=======

>>>>>>> 058c0817660304d5ce32fe5dfff2b4cb07bba413
import { HomePageComponent } from './home-page/home-page.component';
import { ProjectSubmissionComponent } from './project-submission/project-submission.component';
import { ZipComponent } from '../zip-file-explorer/zip/zip.component';

const routes: Routes = [
<<<<<<< HEAD
  { path: 'home', component: HomePageComponent }, // home component
  { path: 'home/project_submission', component: ProjectSubmissionComponent},
  // { path: ':id', component:  }, // view project metadata
  // { path: ':id/code', component:  }, // view project codebase
  // { path: ':id/edit', component:  }, // make project edits
  // { path: '**', redirectTo: 'home' }
  { path: 'codebase', component: ZipComponentComponent}
=======
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'project_submission', component: ProjectSubmissionComponent },
  // TODO { path: ':id', component: ViewProjectComponent },
  // TODO { path: ':id/edit', component: EditProjectComponent },
  { path: ':id/codebase', component: ZipComponent },
  { path: '**', redirectTo: 'home' }
>>>>>>> 058c0817660304d5ce32fe5dfff2b4cb07bba413
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
