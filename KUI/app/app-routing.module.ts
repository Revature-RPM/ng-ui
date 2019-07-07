import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginRegisterPageComponent } from './login-register-page/login-register-page.component';
import { ProjectViewPageComponent } from './project-view-page/project-view-page.component';
import { ProjectGridPageComponent } from './project-grid-page/project-grid-page.component';

const routes: Routes = [
  // {path: '', component: LoginRegisterPageComponent},
  {path: '', component: ProjectGridPageComponent},
  {path: 'fail', component: ProjectViewPageComponent},
  {path: 'login', component: LoginRegisterPageComponent},
  {path: 'projects', component: ProjectGridPageComponent},


  // Do not put any routes below this one! 
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
