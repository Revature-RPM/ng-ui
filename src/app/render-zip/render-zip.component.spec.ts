import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderZipComponent } from './render-zip.component';

describe('RenderZipComponent', () => {
  let component: RenderZipComponent;
  let fixture: ComponentFixture<RenderZipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderZipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderZipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
