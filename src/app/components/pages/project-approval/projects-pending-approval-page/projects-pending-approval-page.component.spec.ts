import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsPendingApprovalPageComponent } from './projects-pending-approval-page.component';

describe('ProjectsPendingApprovalPageComponent', () => {
  let component: ProjectsPendingApprovalPageComponent;
  let fixture: ComponentFixture<ProjectsPendingApprovalPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsPendingApprovalPageComponent ]
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
});
