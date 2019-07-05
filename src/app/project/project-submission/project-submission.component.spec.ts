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
 * 
 * @author Gabriel Zapata | Slavik Gleanco | Fadi Alzoubi | Alex Johnson | Edward Bechtold | (190107-Java-Spark-USF)
 */
describe('ProjectSubmissionComponent', () => {
  let component: ProjectSubmissionComponent;
  let fixture: ComponentFixture<ProjectSubmissionComponent>;
  let router: Router;
  let service: UserService;
  let testUser: User


  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule, AppModule]

    })
    .compileComponents().then( () => {
      fixture = TestBed.createComponent(ProjectSubmissionComponent);
      component = fixture.componentInstance;
      service = TestBed.get(UserService);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * testing that when the project submission component is rendered, if the user is null
   * then the user should be navigated back to login
   * 
   * @author Alex Johnson (190107-Java-Spark-USF)
   */
  it('should navigate to login if a jwt doesnt exist', () => {

    router = TestBed.get(Router);
    localStorage.clear();
    localStorage.setItem('jwt', null);
    let navigateSpy = spyOn(router, 'navigate');

    component.ngOnInit();

    expect(navigateSpy).toHaveBeenCalledWith(['/auth/login']);
  });
  
  /**
   * Test ngOnInit if a jwt is in storage and a user is stored in user service.
   * A group member with the account's firstname and lastname should automatically be populated
   * 
   * @author Gabriel Zapata | Alex Johnson | (190107-Java-Spark-USF) | Justin Kerr (190422-Java-Spark-USF)
   * 
   */
  it('on ngOnInity, should verify that the account is in the group members field', ()=>{
    
    localStorage.setItem('jwt', 'hi');

    let testUser: User;
    testUser ={
      username:'testUsername',
      password:'testPassword',
      firstName: 'testFirstName',
      lastName: 'testLastName',
      role:'test'
    }
    service.user = testUser;
    
    spyOn(service,'getUser').and.returnValue(testUser);

    component.ngOnInit();
 
    expect(component.projectToUpload.groupMembers).toContain('testFirstName + " " + testLastName');
  
  });

   /**
    * For both the 'add group members' and 'add github links' fields,
    * calling the openEditableDialog function should update the appropriate field with their new values
    * 
    * @author Justin Kerr (190422-Java-Spark-USF)
   */
  it('should verify openEditableDialog fields if id is not inputGroupMembers',()=>{
    let event = {
      target : {
        id :'inputGroupMembers'
      }
    }

    component.openEditableDialog(event);

    if (event.target.id === 'inputGroupMembers') {
      expect(component.projectToUpload.groupMembers).toHaveBeenCalled();
      expect(component.projectToUpload.zipLinks).toBeFalsy;
    }
    else if (event.target.id === 'inputGithubLink') {
      expect(component.projectToUpload.groupMembers).toBeFalsy();
      expect(component.projectToUpload.zipLinks).toHaveBeenCalled();
    }
    else {
      expect(component.projectToUpload.groupMembers).toBeFalsy();
      expect(component.projectToUpload.zipLinks).toBeFalsy();
    }
    
  });
    
  /**
   * Testing whether submitting fields is valid with a valid entry.
   * 
   * @author Gabriel Zapata (010719-Java-Spark-USF)
   */
  it('should test submitForm ',() =>{
    component.projectToUpload = {
      groupMembers : ['testGroupMember'],
      screenShots :  ['testScreenShots'],
      zipLinks : ['testZip'],
    }
    component.projectToUpload.groupMembers = ['test'];
    component.submitForm();
    expect(component.submitting).toBeTruthy();
    
  })

    /**
     * This is similar to the above, 'openEditableDialog', but with 'onFileSelected' instead.
     * 
    * @author Gabriel Zapata (010719-Java-Spark-USF)
   */  
    it('should test stuff',()=>{

      let event = {
        target : {
          files :'test'
        }
      }
      component.projectToUpload ={
        screenShots: ['test']
      }

      component.onFileSelected(event);

      expect(component.validScreenshots).toBeTruthy();
    })
});
