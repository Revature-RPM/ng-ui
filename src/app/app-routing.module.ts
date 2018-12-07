import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './project/project.module#ProjectModule' },
  { path: 'account', loadChildren: './account/account.module#AccountModule' },
  { path: 'auth', loadChildren: './authentication/authentication.module#AuthenticationModule' },
  { path: 'projects', loadChildren: './project/project.module#ProjectModule' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
