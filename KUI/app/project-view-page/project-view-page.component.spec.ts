import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectViewPageComponent } from './project-view-page.component';

describe('ProjectViewPageComponent', () => {
  let component: ProjectViewPageComponent;
  let fixture: ComponentFixture<ProjectViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectViewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
