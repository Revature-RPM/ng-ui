import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {ProjectDescriptionComponent} from './project-description.component';

describe('ProjectDescriptionComponent', () => {
  let component: ProjectDescriptionComponent;
  let fixture: ComponentFixture<ProjectDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDescriptionComponent],
      imports: [ HttpClientTestingModule],
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
    expect(component.project).toBeFalsy();
    expect(component.displayText).toBeFalsy();
  });

  it('on init fill the variables', () => {
    component.ngOnInit();
    expect(component.project).toBeTruthy();
    expect(component.displayText).toBeTruthy();
  });
  
});
