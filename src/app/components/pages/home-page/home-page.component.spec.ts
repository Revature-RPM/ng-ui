import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { AboutComponent } from '../about/about.component';
import { ProjectListComponent } from '../project/project-list/project-list.component';
import { MatCardModule, MatTooltipModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule} from '@angular/material';
import {Router, RouterModule} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';



describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageComponent, AboutComponent, ProjectListComponent ],
      imports: [MatCardModule, MatTooltipModule, RouterModule, RouterTestingModule,
        HttpClientTestingModule, FormsModule, MatFormFieldModule, MatOptionModule,
        MatSelectModule, MatInputModule, BrowserAnimationsModule 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
