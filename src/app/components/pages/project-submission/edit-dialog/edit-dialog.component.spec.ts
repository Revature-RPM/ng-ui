import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogComponent } from './edit-dialog.component';
import { MatDialogModule, MatFormFieldModule, MatTooltipModule, MatDialogRef, MatDialog } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectSubmissionPageComponent } from '../project-submission-page/project-submission-page.component';

describe('EditDialogComponent', () => {
  let component: EditDialogComponent;
  let fixture: ComponentFixture<EditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDialogComponent, ProjectSubmissionPageComponent ],
      imports: [MatDialogModule, 
        MatFormFieldModule,
        MatTooltipModule,
        MatDialogRef,
        MatDialog,
        FormsModule,
        ReactiveFormsModule],
      providers: [],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
