import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWelcomePageComponent } from './project-welcome-page.component';

describe('ProjectWelcomePageComponent', () => {
  let component: ProjectWelcomePageComponent;
  let fixture: ComponentFixture<ProjectWelcomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWelcomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWelcomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
