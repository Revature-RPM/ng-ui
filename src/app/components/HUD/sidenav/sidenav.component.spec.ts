import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SidenavComponent} from './sidenav.component';
import { MatSidenavModule, MatIconModule, MatMenuModule, MatToolbarModule, MatExpansionModule } from '@angular/material';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

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
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
