import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthenticationModule } from 'src/app/authentication/authentication.module';
import { LoginComponent } from './authentication/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth', loadChildren: 'src/app/authentication/authentication.module#AuthenticationModule'},
  { path: 'auth/login', component: LoginComponent, loadChildren: './project/project.module#ProjectModule' },
  { path: 'account', loadChildren: './account/account.module#AccountModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
