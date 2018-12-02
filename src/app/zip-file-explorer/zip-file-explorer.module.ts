import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZipComponentComponent } from './zip-component/zip-component.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [ZipComponentComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ZipFileExplorerModule { }