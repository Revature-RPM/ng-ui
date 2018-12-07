import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { AppModule} from '../../app.module';

import { LoginComponent } from './login.component';
import { UserService } from '../../core/services/user.service';
import { DebugElement } from '@angular/core';
import { AuthenticationModule } from '../authentication.module';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule, AppModule, AuthenticationModule],     
      providers: [UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  //Testing the fuctionality of the login method
  it('should make a call to the UserService', async( () =>{

    //set up login environment
    let loginElement: DebugElement;
    let button: DebugElement
    const debugElement = fixture.debugElement;
    let userService = debugElement.injector.get(UserService);
    
    //Spy on the user service login method
    let serviceSpy = spyOn(userService, 'login' ).and.callThrough();
    
    component.login();
    
    //the user service login method should be called 
    expect(serviceSpy).toHaveBeenCalled();
   

  }));
});