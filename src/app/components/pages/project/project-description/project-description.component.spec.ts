import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {ProjectDescriptionComponent} from './project-description.component';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/app/mocks/mock-project-service';

describe('ProjectDescriptionComponent', () => {
  let component: ProjectDescriptionComponent;
  let fixture: ComponentFixture<ProjectDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDescriptionComponent],
      imports: [ HttpClientTestingModule],
      providers: [{provide: ProjectService, useClass: MockProjectService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on init fill the variables', () => {
    component.ngOnInit();
    expect(component.project).toBeTruthy();
    expect(component.displayText).toBeTruthy();
  });
  
});
