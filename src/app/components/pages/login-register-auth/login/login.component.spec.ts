import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgMetaService } from 'ngmeta';
import { Router} from '@angular/router';
import { of } from 'rxjs';
import { MatFormFieldModule, MatProgressSpinnerModule, MatIconModule, MatInputModule } from '@angular/material';
import {LoginComponent} from './login.component';
import { Button } from 'protractor';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../../models/User';
import {first} from 'rxjs/operators';
import {from} from 'rxjs';
import { HttpErrorResponse, HttpHeaders, HttpEventType } from '@angular/common/http';
import {Observable, throwError} from 'rxjs'; 
import { By } from '@angular/platform-browser';
import { MockUserService } from 'src/app/mocks/mock-user-service';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let routerSpy;
  let userServiceSpyLogin;
  let userService: UserService;
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
      declarations: [ LoginComponent ],
      imports: [ MatFormFieldModule, MatProgressSpinnerModule, MatIconModule,
        MatInputModule, FormsModule,
        HttpClientTestingModule, RouterTestingModule,
        NoopAnimationsModule ],
      providers: [ NgMetaService,
        { provide: UserService, useClass: MockUserService },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.get(Router);
    routerSpy = spyOn(router, 'navigate').and
    .callFake( function() { return null; });

  });

  afterEach(() => {
    localStorage.removeItem('jwt');
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initializes with correct state', () => {
    expect(component.user).toEqual({ });
    expect(component.passwordO).toBeFalsy();
    expect(component.usernameO).toBeFalsy();
    expect(component.authenticating).toBeFalsy();
    expect(component.loggedIn).toBeFalsy();
    expect(component.logSuccess).toBeTruthy();
  })

  it('redirects to projects if user is logged in already', () => {
    localStorage.setItem('jwt', "fake");
    component.ngOnInit();

    expect(routerSpy).toHaveBeenCalledWith(['projects']);
  })

  it('Submitting the form calls login', () => {
    
    const submitButton = fixture.debugElement.nativeElement.querySelector('button');
    
    let spy = spyOn(component, 'login')

    submitButton.click();

    expect(spy).toHaveBeenCalled();
    expect(component.authenticating).toBeTruthy;
    
  })

  it('login should call to user service login', () => {
    userService = TestBed.get(UserService);

    let userSpy = spyOn(userService, 'login').and.returnValue(from(fakeUser));
    
    component.login();

    expect(userService.login).toHaveBeenCalled();

  })

  it('sucesssful login redirects to projects', () => {
    userService = TestBed.get(UserService);
    let userSpy = spyOn(userService, 'login').and.returnValue(of(fakeUser));

    component.login();

    expect(routerSpy).toHaveBeenCalledWith(['projects']);
  })

  it('sets logSuccess to false when login unsuccessful', () => {
    userService = TestBed.get(UserService);
    let userSpy = spyOn(userService, 'login').and.returnValue(of(null));

    component.login();

    expect(component.logSuccess).toEqual(false);
  })

  it('sets logSuccess to false when login sends back an error', () => {
    userService = TestBed.get(UserService);
    let userSpy = spyOn(userService, 'login').and.returnValue(throwError('error message'));

    component.login();

    expect(userSpy).toHaveBeenCalled();
    expect(component.authenticating).toEqual(false);
  })

  it('checks username validations', () => {
    let usernameInput = fixture.debugElement.query(By.css('#username-input'));
    //usernameInput.triggerEventHandler('keydown', {});
    usernameInput.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {
      "code": "9"
    }));
    fixture.detectChanges();
    expect(component.usernameO).toEqual(false);
  });

  it('checks username validations when key length is qual to 1', () => {
    let usernameInput = fixture.debugElement.query(By.css('#username-input'));
    
    usernameInput.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {
      "code": "9",
      "key": "5",
      "cancelable": "true"
    }));
   
    fixture.detectChanges();
    expect(component.usernameO).toEqual(false);
  });

  it('checks password validations', () => {
    let passwordInput = fixture.debugElement.query(By.css('#password-input'));
    passwordInput.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {
      "code": "8"
    }));

    fixture.detectChanges();
    expect(component.passwordO).toEqual(false);
  });

  it('checks password validations when key length is equal to 1', () => {
    let passwordInput = fixture.debugElement.query(By.css('#password-input'));

    passwordInput.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {
      "code": "8",
      "key": "6",
      "cancelable": "true"
    }));

    fixture.detectChanges();
    expect(component.passwordO).toEqual(false);
  });

  it('Checks component username validity after keydown.enter when username is empty', () => {
    let usernameInput = fixture.debugElement.query(By.css('#username-input'));
    
    usernameInput.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Enter'
    }));

    fixture.detectChanges();

    expect(component.usernameO).toEqual(true);
  });

  it('Checks component username validity after keydown.enter when username present', () => {
    let usernameInput = fixture.debugElement.query(By.css('#username-input'));
    component.user.username = "fakeUser";
    
    usernameInput.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Enter'
    }));

    fixture.detectChanges();

    expect(component.usernameO).toEqual(false);
  });

  it('Checks component password validity after keydown.enter when password is empty', () => {
    let passwordInput = fixture.debugElement.query(By.css('#password-input'));
    component.user.username = "fakeUser";
    passwordInput.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Enter'
    }));

    fixture.detectChanges();

    expect(component.passwordO).toEqual(true);
  });

  it('Checks component password validity after keydown.enter when password present', () => {
    let passwordInput = fixture.debugElement.query(By.css('#password-input'));
    component.user.username = "fakeUser";
    component.user.password = "fakePassword";
    
    passwordInput.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Enter'
    }));

    fixture.detectChanges();

    expect(component.passwordO).toEqual(false);
  });

  it('Subscribes to the response, and checks to see if it is a valid user', () => {
    userService = TestBed.get(UserService);
    let userSpy = spyOn(userService, 'login').and.returnValue(of(fakeUser));

    let passwordInput = fixture.debugElement.query(By.css('#password-input'));
    component.user.username = "fakeUser";
    component.user.password = "fakePassword";
    
    passwordInput.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Enter'
    }));

    expect(component.authenticating).toEqual(false);
    expect(component.loggedIn).toEqual(true);
    expect(routerSpy).toHaveBeenCalledWith(['projects']);
  });

  it('Does not log in if user is not a valid User', () => {
    userService = TestBed.get(UserService);
    let userSpy = spyOn(userService, 'login').and.returnValue(of(null));

    let passwordInput = fixture.debugElement.query(By.css('#password-input'));
    component.user.username = "fakeUser";
    component.user.password = "fakePassword";
    
    passwordInput.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Enter'
    }));

    expect(component.authenticating).toEqual(false);
    expect(component.loggedIn).toEqual(false);
  });

  it('Does not log in if error is sent back', () => {
    userService = TestBed.get(UserService);
    let userSpy = spyOn(userService, 'login').and.returnValue(throwError('error message'));

    let passwordInput = fixture.debugElement.query(By.css('#password-input'));
    component.user.username = "fakeUser";
    component.user.password = "fakePassword";
    
    passwordInput.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Enter'
    }));

    expect(component.authenticating).toEqual(false);
    expect(component.loggedIn).toEqual(false);
  });

});
