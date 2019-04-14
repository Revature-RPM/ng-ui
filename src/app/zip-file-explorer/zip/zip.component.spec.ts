import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { AppModule} from '../../app.module';
import { ZipComponent } from './zip.component';
import { ZipFileExplorerModule } from '../zip-file-explorer.module';

fdescribe('ZipComponent', () => {
  let component: ZipComponent;
  let fixture: ComponentFixture<ZipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [BrowserAnimationsModule, RouterTestingModule, AppModule, ZipFileExplorerModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  /**
   * This test should display error messages
   * @Author Gabriel Zapata and Edward Bechtold (190107-Java-Spark-USF)
   */
  xit('should throw an error', () => {
    let message = 'test';
    
    component.errorFile(message);
    
    expect(message).toBeTruthy();
  })

  /**
   * This tests the safeTitle method to ensure links are being properly created
   */
  xit('should return a substring of link', () => {
    let link = 'test';
    
    component.safeTitle(link);

    expect(component.safeTitle).toBe('test/');
  })
  
});
