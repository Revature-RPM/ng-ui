import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSubmissionComponent } from './project-submission.component';

describe('ProjectSubmissionComponent', () => {
  let component: ProjectSubmissionComponent;
  let fixture: ComponentFixture<ProjectSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
