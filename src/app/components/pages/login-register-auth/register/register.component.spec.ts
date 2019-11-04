import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { MatFormFieldModule, MatStepperModule, MatSnackBarModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgMetaService } from 'ngmeta';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockUserService } from 'src/app/mocks/mock-user-service';
import { Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {from} from 'rxjs';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;
  let routerSpy;
  let inputs;
  let firstName;
  let lastName;
  let email;
  let username;
  let password;
  let confirmPassword;
  let fakeUser = [{
    email : 'bobWhite@email.com',
    firstName : 'Bob',
    lastName :  'White',
    password : 'password',
    role : 'user',
    username : 'bobWhite',
    id : 1234,
    }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ MatStepperModule, MatFormFieldModule, MatSnackBarModule,
        MatInputModule, FormsModule,
        ReactiveFormsModule, HttpClientTestingModule,
        RouterTestingModule, NoopAnimationsModule ],
      providers: [ NgMetaService,
      {provide: UserService, useClass: MockUserService}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    inputs = fixture.debugElement.queryAll(By.css('input'));
    firstName = inputs[0].nativeElement;
    lastName = inputs[1].nativeElement;
    email = inputs[2].nativeElement;
    username = inputs[3].nativeElement;
    password = inputs[4].nativeElement;
    confirmPassword = inputs[5].nativeElement;

    router = TestBed.get(Router);
    routerSpy = spyOn(router, 'navigate').and
    .callFake( function() { return null; });


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initializes with correct state', () => {
    expect(component.user).toEqual({});
    expect(component.loginUser).toEqual({});
    expect(component.submitted).toEqual(false);
  });

  it('when valid form is submitted it calls the UserService Register', () => {

    component.form1.firstName.setValue('Jack');
    component.form1.lastName.setValue('Smith');
    component.form1.email.setValue('j_Smith@example.com');
    component.form2.username.setValue('j_Smith32');
    component.form2.password.setValue('fakepassword99');
    component.form2.confirmPassword.setValue('fakepassword99');

    let userService = TestBed.get(UserService);
    let userSpy = spyOn(userService, 'register').and.returnValue(of(fakeUser))

    component.register();

    expect(userSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['projects']);
    
  });

 
});
