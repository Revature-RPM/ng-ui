import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectedProjectViewerComponent } from './selected-project-viewer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockProjectService } from 'src/app/mocks/mock-project-service';
import { ProjectService } from 'src/app/services/project.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('SelectedProjectViewerComponent', () => {
  let component: SelectedProjectViewerComponent;
  let fixture: ComponentFixture<SelectedProjectViewerComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedProjectViewerComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      providers: [{provide: ProjectService, useClass: MockProjectService}],

      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedProjectViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be instantiated with a project', () => {

    expect(component.project.name).toEqual('Fake Project');
  });

  it('should call approveProject Method', () => {
    let projectService = TestBed.get(ProjectService);

    let approveSpy = spyOn(component, 'approveProject');
    console.log(component.project);

    const button = fixture.debugElement.query(By.css('#approve-project-btn'));
    button.nativeElement.click();
    fixture.detectChanges();

    expect(approveSpy).toHaveBeenCalled();
    expect(component.approveProject).toHaveBeenCalled();

  });

  it('should call denyProject Method', async(() => {
    spyOn(component, 'denyProject');

    const button = fixture.debugElement.nativeElement.querySelector('#deny-project-btn');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.denyProject).toHaveBeenCalled();
    });
  }));

  it('should change the project status, and make a call to updateProject when approveProject is invoked', () => {
    let projectService = TestBed.get(ProjectService);
    let projectSpy = spyOn(projectService, 'updateProject').and.returnValue(of(component.project));

    component.approveProject();

    expect(component.project.status).toEqual('Approved');
    expect(projectSpy).toHaveBeenCalled();
  });

  it('should change the project status, and make a call to updateProject when denyProject is invoked', () => {
    let projectService = TestBed.get(ProjectService);
    let projectSpy = spyOn(projectService, 'updateProject').and.returnValue(of(component.project));

    component.denyProject();

    expect(component.project.status).toEqual('Denied');
    expect(projectSpy).toHaveBeenCalled();
  });

});
