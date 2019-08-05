import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule, MatIconModule, MatInputModule, MatExpansionModule } from '@angular/material';
import {ProjectGridPageComponent} from './project-grid-page.component';
import { ProjectListComponent } from '../project-list/project-list.component';
import { ProjectInfoComponent } from '../project-info/project-info.component';
import { NgxCarouselComponent } from '../ngx-carousel/ngx-carousel.component';
import { ProjectDescriptionComponent } from '../project-description/project-description.component';
import { EllipsisPipe } from 'src/app/ellipsis.pipe';

describe('ProjectGridPageComponent', () => {
  let component: ProjectGridPageComponent;
  let fixture: ComponentFixture<ProjectGridPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectGridPageComponent, ProjectListComponent,
        ProjectInfoComponent, NgxCarouselComponent,
        ProjectDescriptionComponent, EllipsisPipe ],
      imports: [ MatCardModule, MatIconModule, MatInputModule,
        MatExpansionModule, FormsModule,
        ReactiveFormsModule, NgxHmCarouselModule,
        HttpClientTestingModule, RouterTestingModule,
        NoopAnimationsModule ]
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
