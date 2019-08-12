import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

import {AppModule} from 'src/app/app.module';
import {ZipComponent} from './zip.component';
import {ZipFileExplorerModule} from '../zip-file-explorer.module';
import {ProjectService} from 'src/app/services/project.service';

xdescribe('ZipComponent', () => {
  let component: ZipComponent;
  let fixture: ComponentFixture<ZipComponent>;
  let router: Router;
  let projectService:ProjectService;
  let renderFile: any;
  class RenderFile {
    fileName: String;
    fileContent: String;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [BrowserAnimationsModule, RouterTestingModule, ZipFileExplorerModule, AppModule],
      providers: [ProjectService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipComponent);
    component = fixture.componentInstance;
    projectService = TestBed.get(ProjectService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * testing that when the zip component is rendered, if the user is null
   * then the user should be navigated back to login
   *
   * Remove the 'x' from 'xit' to run this test. Does not work because router is not properly mocked.
   * @author Alex Johnson (190107-Java-Spark-USF)
   */
  xit('should navigate to login if the user is null', () => {

    fixture.detectChanges();
    router = TestBed.get(Router);
    localStorage.clear();
    localStorage.setItem('user', null);
    let navigateSpy = spyOn(router, 'navigate');

    component.ngOnInit();

    expect(navigateSpy).toHaveBeenCalledWith(['/auth/login']);
  });

  /**
   * This test should display error messages. This test does not function properly. Refactor.
   *
   * @author Gabriel Zapata | Edward Bechtold (190107-Java-Spark-USF)
   */
  xit('should call ErrorFile an error', () => {

    fixture.detectChanges();
    let message = 'test';

    component.errorFile(message);

    expect(message).toBeTruthy();
  });

  /**
   * This tests the safeTitle method to ensure links are being properly created.This test does not function properly. Refactor.
   *
   * @author Gabriel Zapata | Edward Bechtold (190107-Java-Spark-USF)
   */
  xit('should return a substring of link', () => {

    fixture.detectChanges();
    let link = 'test';

    component.safeTitle(link);

    expect(link).toBe('test');
  });

  /**
   * Test will verify ngOnInit field SelectedFile to be truthy. This test does not function properly. Refactor.
   *
   * @author Gabriel Zapata (190107-Java-Spark-USF)
   */

  xit('should verify to fields if the user is NOT null', () => {

    let testFile: RenderFile;
    testFile = {
      fileName: 'testFileName',
      fileContent: 'testFileContent'
    };


    spyOn(component, 'defaultFile').and.returnValue(testFile);
    component.ngOnInit();

    expect(component.SelectedFile).toBeTruthy();
  });


   /**
    * Test openRenderFile.
    *
   * @author Gabriel Zapata (190107-Java-Spark-USF)
    *
   */
   it('should test openRenderFile and verify that testFile is being added to OpenFile ', () => {
     let testFile: RenderFile;
     testFile = {
      fileName: 'testFileName',
      fileContent: 'testFileContent'
    }
    component.OpenFile = [];

    component.openRenderFile(testFile);

    expect(component.SelectedFile).toBe(testFile);
    expect(component.OpenFile).toContain(testFile);

  })

   /**
   * Test closeRenderFile.
    *
   * @author Gabriel Zapata (190107-Java-Spark-USF)
    *
   */

  it('should test closeRenderFile if OpenFile array removes testFile but still contain testFile2  ',()=>{
    let testFile: RenderFile;
    testFile ={
      fileName: 'testFileName',
      fileContent: 'testFileContent'
    }
    let testFile2: RenderFile;
    testFile = {
      fileName: 'testFileName',
      fileContent: 'testFileContent'
    }

    component.OpenFile = [testFile,testFile2];
    spyOn(component,'defaultFile').and.returnValue(testFile2);

    component.closeRenderFile(testFile);

    expect(component.OpenFile).toContain(testFile2);
    expect(component.SelectedFile).toBe(testFile2);

  })

   /**
   * Test to ensure getFileNameFromHttpResponse is called.
   * This was one of the first tests I wrote and I didn't know what I was doing. Should be refactored. Works tho
    *
   * @author Gabriel Zapata (190107-Java-Spark-USF)
   */

  it('should test getFileNameFromHttpResponse with testContentDispositionHeader',()=>{
    let testContentDispositionHeader = ['test=1; test=2; test=3;'].toString();
    component.getFileNameFromHttpResponse(testContentDispositionHeader);


  })
  /**
   * Test openData function with a not null name.
   *
   * @author Gabriel Zapata (190107-Java-Spark-USF)
   */

  it('should verify RenderFile, Select, OpenFile, with data.name is truthy should be truthy',() =>{
    let data={
      name: 'testName'
    }
    let datafilename;

    component.openData(data,datafilename);

    expect(component.OpenFile).toBeTruthy();


  })

   /**
   * Test openData function with a parameter of 'test' on the datafilename.
    *
   * @author Gabriel Zapata (190107-Java-Spark-USF)
   */

  it('should verify RenderFile, Select, OpenFile, with data.name is falsy OpenFile should be truthy',() =>{
    let data={
      name: ''
    }
    let datafilename = 'test'


    component.openData(data,datafilename);

    expect(component.OpenFile).toBeTruthy();
  })


});
