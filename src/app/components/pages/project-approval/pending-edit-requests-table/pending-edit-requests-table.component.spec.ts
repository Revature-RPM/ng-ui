import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingEditRequestsTableComponent } from './pending-edit-requests-table.component';
import { Project } from 'src/app/models/Project';

describe('PendingEditRequestsTableComponent', () => {
  let component: PendingEditRequestsTableComponent;
  let fixture: ComponentFixture<PendingEditRequestsTableComponent>;
  let row: Project;


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

  it('should emit on click', () => {
    spyOn(component.swapProject, 'emit');
    const nativeElement = fixture.nativeElement;
    const matRow = nativeElement.querySelector('mat-row');
    matRow.dispatchElement(new Event('click'));
    fixture.detectChanges();

    expect(component.swapProject.emit).toHaveBeenCalledWith(this.row);
  });
});
