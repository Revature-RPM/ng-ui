import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { AppModule} from '../../app.module';

import { RegistrationComponent } from './registration.component';
import { AuthenticationModule } from '../authentication.module';
import { UserService } from 'src/app/core/services/user.service';

/** 
 * This test suite serves to check the proper creation of the registration
 * component as well the as well as the functionality 
 * of the various methods within it.
 * @param null
 * @author Ryan Beevers| Shawn Bickle | Sahil Makhijani| Andrew Mitchem | Yuki Mano |Jeffly Luctamar| (1810-Oct08-Java-USF)
 * 
 * */


//Testing the successful creation of the Registration component
describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule, AppModule, AuthenticationModule],
      providers:[UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //test components call to the user service ts file
  it('Should call service level register method', ()=> {
    
    const debugElement = fixture.debugElement;
    let userService = debugElement.injector.get(UserService);

    //Set a spy on the service class
    let serviceSpy = spyOn(userService, 'register').and.callThrough();
    
    component.register();

    expect(serviceSpy).toHaveBeenCalledTimes(1);
  })

});
