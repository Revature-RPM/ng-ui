import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PendingEditRequestsTableComponent } from './pending-edit-requests-table.component';
import { MatTableModule, MatPaginatorModule, MatListModule, MatGridListModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PendingEditRequestsTableComponent', () => {
  let component: PendingEditRequestsTableComponent;
  let fixture: ComponentFixture<PendingEditRequestsTableComponent>;

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
      declarations: [PendingEditRequestsTableComponent]
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

  it('should test the pending edit request table headers', () => {
    fixture.detectChanges();
    const matHeaderCell = fixture.nativeElement.querySelectorAll('mat-header-cell');
    expect(matHeaderCell.length).toBe(3);

    expect(matHeaderCell[0].innerHTML).toBe(' Trainer\'s Name ');
    expect(matHeaderCell[1].innerHTML).toBe(' Project\'s Name ');
    expect(matHeaderCell[2].innerHTML).toBe(' Status of Request ');
  });
});
