import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZipComponentComponent } from './zip-component/zip-component.component';
import {HttpClientModule} from '@angular/common/http';
import { LineNumberPipe } from './line-number.pipe';
import { LexPipe } from './lex.pipe';

@NgModule({
  declarations: [ZipComponentComponent, LineNumberPipe, LexPipe],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ZipFileExplorerModule { }