import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgMetaService } from 'ngmeta';
import { Router} from '@angular/router';
import { MockUserService } from '../../../../mocks/mock-user-service';
import { of } from 'rxjs';
import { MatFormFieldModule, MatProgressSpinnerModule, MatIconModule, MatInputModule } from '@angular/material';
import {LoginComponent} from './login.component';
import { Button } from 'protractor';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../../models/User';
import {first} from 'rxjs/operators';
import {from} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';



fdescribe('LoginComponent', () => {
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
      providers: [ NgMetaService ],
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

  it('component initial state', () => {
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
    let error: HttpErrorResponse;
    console.log(error);
    userService = TestBed.get(UserService);
    let userSpy = spyOn(userService, 'login').and.returnValue(of(error));

    component.login();

    expect(component.logSuccess).toEqual(false);
  })

});
