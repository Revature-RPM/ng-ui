import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { MatFormFieldModule, MatStepperModule, MatSnackBarModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgMetaService } from 'ngmeta';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ MatStepperModule, MatFormFieldModule, MatSnackBarModule,
        MatInputModule, FormsModule,
        ReactiveFormsModule, HttpClientTestingModule,
        RouterTestingModule, NoopAnimationsModule ],
      providers: [ NgMetaService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
