import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { MatCardModule, MatIconModule, MatInputModule, MatExpansionModule } from '@angular/material';
import {ProjectGridPageComponent} from './project-grid-page.component';
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

fdescribe('ProjectGridPageComponent', () => {
  let component: ProjectGridPageComponent;
  let fixture: ComponentFixture<ProjectGridPageComponent>;
  let user: User;
  let project: Project;
  let userService: UserService;
  let http: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectGridPageComponent, ProjectListComponent,
        ProjectInfoComponent, NgxCarouselComponent,
        ProjectDescriptionComponent, EllipsisPipe ],
      providers: [UserService],
      imports: [ MatCardModule, MatIconModule, MatInputModule,
        MatExpansionModule, FormsModule,
        ReactiveFormsModule, NgxHmCarouselModule,
        HttpClientTestingModule, RouterTestingModule,
        NoopAnimationsModule ],
        schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectGridPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

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
});
