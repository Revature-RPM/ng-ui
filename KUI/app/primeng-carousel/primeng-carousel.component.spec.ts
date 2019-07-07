import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimengCarouselComponent } from './primeng-carousel.component';

describe('PrimengCarouselComponent', () => {
  let component: PrimengCarouselComponent;
  let fixture: ComponentFixture<PrimengCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimengCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimengCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
