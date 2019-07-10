import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectGridPageComponent} from './project-grid-page.component';

describe('ProjectGridPageComponent', () => {
  let component: ProjectGridPageComponent;
  let fixture: ComponentFixture<ProjectGridPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectGridPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectGridPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
