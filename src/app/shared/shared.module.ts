import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatGridListModule,
    // NgbModule,
  ],
  exports: [
    MatGridListModule,
    // NgbModule,
  ]
})
export class SharedModule { }
