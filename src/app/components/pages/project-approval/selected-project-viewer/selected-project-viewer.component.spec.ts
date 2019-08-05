import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedProjectViewerComponent } from './selected-project-viewer.component';

describe('SelectedProjectViewerComponent', () => {
  let component: SelectedProjectViewerComponent;
  let fixture: ComponentFixture<SelectedProjectViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedProjectViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedProjectViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
