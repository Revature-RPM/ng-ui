import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/User';
import {SidenavComponent} from './sidenav.component';
import { MatSidenavModule, MatIconModule, MatMenuModule, MatToolbarModule, MatExpansionModule, MatListModule, MatBadgeModule } from '@angular/material';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MockUserService } from 'src/app/mocks/mock-user-service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { RouterScroller } from '@angular/router/src/router_scroller';
import { PipeModule } from '../../../../pipes/pipe.module'; 

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let router;
  let routerSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavComponent, NavMenuComponent ],
      imports: [ MatSidenavModule, MatIconModule, MatMenuModule,
        MatToolbarModule, MatExpansionModule,
        HttpClientTestingModule, NoopAnimationsModule, MatListModule, MatBadgeModule,
        RouterTestingModule, PipeModule ],
        providers: [{provide: UserService, useClass: MockUserService}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    routerSpy = spyOn(router, 'navigate');

    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should route to profile when requested', () => {
    component.routeToProfile();

    expect(routerSpy).toHaveBeenCalledWith(['/profile']);
  });

  it('should route to profile when avatar is clicked on', () => {
    let avatar = fixture.debugElement.query(By.css('.user-avatar'));
    
    avatar.nativeElement.click();

    expect(routerSpy).toHaveBeenCalledWith(['/profile']);
  });

  it('loggedIn should be false if user is not logged in', () => {
    //component.loggedIn = true;
    
    let userService = TestBed.get(UserService);
    
    userService.user.next(null);
    
    component.ngOnInit();

    expect(component.loggedIn).toEqual(false);
  }) 
    

  it('should write to console.log when log is called', () => {
    let consoleSpy = spyOn(console, 'log').and
      .callFake(function () { return null; });

    component.log('words');

    expect(consoleSpy).toHaveBeenCalledWith('words');
  });

});
