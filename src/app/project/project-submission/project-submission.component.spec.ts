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
  let testUser: User

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
    service = TestBed.get(UserService);
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should display \'Project Name\' in mat-label', () => {
    expect(fixture.debugElement.query(By.css('mat-label')).nativeElement.textContent).toContain('Project Name');
  });

  /**
   * testing that when the project submission component is rendered, if the user is null
   * then the user should be navigated back to login
   * 
   * @author Alex Johnson (190107-Java-Spark-USF)
   */
  it('should navigate to login if the user is null', () => {

    router = TestBed.get(Router);
    localStorage.clear();
    localStorage.setItem('user', null);
    let navigateSpy = spyOn(router, 'navigate');

    component.ngOnInit();

    expect(navigateSpy).toHaveBeenCalledWith(['/auth/login']);
  });

  /**
   * Test ngOnit if userService.getUser is not null
   * 
   * @author Gabriel Zapata, Alex Johnson (010719-Java-Spark-USF)
   */
  xit('should verify ngOninit feilds if userService.getUser is not null',()=>{
    testUser ={
      role:'test'
    }
    localStorage.setItem('user','testUser');
    let spy = spyOn(service,'getUser').and.returnValue(testUser);

    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.projectToUpload.groupMembers).toBeTruthy();
    expect(component.projectToUpload.screenShots).toBeTruthy();
    expect(component.groupMemberString).toBeFalsy();
    expect(component.zipLinksString).toBeFalsy();
    expect(component.githubURL).toBeTruthy();
    expect(component).toBe(testUser);
  });

});
