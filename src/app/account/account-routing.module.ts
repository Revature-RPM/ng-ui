import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {path: ':id', component: ProfileComponent},
  {path: ':id/edit', component: EditProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
