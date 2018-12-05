import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as JSZip from 'jszip';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ProjectServiceService } from 'src/app/core/services/project.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-zip-component',
  templateUrl: './zip.component.html',
  styleUrls: ['./zip.component.scss']
})
/*
* ZipComponent is Reponsible for Unzipping and Rendering a file.zip
*
* If stream is unresovable error when ng serve and attempt to render
* then in tsconfig.json (no .app.json or event tsoncif.spec.json. the top level tsconfig.json)
* Do not manually go and change in node modules JSzip to readable-stream from stream....
* Git push ignores app modules but not tsconfig.json
*
* "paths": {
      "jszip": [
        "node_modules/jszip/dist/jszip.min.js"
      ]
    },
* @author Andrew Mitchem (1810-Oct08-Java-USF)
*/
export class ZipComponent implements OnInit {
  RenderFile: File[] = [];
  SelectedFile: File;
  OpenFile: File[] = [];
  /*Constructur: Injects Http Client into the component for use of resource request
  *@param HttpClient standard angular dependency to fire http request.
  *@param ProjectServiceService. injects the project service from core modules
  *@author Andrew Mitchem (1810-Oct08-Java-USF)
  */
  constructor(private http: HttpClient, private projectservice: ProjectServiceService, private location: Location) { }
  ngOnInit() {
    const testfile = new File();
    testfile.fileName = 'HELP';
    testfile.fileContent = 'HELLO';
    this.SelectedFile = testfile;
    console.log(this.projectservice.CurrentProject);
  }
  /*
  * ZipComponent.sendRequest()
  * Fire off an http request for given request.
  * @author Andrew Mitchem (1810-Oct08-Java-USF)
  *
  */
 goBack(){
   this.location.back();
 }
  sendRequest(){
    //reponse type is arraybuffer so the get request knows this is a oclet-array-stream request
    this.http.get('http://localhost:8080/spring-mvc/files', {responseType: 'arraybuffer'})
    .pipe(
      map(arrayBuffer => new Uint8Array(arrayBuffer))
    )
    .subscribe(ui8Array => {
      // after the array is retrieve. open the data with JSZip
      console.log('got (ui8Arra)');
      this.openData(ui8Array);
    });
  }
  /*
  * ZipComponent.sendRequest()
  * unpacks a zip blob(ui8array) and opens with JSZip (zip is the reference variable)
  * @param data. ui8array blob object that "is" a valid zip file.
  * @author Andrew Mitchem (1810-Oct08-Java-USF)
  */
  openData(data) {
     const zip = new JSZip();
     // new instance of JSZip. note this object lifecycle needs to be undone after rendering
     // as such it not a class member but function member only for the scope of this function closure
     zip.loadAsync(data)
        .then(contents => {
          // console.log(this.RenderStrings)
          // move to the sub folder inside the zip file: replace with pass paramater variables
          const dirFolder =  zip.folder('reflections-mafia-server-master/src/main/java');
          const fileArray = dirFolder.file(/^.*/); // get the array of all files in this subdirectory
          for (let i = 0; i < fileArray.length; i++) {
            const file = fileArray[i];
            this.parseFiles(file);
          }
      });
      // .then(()=>{
      //   console.log("um help");
      //   this.RenderStrings.next(this.tempString);
      //   console.log(this.tempString)
      //   this.tempString = []
      //   console.log(this.RenderStrings)
      // })
  }
   /*
  * ZipComponent.parseFiles(file)
  * opens and individual zip file. This method ignores files that are directories (ie. not files with contnet)
  * @param file. ZipObject (class of JSzip) to be unpacked into a normal blob object
  * @author Andrew Mitchem (1810-Oct08-Java-USF)
  */
  parseFiles(file) {
    // console.log("iterating over", file.name);
    // console.log(file)
    // check if file is a directory
    if (!file.dir) {
        let fileName = file.name;
        // save ZipObject file name as once unzip into a  standardfile  we loose acess to this data
        fileName = fileName.replace('reflections-mafia-server-master/src/main/java', '');
        fileName = fileName.substring(fileName.lastIndexOf('/') + 1);
        // remove leading path
        const helpme = file.async('uint8array').then(function (data) { // converts the ZipObject
          let string = '';
          string = new TextDecoder('utf-8').decode(data);
          // if(string) --< this section is to prevent error. uncomment if oddities arise
          return string;
        });
        helpme.then(string => {
          // promise to unrwap the string. not prvious function has no concept of component namespace due to closur
          // console.log(string)
          const file = new File();
          file.fileName = fileName;
          file.fileContent = string; // "file here is a string text readable format stored for rendering logic"
          this.RenderFile.push(file);
        });
    }
  }
}
 /*
  * Tree
  * SubClass for storing render related structure
  * @author Andrew Mitchem (1810-Oct08-Java-USF)
  */
class Tree {
  name: string;
  files: File[] = [];
  tree: Tree[] = [];
}
 /*
  * File
  * SubClass for storing render related structure
  * @author Andrew Mitchem (1810-Oct08-Java-USF)
  */
class File {
  fileName: String;
  fileContent: String;
}
