import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule} from '../../app.module';


import { LogoutComponent } from './logout.component';
import { AuthenticationModule } from '../authentication.module';
import { Router } from '@angular/router';
import { AuthenticationRoutingModule } from '../authentication-routing.module';

/** 
 * This test suite serves to check the proper creation of the Logout
 * component.
 * @param null
 * @author Ryan Beevers| Shawn Bickle | Sahil Makhijani| Andrew Mitchem | Yuki Mano |Jeffly Luctamar| (1810-Oct08-Java-USF)
 * 
 * */

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        RouterTestingModule, 
        BrowserAnimationsModule, 
        AppModule, 
        AuthenticationModule, 
        AuthenticationRoutingModule]      

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});