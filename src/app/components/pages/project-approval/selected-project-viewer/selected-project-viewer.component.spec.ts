import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectedProjectViewerComponent } from './selected-project-viewer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

fdescribe('SelectedProjectViewerComponent', () => {
  let component: SelectedProjectViewerComponent;
  let fixture: ComponentFixture<SelectedProjectViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      declarations: [SelectedProjectViewerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedProjectViewerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call approveProject Method', async(() => {
    spyOn(component, 'approveProject');

    const button = fixture.debugElement.nativeElement.querySelector('#approve-project-btn');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.approveProject).toHaveBeenCalled();
    });

  }));

  it('should call denyProject Method', async(() => {
    spyOn(component, 'denyProject');

    const button = fixture.debugElement.nativeElement.querySelector('#deny-project-btn');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.denyProject).toHaveBeenCalled();
    });

  }));

});
