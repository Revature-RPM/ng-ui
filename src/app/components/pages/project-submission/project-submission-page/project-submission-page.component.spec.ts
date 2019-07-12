import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSubmissionPageComponent } from './project-submission-page.component';

describe('ProjectSubmissionPageComponent', () => {
  let component: ProjectSubmissionPageComponent;
  let fixture: ComponentFixture<ProjectSubmissionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSubmissionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSubmissionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
