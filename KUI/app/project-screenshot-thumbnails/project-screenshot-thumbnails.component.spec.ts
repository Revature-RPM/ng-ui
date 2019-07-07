import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectScreenshotThumbnailsComponent } from './project-screenshot-thumbnails.component';

describe('ProjectScreenshotThumbnailsComponent', () => {
  let component: ProjectScreenshotThumbnailsComponent;
  let fixture: ComponentFixture<ProjectScreenshotThumbnailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectScreenshotThumbnailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectScreenshotThumbnailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
