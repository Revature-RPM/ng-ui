import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgMetaService } from 'ngmeta';
import { MatCardModule, MatTabsModule, MatFormFieldModule,
  MatProgressSpinnerModule, MatIconModule, MatStepperModule, MatSnackBarModule, MatInputModule }
  from '@angular/material';

import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import {LoginRegisterPageComponent} from './login-register-page.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginRegisterPageComponent', () => {
  let component: LoginRegisterPageComponent;
  let fixture: ComponentFixture<LoginRegisterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRegisterPageComponent, LoginComponent, RegisterComponent ],
      imports: [ MatCardModule, MatTabsModule, MatFormFieldModule,
        MatProgressSpinnerModule, MatIconModule,
        MatStepperModule, MatSnackBarModule,
        MatInputModule, FormsModule,
        ReactiveFormsModule, HttpClientTestingModule,
        RouterTestingModule, NoopAnimationsModule],
      providers: [ NgMetaService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
