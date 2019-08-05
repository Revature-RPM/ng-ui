import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { NgMetaService } from 'ngmeta';

import { CodebasePageComponent } from './codebase-page.component';

describe('CodebasePageComponent', () => {
  let component: CodebasePageComponent;
  let fixture: ComponentFixture<CodebasePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodebasePageComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ Location, {provide: LocationStrategy,
        useClass: PathLocationStrategy }, NgMetaService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodebasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
