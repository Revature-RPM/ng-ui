import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminChangeRolesComponent } from './admin-change-roles.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material';

describe('AdminChangeRolesComponent', () => {
  let component: AdminChangeRolesComponent;
  let fixture: ComponentFixture<AdminChangeRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [AdminChangeRolesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

  it('should call updateToAdmin Method', async(() => {
    spyOn(component, 'updateToAdmin');
    const button = fixture.debugElement.nativeElement.querySelector('#update-to-admin-btn');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.updateToAdmin).toHaveBeenCalled();
    });
  }));

  it('should display the users table headers', () => {
    fixture.detectChanges();
    const matHeaderCell = fixture.nativeElement.querySelectorAll('mat-header-cell');
    expect(matHeaderCell.length).toBe(5);
    expect(matHeaderCell[0].innerHTML).toBe(' ID# ');
    expect(matHeaderCell[1].innerHTML).toBe(' Name ');
    expect(matHeaderCell[2].innerHTML).toBe(' Role ');
    expect(matHeaderCell[3].innerHTML).toBe(' Username ');
    expect(matHeaderCell[4].innerHTML).toBe(' Email ');
  });
});
