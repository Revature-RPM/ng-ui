import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgxCarouselComponent} from './ngx-carousel.component';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('NgxCarouselComponent', () => {
  let component: NgxCarouselComponent;
  let fixture: ComponentFixture<NgxCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxCarouselComponent ],
      imports: [ FormsModule, ReactiveFormsModule, NgxHmCarouselModule,
        HttpClientTestingModule, RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
