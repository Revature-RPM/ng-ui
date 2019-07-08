import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from '../../KUI/app/page-not-found/page-not-found.component';
import {LoginRegisterPageComponent} from './components/pages/login-register-auth/login-register-page/login-register-page.component';
import {ProjectViewPageComponent} from '../../KUI/app/project-view-page/project-view-page.component';
import {ProjectGridPageComponent} from './components/pages/project/project-grid-page/project-grid-page.component';

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
