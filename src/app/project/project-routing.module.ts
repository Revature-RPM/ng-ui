import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component:  }, // home component
  { path: ':id', component:  }, // view project metadata
  { path: ':id/code', component:  }, // view project codebase
  { path: ':id/edit', component:  } // make project edits
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
