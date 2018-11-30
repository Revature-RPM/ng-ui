import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: ':id' },
  { path: ':id', component: ProfileComponent }, // import component
  { path: ':id/edit', component: EditComponent } // or whatever you wanna call it
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
