import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { AppModule} from '../../app.module';

import { LoginComponent } from './login.component';
import { UserService } from '../../core/services/user.service';
import { DebugElement, ViewChild } from '@angular/core';
import { AuthenticationModule } from '../authentication.module';
import { By } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

/** 
 * This test suite serves to check the proper creation of the Login
 * component as well the as well as the functionality 
 * of the various methods within it.
 * @param null
 * @author Ryan Beevers| Shawn Bickle | Sahil Makhijani| Andrew Mitchem | Yuki Mano |Jeffly Luctamar| (1810-Oct08-Java-USF)
 * 
 * */

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [SharedModule, 
        RouterTestingModule, 
        BrowserAnimationsModule, 
        AppModule, 
        AuthenticationModule],     
      providers: [UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Testing that the component was properly created
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  //Testing the fuctionality of the login method
  it('should make a call to the UserService',  () =>{

    //set up login environment
    const debugElement = fixture.debugElement;
    let userService = debugElement.injector.get(UserService);
    
    //Spy on the user service login method
    let serviceSpy = spyOn(userService, 'login' ).and.callThrough();
    
    component.login();
    
    //the user service login method should be called 
    expect(serviceSpy).toHaveBeenCalled();
  });

  //Testing the fuctionality of the login method button click event
  xit('Login button click should make a call to the UserService', () =>{
      console.log("");
      //set up login environment
      let loginElement: DebugElement;
      let debugElement = fixture.debugElement;
      let userService = debugElement.injector.get(UserService);
      console.log("Line 2: userService: "+ userService);
      
  
      //Spy on the user service login method
      let serviceSpy = spyOn(userService, 'login' ).and.callThrough();
      console.log("Line 3" + serviceSpy );
     
      //simulate a form submission
      loginElement = fixture.debugElement.query(By.css('form'));
      console.log("After loginElement assignment");
      console.log(loginElement);
    

      //submit 
      console.log("After Submit event: " +  loginElement.triggerEventHandler('click', null));
      loginElement.triggerEventHandler('onclick', null);
      
      console.log("After Submit event" );
  
      //the user service login method should be called with the passed credentials 
      expect(serviceSpy).toHaveBeenCalled();
  });



    //Testing the fuctionality of the login method button click event
    xit('should make a call to the UserService', () =>{
      console.log("Line 1");
     
      //set up login environment
      let button;
      let debugElement = fixture.debugElement;
    
      //Spy on the user service login method  
      let userService = debugElement.injector.get(UserService);
      let serviceSpy = spyOn(component, 'login' ).and.callThrough();

      //simulate a form submission
      button = fixture.debugElement.nativeElement.querySelector('button');
    
      button.click();
    
      
      expect(serviceSpy).toHaveBeenCalled();
  });




});