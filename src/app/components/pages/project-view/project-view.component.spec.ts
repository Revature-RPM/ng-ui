import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectViewComponent } from './project-view.component';
import { MatIconModule, MatCardModule, MatSnackBarModule } from '@angular/material';
import { ProjectInfoComponent} from '../project/project-info/project-info.component';
import { NgxCarouselComponent } from '../project/ngx-carousel/ngx-carousel.component';
import { ProjectDescriptionComponent } from '../project/project-description/project-description.component'; 
import { FormsModule } from '@angular/forms';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {Router, RouterModule} from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/app/mocks/mock-project-service';
import { UserService } from 'src/app/services/user.service';
import { MockUserService } from 'src/app/mocks/mock-user-service';

describe('ProjectViewComponent', () => {
  let component: ProjectViewComponent;
  let fixture: ComponentFixture<ProjectViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectViewComponent, ProjectInfoComponent, NgxCarouselComponent, ProjectDescriptionComponent ],
      imports: [MatIconModule, MatCardModule, FormsModule, NgxHmCarouselModule,
        RouterTestingModule, HttpClientTestingModule, MatSnackBarModule, RouterModule
      ], 
      providers: [{provide: ProjectService, useClass: MockProjectService},
      {provide: UserService, useClass: MockUserService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    
    expect(component).toBeTruthy();
  });
});
