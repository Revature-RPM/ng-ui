import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSubmissionPageComponent } from './project-submission-page.component';
import { MatCardModule, MatFormFieldModule, MatOptionModule, MatSelectModule,
  MatProgressSpinnerModule, MatDialogModule, MatSnackBarModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgMetaService } from 'ngmeta';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProjectSubmissionPageComponent', () => {
  let component: ProjectSubmissionPageComponent;
  let fixture: ComponentFixture<ProjectSubmissionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSubmissionPageComponent ],
      imports: [ MatCardModule, MatFormFieldModule, FormsModule,
        MatOptionModule, MatSelectModule,
        MatProgressSpinnerModule, MatDialogModule,
        MatSnackBarModule, MatInputModule,
        ReactiveFormsModule, RouterTestingModule,
        HttpClientTestingModule, NoopAnimationsModule],
      providers: [ NgMetaService ],
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
