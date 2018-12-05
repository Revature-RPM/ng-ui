import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZipComponentComponent } from './zip-component/zip-component.component';
import {HttpClientModule} from '@angular/common/http';
import { LineNumberPipe } from './line-number.pipe';
import { LexPipe } from './lex.pipe';
import {CoreModule} from '../core/core.module'

@NgModule({
  declarations: [ZipComponentComponent, LineNumberPipe, LexPipe],
  imports: [
    CommonModule,
    HttpClientModule,
    CoreModule,
  ]
})
export class ZipFileExplorerModule { }