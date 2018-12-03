import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ZipComponentComponent } from './zip-component/zip-component.component';

@NgModule({
  declarations: [ZipComponentComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ZipFileExplorerModule { }
