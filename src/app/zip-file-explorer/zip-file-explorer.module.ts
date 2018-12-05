import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { LexPipe } from './lex.pipe';
import {CoreModule} from '../core/core.module'
import { ZipComponent } from './zip/zip.component';
import { LineNumberPipe } from './line-number.pipe';

@NgModule({
  declarations: [ZipComponent, LineNumberPipe, LexPipe],
  imports: [
    CommonModule,
    HttpClientModule,
    CoreModule,
  ]
})
export class ZipFileExplorerModule { }
