import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatExpansionModule } from '@angular/material';
import {ProjectListComponent} from './project-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {ProjectService} from 'src/app/services/project.service';
import { MockProjectService } from 'src/app/mocks/mock-project-service';
import { EllipsisPipe } from '../../../../ellipsis.pipe';
import { projection, detectChanges } from '@angular/core/src/render3';
import { BehaviorSubject } from 'rxjs';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let projectService: ProjectService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectListComponent, EllipsisPipe ],
      imports: [ MatExpansionModule, RouterTestingModule, HttpClientTestingModule,
        NoopAnimationsModule],
      providers: [{ provide: ProjectService, useClass: MockProjectService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProjectByUserID when userId is undefined', () => {
    component.projectList = null;
    projectService = TestBed.get(ProjectService);
    
    let retVal = component.loadProjects(undefined);
    fixture.detectChanges();
    
    expect(retVal).toBeTruthy();
  });
  
  it('should call getAllProjects when userId is not undefined', async(() => {
    component.projectList = null;
    projectService = TestBed.get(ProjectService);
    
    let retVal = component.loadProjects(true);
    fixture.detectChanges();
    
    expect(retVal).toBeTruthy();
  }));

  xit('should call swap project when expected', async(() => {
    projectService = TestBed.get(ProjectService);
    let project$ = projectService.CurrentProject$;

    let projectSpy = spyOn(project$, 'next');
    fixture.detectChanges();

    expect(projectSpy).toHaveBeenCalled();
  }));

});
