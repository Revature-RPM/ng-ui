import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, Route } from '@angular/router';
import { MatCardModule, MatIconModule, MatInputModule, MatOptionModule, MatExpansionModule, MatSelectModule } from '@angular/material';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
import { BehaviorSubject, of } from 'rxjs';

import { ProjectListComponent } from '../project-list/project-list.component';
import { ProjectInfoComponent } from '../project-info/project-info.component';
import { NgxCarouselComponent } from '../ngx-carousel/ngx-carousel.component';
import { ProjectDescriptionComponent } from '../project-description/project-description.component';
import { EllipsisPipe } from 'src/app/ellipsis.pipe';
import { ProjectGridPageComponent } from './project-grid-page.component';
import { ProjectWelcomePageComponent } from '../project-welcome-page/project-welcome-page.component';
import { CodebasePageComponent } from '../../codebase-page/codebase-page.component';
import { ProjectEditComponent } from '../../project-edit/project-edit.component';
import { Project } from 'src/app/models/Project';

class MockProjectService {
  CurrentProject$: BehaviorSubject<Project> = new BehaviorSubject<Project>(null);
  project: Project;

  constructor() {
    this.project = {
      status: 'approved',
    };
    this.CurrentProject$.next(this.project);
  }
}

fdescribe('ProjectGridPageComponent', () => {
  let component: ProjectGridPageComponent;
  let fixture: ComponentFixture<ProjectGridPageComponent>;
  const routes: Route[] = [
    { path: 'codebase', component: CodebasePageComponent },
    { path: 'updateform', component: ProjectEditComponent },
  ];
  let mockRouter;

  beforeEach(async(() => {
    mockRouter = { navigate: jasmine.createSpy('navigate') };
    TestBed.configureTestingModule({
      declarations: [ ProjectGridPageComponent, ProjectListComponent,
        ProjectInfoComponent, NgxCarouselComponent,
        ProjectDescriptionComponent, ProjectWelcomePageComponent, 
        CodebasePageComponent, ProjectEditComponent,
        EllipsisPipe ],
      imports: [ MatCardModule, MatIconModule, MatInputModule,
        ReactiveFormsModule, MatOptionModule, 
        MatExpansionModule, MatSelectModule,
        NgxHmCarouselModule, HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes), NoopAnimationsModule,
        FormsModule, ReactiveFormsModule ],
      providers: [
        { provide: Router, useValue: mockRouter },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let project: Project = {status: 'approved'};

    fixture = TestBed.createComponent(ProjectGridPageComponent);
    component = fixture.componentInstance;
    component.project = project;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should tell ROUTER to navigate when CodeViewerButton is clicked',  async(() => {
      component.viewCodeBase();

      expect(mockRouter.navigate).toHaveBeenCalledWith( ['/codebase'] );
  }));

  it('should tell ROUTER to navigate when ProjectEditComponent is clicked',  async(() => {
      component.updateProject();

      expect(mockRouter.navigate).toHaveBeenCalledWith( ['/updateform'] );
  }));

  it('should call viewCodeBase when Code Base button is clicked',  () => {
    fixture.detectChanges();
    
    spyOn( component, 'viewCodeBase').and.callFake(function() { return null; });

    const button = fixture.debugElement.nativeElement.querySelector('#codeBaseButton');
    button.click();

    fixture.detectChanges();

    expect(component.viewCodeBase).toHaveBeenCalled();
  });
  
  it('should call updateProject when Update Project button is clicked',  () => {
    fixture.detectChanges();

    spyOn( component, 'updateProject').and.returnValue(null);

    const button = fixture.debugElement.nativeElement.querySelector('#updateProjectButton');
    button.click();

    fixture.detectChanges();

    expect(component.updateProject).toHaveBeenCalled();
  });

  it('should be able to Initialize', fakeAsync(() => {
    component.project = null;
    component.ngOnInit();
    tick();
    expect(component.project).toBeTruthy();
  }));
});
