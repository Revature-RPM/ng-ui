import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerDialogComponent } from './trainer-dialog.component';

describe('TrainerDialogComponent', () => {
  let component: TrainerDialogComponent;
  let fixture: ComponentFixture<TrainerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
