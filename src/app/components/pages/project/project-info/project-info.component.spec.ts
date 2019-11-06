import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';

import {ProjectInfoComponent} from './project-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/app/mocks/mock-project-service';

describe('ProjectInfoComponent', () => {
  let component: ProjectInfoComponent;
  let fixture: ComponentFixture<ProjectInfoComponent>;
  let router: Router;
  let routerSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectInfoComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [{provide: ProjectService, useClass: MockProjectService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInfoComponent);
    component = fixture.componentInstance;

    router = TestBed.get(Router);
    routerSpy = spyOn(router, 'navigate')
      .and.callFake(function() { return null; }); 
 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    let projService = TestBed.get(ProjectService);
    let proj = projService.CurrentProject;
    expect(component.project).toEqual(proj);

  });

  it('on update move to /updateform route', () => {
    component.updateProject();
    //move to a differnt page if project is truthy
    expect(routerSpy).toHaveBeenCalledWith(['/updateform']);

  });

  it('devString should return a string', () => {
    
    let string = component.devString();
    console.log(string);
    expect(string).toBeTruthy();
    expect(string).toEqual("Mike, Molly, Sam");
  });
});
