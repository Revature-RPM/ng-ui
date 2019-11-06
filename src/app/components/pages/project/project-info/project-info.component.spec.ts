import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectInfoComponent} from './project-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProjectInfoComponent', () => {
  let component: ProjectInfoComponent;
  let fixture: ComponentFixture<ProjectInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectInfoComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    component.ngOnInit();

  });

  it('on update move to /updateform route', () => {
    component.updateProject();
    //move to a differnt page if project is truthy
  });

  it('devString should return a string', () => {
    component.ngOnInit();
    let string = component.devString();
    expect(string).toBeTruthy();
  });
});
