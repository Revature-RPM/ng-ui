import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import {NavMenuComponent} from './nav-menu.component';
import { MatButtonModule, MatExpansionModule, MatListModule } from '@angular/material';
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
  let links;
  let allProjectsLink;
  let myProjectsLink;
  let mySubmitProjectLink;
  let profileLink;
  let logoutLink;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavMenuComponent ],
      imports: [ MatButtonModule, MatExpansionModule, MatListModule, HttpClientTestingModule,
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
      .callFake(function (key, value) { store[key] = value; })
    spyOn(localStorage, 'getItem').and
      .callFake(function(key) { return store[key]});
    spyOn(localStorage, 'removeItem').and
      .callFake(function () { return null;}); 
      
    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    links = fixture.debugElement.queryAll(By.css('mat-list-item'));
    //0 => All Projects
    allProjectsLink = links[0].nativeElement;
    //1 => My Projects
    myProjectsLink = links[1].nativeElement;
    //2 => Submit a project
    mySubmitProjectLink = links[2].nativeElement;
    //3 => Profile
    profileLink = links[3].nativeElement;
    //4 => logout
    logoutLink = links[4].nativeElement;
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

  it('should route to projects when All Projects link is clicked', () => {
    spyOn(component.menuOptionClicked, 'emit');

    allProjectsLink.click()
    expect(component.menuOptionClicked.emit).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['projects']);
  });
  
  it('should route to projects-user when My Projects is clicked', () => {

    myProjectsLink.click();
    expect(routerSpy).toHaveBeenCalledWith(['projects-user']);
  });

  it('should route to project-submission when Submit a Project is clicked', () => {
    mySubmitProjectLink.click();

    expect(routerSpy).toHaveBeenCalledWith(['project-submission']);
  });

  it('should route to profile when Profile is clicked', () => {
    profileLink.click();

    expect(routerSpy).toHaveBeenCalledWith(['profile']);
  });

  it('should route to login when Logout is clicked', () => {
    logoutLink.click();

    expect(routerSpy).toHaveBeenCalledWith(['login']);
  });

  it('should call logout from userService', () => {
    let userService = TestBed.get(UserService);
    spyOn(userService, 'logout');

    component.logout();

    expect(userService.logout).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['login']);
  });

  it('should not be logged in if user does not exist', () => {
    component.loggedIn = component.admin = true;
    
    let userService = TestBed.get(UserService);
    userService.user = new BehaviorSubject<User>(null);

    component.ngOnInit();

    expect(component.loggedIn).toEqual(false);
    expect(component.admin).toEqual(false);
  });

  it('should not display be an Admin if user role is ROLE_ADMIN', () => {
    let userService = TestBed.get(UserService);
    let u = {role: 'ROLE_ADMIN'};
    userService.user.next(u);

    component.ngOnInit();

    expect(component.loggedIn).toEqual(true);
    expect(component.admin).toEqual(true);
  });

});
