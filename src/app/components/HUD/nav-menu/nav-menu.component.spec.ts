import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavMenuComponent} from './nav-menu.component';
import { MatButtonModule, MatExpansionModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavMenuComponent ],
      imports: [ MatButtonModule, MatExpansionModule, HttpClientTestingModule,
      RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide goToEditRoles function if admin is false', () => {
    expect(fixture.debugElement.query(By.css('#go-to-edit'))).toBeNull();
});
});
