import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingProjectsTableComponent } from './pending-projects-table.component';

describe('PendingProjectsTableComponent', () => {
  let component: PendingProjectsTableComponent;
  let fixture: ComponentFixture<PendingProjectsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingProjectsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingProjectsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
