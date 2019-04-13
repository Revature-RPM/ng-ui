import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '../../shared/shared.module';
import { AppModule} from '../../app.module';
import { ViewProjectsComponent } from './view-projects.component';
import { Router } from '@angular/router';

/**
 * This test suite serves to check the proper creation of the ViewProjects
 * component as well the as well as the functionality
 * of the various methods within it.
 * @author Ryan Beevers | Shawn Bickel | Sahil Makhijani | Andrew Mitchem | Yuki Mano | Jeffly Luctamar | (1810-Oct08-Java-USF)
 */

xdescribe('ViewProjectsComponent', () => {
  let component: ViewProjectsComponent;
  let fixture: ComponentFixture<ViewProjectsComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ SharedModule, RouterTestingModule, BrowserAnimationsModule, AppModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be usersPage=false', () => {
    fixture.componentInstance.projects();
    expect(fixture.componentInstance.usersPage).toEqual(false)
  })

  it('should be projectsPage=true', () => {
    fixture.componentInstance.projects();
    expect(fixture.componentInstance.projectsPage).toEqual(true)
  })

  it('should test mock navigation ',() =>{

    let navigateSpy = spyOn(router,'navigate')
    component.submitProject();
    expect(navigateSpy).toHaveBeenCalledWith(['/project_submission'])
   })
});
