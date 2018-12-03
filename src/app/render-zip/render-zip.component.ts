import { Component, OnInit } from '@angular/core';
import * as JSZip from 'jszip';

@Component({
  selector: 'app-render-zip',
  templateUrl: './render-zip.component.html',
  styleUrls: ['./render-zip.component.scss']
})
export class RenderZipComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let zip = new JSZip();
  }

}
