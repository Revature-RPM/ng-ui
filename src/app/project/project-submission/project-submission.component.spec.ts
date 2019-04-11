import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { ProjectSubmissionComponent } from './project-submission.component';
import { AppModule } from 'src/app/app.module';
import { By } from '@angular/platform-browser';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/User';

/**
 * This test suite serves to check the proper creation of the ProjectSubmission
 * component as well the as well as the functionality
 * of the various methods within it.
 * @author Ryan Beevers | Shawn Bickel | Sahil Makhijani | Andrew Mitchem | Yuki Mano | Jeffly Luctamar | (1810-Oct08-Java-USF)
 */
describe('ProjectSubmissionComponent', () => {
  let component: ProjectSubmissionComponent;
  let fixture: ComponentFixture<ProjectSubmissionComponent>;
  let router: Router;
  let service: UserService;
  let testUser: User = {
    id: 10000,
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alexjohnson4564@gmail.com',
    username: 'alexj4564',
    password: 'Password1234',
    role: 'admin'
 };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule, AppModule]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display \'Project Name\' in mat-label', () => {
    expect(fixture.debugElement.query(By.css('mat-label')).nativeElement.textContent).toContain('Project Name');
  });

  /**
   * testing that when the project submission component is rendered, if the user is null
   * then the user should be navigated back to login
   * 
   * @author Alex Johnson (190107-Java-Spark-USF)
   */
  it('should navigate to login if the user is null', () => {

    localStorage.setItem('user', null);
    let navigateSpy = spyOn(router, 'navigate');

    component.ngOnInit();

    expect(navigateSpy).toHaveBeenCalledWith(['/auth/login']);
  })

  it('should do stuff', () => {

    service = TestBed.get(UserService);
    spyOn(service,'getUser').and.returnValue(testUser);

    component.ngOnInit();

    expect(component.projectToUpload.groupMembers).toBe([]);
  })

});
