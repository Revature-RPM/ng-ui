import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PendingProjectsTableComponent } from './pending-projects-table.component';
import { MatTableModule, MatPaginatorModule, MatListModule, MatGridListModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PendingProjectsTableComponent', () => {
  let component: PendingProjectsTableComponent;
  let fixture: ComponentFixture<PendingProjectsTableComponent>;

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
      declarations: [PendingProjectsTableComponent]
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

  xit('should test the pending projects table headers', () => {
    fixture.detectChanges();
    const matHeaderCell = fixture.nativeElement.querySelectorAll('mat-header-cell');
    expect(matHeaderCell.length).toBe(3);

    expect(matHeaderCell[0].innerHTML).toBe(' Trainer\'s Name ');
    expect(matHeaderCell[1].innerHTML).toBe(' Project\'s Name ');
    expect(matHeaderCell[2].innerHTML).toBe(' Status of Request ');
  });

});
