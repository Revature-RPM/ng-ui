import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsPendingApprovalPageComponent } from './projects-pending-approval-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule, MatPaginatorModule, MatListModule, MatGridListModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('ProjectsPendingApprovalPageComponent', () => {
  let component: ProjectsPendingApprovalPageComponent;
  let fixture: ComponentFixture<ProjectsPendingApprovalPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatListModule,
        MatGridListModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      declarations: [ProjectsPendingApprovalPageComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsPendingApprovalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should NOT show project viewer if selected is false', () => {
    expect(fixture.debugElement.query(By.css('.project-viewer'))).toBeNull();
  });

});
