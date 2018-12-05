import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { LexPipe } from './lex.pipe';
import { LineNumberPipe } from './line-number.pipe';
import { ZipComponent } from './zip/zip.component';

@NgModule({
  declarations: [ZipComponent, LineNumberPipe, LexPipe],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ZipFileExplorerModule { }
