import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgMetaService } from 'ngmeta';

import { MatFormFieldModule, MatProgressSpinnerModule, MatIconModule, MatInputModule } from '@angular/material';

import {LoginComponent} from './login.component';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ MatFormFieldModule, MatProgressSpinnerModule, MatIconModule,
        MatInputModule, FormsModule,
        HttpClientTestingModule, RouterTestingModule,
        NoopAnimationsModule ],
      providers: [ NgMetaService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.user).toEqual({ });
    expect(component.passwordO).toBeFalsy();
    expect(component.usernameO).toBeFalsy();
    expect(component.authenticating).toBeFalsy();
    expect(component.loggedIn).toBeFalsy();
    expect(component.logSuccess).toBeTruthy();
  })
});
