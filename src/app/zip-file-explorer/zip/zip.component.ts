import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as JSZip from 'jszip';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-zip-component',
  templateUrl: './zip.component.html',
  styleUrls: ['./zip.component.scss']
})
/*
* ZipComponent is Reponsible for Unzipping and Rendering a file.zip
*
* If stream is unresovable error when ng serve and attempt to render
* then in tsconfig.json (not.app.json or tsoncif.spec.json. the top level tsconfig.json)
* add the following code path to the file compileroptions
* Do not manually go and change in node modules JSzip to readable-stream from stream
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
  RenderFile: RenderFile[] = [];
  SelectedFile: RenderFile;
  OpenFile: RenderFile[] = [];
  filepath: string = '';
  /*Constructur: Injects Http Client into the component for use of resource request
  *@param HttpClient standard angular dependency to fire http request.
  *
  */
  constructor(private http: HttpClient, private location: Location) { }

  ngOnInit() {
    let testfile = new  RenderFile();
    testfile.fileName = "HELP";
    testfile.fileContent = "HELLO: \n use the first 🗁 to open the remote saved codebase zip. \n or use the second 🗁 to open a local repo zip. \n ⌂ to return to the websites";
    this.SelectedFile = testfile;
  }
  /*
   *ZipComponent.goBack()
  * Redirects back to the last page
  * @author Andrew Mitchem (1810-Oct08-Java-USF)
  */
  goBack() {
    this.location.back();
  }
  /*
  * ZipComponent.sendRequest()
  * Fire off an http request for given request.
  * @author Andrew Mitchem (1810-Oct08-Java-USF)
  *
  */
  sendRequest() {
    //reponse type is arraybuffer so the get request knows this is a oclet-array-stream request
    this.http.get('http://localhost:8080/spring-mvc/files',{ observe: 'response', responseType: 'blob'})
    .subscribe(blob => {
      //after the array is retrieve. open the data with JSZip
      console.log('got (ui8Arra)');
      console.log(blob);
      console.log(blob.body);
      console.log(blob.headers);
      console.log(blob.headers.get('content-disposition'));
      const datafilename = this.getFileNameFromHttpResponse(blob.headers.get('content-disposition'));
      console.log(datafilename);
      this.openData(blob.body,datafilename);
    });
  }
   /*
   *ZipComponent.getFileNameFromHttpResponse()
  * splits content-dispotion header ; attachmenent file=filename.ext into file name
  * from stack overflow
  * @author Andrew Mitchem (1810-Oct08-Java-USF)
  */
  getFileNameFromHttpResponse(contentDispositionHeader) {
    var result = contentDispositionHeader.split(';')[1].trim().split('=')[1];
    return result.replace(/"/g, '');
  }
  /*
  * ZipComponent.sendRequest()
  * unpacks a zip blob(ui8array) and opens with JSZip (zip is the reference variable)
  * @param data. ui8array blob object that "is" a valid zip file.
  * @param datafilename, optional. passed in file name.
  * @author Andrew Mitchem (1810-Oct08-Java-USF)
  */
 openData(data , datafilename?){
  console.log("This is your data file: "+datafilename)
  this.RenderFile= [];
  let testfile = new  RenderFile();
  testfile.fileName = "HELP";
  testfile.fileContent = "HELLO: \n use the first 🗁 to open the remote saved codebase zip. \n or use the second 🗁 to open a local repo zip. \n ⌂ to return to the websites";
  this.SelectedFile = testfile;
  this.OpenFile = [];
  // console.log("hi")
  console.log("This is your data: " + data)
  let dataname ='';
  if(data.name)
      dataname = data.name.substring(0,data.name.lastIndexOf("."));
  else
      dataname = datafilename.substring(0,datafilename.lastIndexOf("."));
  console.log(dataname)
   let zip = new JSZip(); 
   //new instance of JSZip. note this object lifecycle needs to be undone after rendering
   //as such it not a class member but function member only for the scope of this function closure
   zip.loadAsync(data)
      .then(contents=>{
        console.log(contents)
        //console.log(this.RenderStrings)
        //move to the sub folder inside the zip file: replace with pass paramater variables
        let dirFolder =  zip.folder(dataname)
        console.log(dirFolder)
        console.log(dirFolder.folder(/src\/main\/java/))
        if(dirFolder.folder(/src\/main\/java/).length){
          console.log('Hi')
           dirFolder =  dirFolder.folder('src/main/java')
           console.log(dirFolder)
           this.filepath = dataname + '/src/main/java';
        }else{ 
          console.log('Hello')
          dirFolder =  dirFolder.folder('src/app')
          console.log(dirFolder)
          this.filepath = dataname + '/src/app';
        }
        let fileArray = dirFolder.file(/^.*/) //get the array of all files in this subdirectory 
        for(let i = 0; i < fileArray.length; i++){
          let file = fileArray[i]
          this.parseFiles(file);
        }
    })
}
   /*
  * ZipComponent.parseFiles(file)
  * opens and individual zip file. This method ignores files that are directories (ie. not files with contnet)
  * @param file. ZipObject (class of JSzip) to be unpacked into a normal blob object
  * @author Andrew Mitchem (1810-Oct08-Java-USF)
  */
  parseFiles(file) {
    // check if file is a directory
    if (!file.dir) {
        let fileName = file.name;
        // save ZipObject file name as once unzip into a  standard file  we loose acess to this data
        fileName = fileName.replace(this.filepath, '');
        fileName = fileName.substring(fileName.lastIndexOf('/') + 1);
        // remove leading path in name
        const helpme = file.async('uint8array').then(function (data) { // converts the ZipObject
          let string = '';
          string = new TextDecoder('utf-8').decode(data);
          return string;
        });
        helpme.then(string => {
          const file = new RenderFile();
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
  * RenderFile
  * SubClass for storing render related structure
  * @author Andrew Mitchem (1810-Oct08-Java-USF)
  */
class RenderFile {
  fileName: String;
  fileContent: String;
}
