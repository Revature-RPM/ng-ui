import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatExpansionModule } from '@angular/material';

import { EllipsisPipe } from 'src/app/ellipsis.pipe';
import {ProjectListComponent} from './project-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectListComponent, EllipsisPipe ],
      imports: [ MatExpansionModule, RouterTestingModule, HttpClientTestingModule,
        NoopAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
