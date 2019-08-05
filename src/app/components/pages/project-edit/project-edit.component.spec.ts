import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectEditComponent} from './project-edit.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from 'src/app/services/user.service';
import {ProjectService} from 'src/app/services/project.service';
import {Router} from '@angular/router';
import { NgMetaService } from 'ngmeta';
import { MatIconModule, MatCardModule, MatFormFieldModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

/**
 * Edit Project tests.
 * Skipped tests do not work- router is not being correctly mocked. Use below resource for more information on mocking a router.
 * https://codecraft.tv/courses/angular/unit-testing/routing/
 * @author Gabriel Zapata | Fadi Alzoubi | Slavik Gleanco | Alex Johnson | Edward Bechtold | (190107-Java-Spark-USF)
 */
describe('ProjectEditComponent', () => {
  let component: ProjectEditComponent;
  let fixture: ComponentFixture<ProjectEditComponent>;
  let userService: UserService;
  let projectService: ProjectService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEditComponent ],
      imports: [MatIconModule, MatCardModule, MatFormFieldModule,
        MatOptionModule, MatSelectModule,
        HttpClientTestingModule, RouterTestingModule,
        BrowserAnimationsModule, FormsModule,
        ReactiveFormsModule],
      providers: [ NgMetaService, ProjectService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    projectService = TestBed.get(ProjectService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Back function on component sets 'lastPage' in sessionStorage to 'edit'.
   * the 'toBe' matcher expects an exact match.
   * @author Edward Bechtold | Gabriel Zapata | (190107-Java-Spark-USF)
   */
  it('should set sessionStorage appropriately after back() function is called', () => {

    component.back();

    expect(sessionStorage.getItem('lastPage')).toBe('edit');
  });

  /**
   * AddGroupMember function should add a value to the updatedArr. The array
   * will have a value of truthy if a value is successfully added to it.
   * @author Gabriel Zapata | Edward Bechtold | (190107-Java-Spark-USF)
   */
  it('should add a group member to the updatedArr', () => {

    component.projectToUpdate.groupMembers = [];
    component.groupMember = 'test';
    let updatedArr = component.projectToUpdate;
    component.addGroupMember();

    expect(updatedArr).toBeTruthy();
  });

  /**
   * Supposed to test initialization variables within ngoninit. Implementation is wrong but might be salvageable.
   * Remove 'x' from 'xit' to unskip.
   * @author Gabriel Zapata | Edward Bechtold | (190107-Java-Spark-USF)
   */
  xit('should test initialization variables', () => {
    let testUser = {
      username: 'test'
    };
    let spy = spyOn(userService, 'getCurrentUser').and.returnValue(testUser);

    component.projectToUpdate.groupMembers = null;
    component.projectToUpdate.screenShots = null;
    component.projectToUpdate.zipLinks = null;

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
    expect(component.projectToUpdate.groupMembers).toBeTruthy();
    expect(component.projectToUpdate.screenShots).toBeTruthy();
    expect(component.projectToUpdate.zipLinks).toBeTruthy();
  });

  /**
   * This method should test if fields are invalid inside checkForValidField function.
   * @author Gabriel Zapata | Alex Johnson | (190107-Java-Spark-USF)
   */
  it('should validateFields', () => {
    let nameField = { valid: false };
    let batchField = { valid: false };
    let trainerField = { valid: false };
    let descriptionField = { valid: false };
    let techStackField = { valid: false };

    component.checkForValidField(nameField, batchField, trainerField, descriptionField, techStackField);

    expect(component.validForm).toBeFalsy();
  });

  /**
   * testing that when the edit-project component is rendered, if the user is null
   * then the user should be navigated back to login
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
   * The tested method should navigate to home.
   * Implementation is not correct ; needs refactoring.
   * @author Alex Johnson (190107-Java-Spark-USF)
   */
  xit('should navigate to home', () => {

    router = TestBed.get(Router);
    let navigateSpy = spyOn(router, 'navigate');

    component.submitForm();

    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });

  /**
   * The deleteProject() method should navigate to home.
   * Implementation is not correct ; needs refactoring.
   * @author Alex Johnson (190107-Java-Spark-USF)
   */
  xit('should navigate to home', () => {

    router = TestBed.get(Router);
    let navigateSpy = spyOn(router, 'navigate');

    component.deleteProject();

    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });

  /**
   * The back() method should navigate to home.
   * @author Alex Johnson (190107-Java-Spark-USF)
   */
  it('should navigate to home', () => {

    router = TestBed.get(Router);
    let navigateSpy = spyOn(router, 'navigate');

    component.back();

    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });

});
