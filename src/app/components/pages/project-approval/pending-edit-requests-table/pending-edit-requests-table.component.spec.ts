import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingEditRequestsTableComponent } from './pending-edit-requests-table.component';

describe('PendingEditRequestsTableComponent', () => {
  let component: PendingEditRequestsTableComponent;
  let fixture: ComponentFixture<PendingEditRequestsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingEditRequestsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingEditRequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
