import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SidenavComponent} from './sidenav.component';
import { MatSidenavModule, MatIconModule, MatMenuModule, MatToolbarModule, MatExpansionModule } from '@angular/material';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterScroller } from '@angular/router/src/router_scroller';

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
        HttpClientTestingModule, NoopAnimationsModule,
        RouterTestingModule ],
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

  it('should write to console.log when log is called', () => {
    let consoleSpy = spyOn(console, 'log').and
      .callFake(function () { return null; });

    component.log('words');

    expect(consoleSpy).toHaveBeenCalledWith('words');
  });
});
