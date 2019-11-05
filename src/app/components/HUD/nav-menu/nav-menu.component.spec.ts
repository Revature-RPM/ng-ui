import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavMenuComponent} from './nav-menu.component';
import { MatButtonModule, MatExpansionModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { MockUserService } from 'src/app/mocks/mock-user-service';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/User';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;
  let router: Router;
  let routerSpy;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavMenuComponent ],
      imports: [ MatButtonModule, MatExpansionModule, HttpClientTestingModule,
      RouterTestingModule, NoopAnimationsModule],
      providers: [{provide: UserService, useClass: MockUserService}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    routerSpy = spyOn(router, 'navigate').and
    .callFake( function() { return null; });
    
    store = {};
    spyOn(localStorage, 'setItem').and
      .callFake(function (key, value) { store[key] = value; });
    spyOn(localStorage, 'getItem').and
      .callFake(function(key) { return store[key];
      }
    );
    spyOn(localStorage, 'removeItem').and
      .callFake(function () { return null;}); 
      
    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component = null;
    fixture = null;
    store = null;
    routerSpy = null;
    router = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide goToEditRoles function if admin is false', () => {
    expect(fixture.debugElement.query(By.css('#go-to-edit'))).toBeNull();
  });
  

  it('should not login if user does not exist', () => {
    component.loggedIn = component.admin = true;
    
    let userService = TestBed.get(UserService);
    userService.user = new BehaviorSubject<User>(null);

    // tslint:disable-next-line: no-lifecycle-call
    component.ngOnInit();

    expect(component.loggedIn).toEqual(false);
    expect(component.admin).toEqual(false);
  });

  it('should not login if user does not exist', () => {
    let userService = TestBed.get(UserService);
    let u = {role: 'ROLE_ADMIN'};
    userService.user.next(u);

    // tslint:disable-next-line: no-lifecycle-call
    component.ngOnInit();

    expect(component.loggedIn).toEqual(true);
    expect(component.admin).toEqual(true);
  });
});
