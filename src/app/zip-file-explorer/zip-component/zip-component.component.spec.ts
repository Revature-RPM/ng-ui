import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipComponentComponent } from './zip-component.component';
import * as JSZip from 'jszip';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
describe('ZipComponentComponent', () => {
  let component: ZipComponentComponent;
  let fixture: ComponentFixture<ZipComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZipComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
