import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Components
import {PageNotFoundComponent} from './components/pages/page-not-found/page-not-found.component';
import {LoginRegisterPageComponent} from './components/pages/login-register-auth/login-register-page/login-register-page.component';
import {ProjectGridPageComponent} from './components/pages/project/project-grid-page/project-grid-page.component';
import { ProjectSubmissionPageComponent } from './components/pages/project-submission/project-submission-page/project-submission-page.component';
import { ProjectEditComponent } from './components/pages/project-edit/project-edit.component';
import { ProfileComponent } from './components/pages/user-management/profile/profile.component';
import { AdminChangeRolesComponent } from './components/pages/user-management/admin-change-roles/admin-change-roles.component';
import { ProjectsPendingApprovalPageComponent } from './components/pages/project-approval/projects-pending-approval-page/projects-pending-approval-page.component';
import { CodebaseComponent } from './components/pages/codebase/codebase.component';
import { ProjectViewComponent } from './components/pages/project-view/project-view.component';

const routes: Routes = [
  {path: '', redirectTo: 'projects', pathMatch: 'full'},
  {path: 'login', component: LoginRegisterPageComponent},
  {path: 'projects', component: ProjectGridPageComponent},
  {path: 'projects-user', component: ProjectGridPageComponent, canActivate: [AuthGuard] },
  {path: 'projects-pending', component: ProjectsPendingApprovalPageComponent, canActivate: [AuthGuard]},
  {path: 'project-submission', component: ProjectSubmissionPageComponent, canActivate: [AuthGuard] },
  {path: 'project-update', component: ProjectEditComponent, canActivate: [AuthGuard] },
  {path: 'project-view', component: ProjectViewComponent },
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {path: 'codebase', component: CodebaseComponent},
  {path: 'adminchangeroles', component: AdminChangeRolesComponent, canActivate: [AuthGuard] },

  // Do not put any routes below this one!
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
