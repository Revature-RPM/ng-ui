import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChangeRolesComponent } from './admin-change-roles.component';

describe('AdminChangeRolesComponent', () => {
  let component: AdminChangeRolesComponent;
  let fixture: ComponentFixture<AdminChangeRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChangeRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChangeRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
