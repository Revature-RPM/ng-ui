import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { Router, Route } from '@angular/router';
import { MatCardModule, MatIconModule, MatInputModule, MatOptionModule, MatExpansionModule, MatSelectModule, MatListModule } from '@angular/material';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
import { BehaviorSubject, of } from 'rxjs';

import { ProjectListComponent } from '../project-list/project-list.component';
import { ProjectInfoComponent } from '../project-info/project-info.component';
import { NgxCarouselComponent } from '../ngx-carousel/ngx-carousel.component';
import { ProjectDescriptionComponent } from '../project-description/project-description.component';
import { EllipsisPipe } from 'src/app/ellipsis.pipe';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { Project } from 'src/app/models/Project';
import { HttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProjectGridPageComponent } from './project-grid-page.component';
import { ProjectWelcomePageComponent } from '../project-welcome-page/project-welcome-page.component';
import { ProjectEditComponent } from '../../project-edit/project-edit.component';
import { HighlightModule } from 'ngx-highlightjs';
import { hljsLanguages } from 'src/app/app.module';
import { CodebaseComponent } from '../../codebase/codebase.component';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/app/mocks/mock-project-service';
import { MockUserService } from 'src/app/mocks/mock-user-service';

describe('ProjectGridPageComponent', () => {
  let component: ProjectGridPageComponent;
  let fixture: ComponentFixture<ProjectGridPageComponent>;
  let router: Router;
  let routerSpy;
  let http: HttpClient;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectGridPageComponent, ProjectListComponent,
        ProjectInfoComponent, NgxCarouselComponent,
        ProjectDescriptionComponent, ProjectWelcomePageComponent, 
        CodebaseComponent, ProjectEditComponent,
        EllipsisPipe ],
      imports: [ MatCardModule, MatIconModule, MatInputModule,
        ReactiveFormsModule, MatOptionModule, 
        MatExpansionModule, MatSelectModule,
        NgxHmCarouselModule, HttpClientTestingModule,
        RouterTestingModule, NoopAnimationsModule,
        FormsModule, ReactiveFormsModule, MatListModule,
        HighlightModule.forRoot({ languages: hljsLanguages }) ],
        schemas: [NO_ERRORS_SCHEMA],
      providers: [ { provide: ProjectService, useClass: MockProjectService },
        { provide: UserService, useClass: MockUserService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    routerSpy = spyOn(router, 'navigate').and.callFake(function() { return null; });

    store = {};

    spyOn(localStorage, 'setItem').and
      .callFake(function(key, value) {store[key] = value;});
    spyOn(localStorage, 'getItem').and
      .callFake(function(key) { return store[key]; });
    spyOn(localStorage, 'clear').and
      .callFake(function() { store = {}; });

    fixture = TestBed.createComponent(ProjectGridPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    router = null;
    routerSpy = null;
    fixture = null;
    component = null;
    store = null;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be visible', () => {
    let userService = new UserService(http);

    spyOn(userService, 'getCurrentUser').and.returnValue({id: 1,
      firstName: 'mike',
      lastName: 'sam',
      email: 'hello@revature.com',
      username: 'samike',
      password: 'test123',
      role: 'ROLE_ADMIN'});

    let user = userService.getCurrentUser();
    let project = {
      userId: 1
    };
    if (user.id === project.userId || user.role === 'ROLE_ADMIN') {
      expect(fixture.debugElement.query(By.css('#editbtn'))).toBeFalsy();
    }
  });

  it('shoould load user from localStorage if available', () => {
    let user = {firstName: 'Bill', lastName: 'BoBaggins'};
    localStorage.setItem('user', JSON.stringify(user));

    component.ngOnInit();

    expect(component.user).toEqual(user);
  });

  it('should fail to set project if given a falsey value', () => {
    let projectService = TestBed.get(ProjectService);
    projectService.CurrentProject$ = new BehaviorSubject<Project>(null);

    component.project = null;

    component.ngOnInit();

    expect(component.project).toBeNull();
  });

  it('should fail to set user if given a falsey value', () => {
    let userService = TestBed.get(UserService);
    userService.user = new BehaviorSubject<User>(null);

    component.user = null;
    localStorage.clear(); // Must ensure there is no user in localStorage

    component.ngOnInit();

    expect(component.user).toBeNull();
  });

});
