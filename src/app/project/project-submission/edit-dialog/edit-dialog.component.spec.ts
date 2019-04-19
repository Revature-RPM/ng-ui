import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from 'src/app/shared/shared.module';
import { AppModule } from 'src/app/app.module';
import { ProjectModule } from '../../project.module';
import { ProjectService } from 'src/app/core/services/project.service';

import { EditDialogComponent } from './edit-dialog.component';
import { AuthenticationModule } from 'src/app/authentication/authentication.module';

/**
 * The line below are the imports that correlate to the 'providers' fix in line 36.
 * Uncomment both this code and the code in line 38 to fix.
 * import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
 * 
 * @author Slavik Gleanco | Edward Bechtold | Gabriel Zapata | (190107-Java-Spark-USF)
 */
/**
 * This component is unreachable. Testing could not be achieved. Consider refactoring component. Might be fixed with imports.
 * @author Gabriel Zapata | Slavik Gleanco | Fadi Alzoubi | Alex Johnson | Edward Bechtold | (190107-Java-Spark-USF)
 */
describe('EditDialogComponent', () => {
  let component: EditDialogComponent;
  let fixture: ComponentFixture<EditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDialogComponent ],
      imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule, AppModule, ProjectModule, AuthenticationModule],
      providers: [ProjectService
      
      /**
       * Uncomment the below code to fix the import issues with the provider. This is the answer to some 
       * of the problems we had in testing this component.
       * (Make sure you don't forget the comma at the start, and the closing bracket currently on line 41!)
       * 
       * , {provide: MatDialogRef, useValue: {}}, { provide: MAT_DIALOG_DATA, useValue: {}}
       * 
       * @author Slavik Gleanco | Edward Bechtold | Gabriel Zapata | (190107-Java-Spark-USF)
       */

      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
