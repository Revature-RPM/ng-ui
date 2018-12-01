import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatButtonModule, MatInputModule, MatCardModule } from '@angular/material';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
  ],
  exports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
  ]
})
export class SharedModule { }
