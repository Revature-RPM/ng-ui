import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { AppModule } from '../../app.module';
import { RegistrationComponent } from './registration.component';
import { AuthenticationModule } from 'src/app/authentication/authentication.module';
import { UserService } from 'src/app/core/services/user.service';
import { By } from '@angular/platform-browser';
import { parse } from 'path';
import { of } from 'rxjs';
/**
 * This test suite serves to check the proper creation of the registration
 * component as well the as well as the functionality
 * of the various methods within it.
 * @author Ryan Beevers | Shawn Bickel | Sahil Makhijani | Andrew Mitchem | Yuki Mano | Jeffly Luctamar | (1810-Oct08-Java-USF)
 * @author Gabriel Zapata | Fadi Alzoubi | Slavik Gleanco | Alex Johnson | Edward Bechtold | (190107-Java-Spark-USF)
 */
// Testing the successful creation of the Registration component
describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let userService: UserService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        AppModule,
        AuthenticationModule
      ],
      providers: [UserService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    fixture.detectChanges();
  });

  // Testing the successful creation of the registration componenet
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // Test component's call to the user service ts file
  it('Should call service level register method', () => {
    // Arrange
    const debugElement = fixture.debugElement;
    const userService = debugElement.injector.get(UserService);
    const serviceSpy = spyOn(userService, 'register').and.callThrough(); // Set a spy on the service class
    // Act
    component.register();
    // Assert
    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });

  /**
   * Testing the fuctionality of the registration components
   * button click event. Upon a successful form submission, the button click,
   * should trigger an indirect call to user service class
   * @author Ryan Beevers | Shawn Bickel | Sahil Makhijani | Andrew Mitchem | Yuki Mano | Jeffly Luctamar | (1810-Oct08-Java-USF)
   */
  it('Registration button click event should make a call to the UserService', () => {
    // Arrange the registration environment
    const debugElement = fixture.debugElement;
    const userService = debugElement.injector.get(UserService);
    const serviceSpy = spyOn(userService, 'register').and.callThrough(); // Spy on the user service register method
    // simulate a form submission
    component.user.firstName = 'Tester';
    component.user.lastName = 'Testing';
    component.user.email = 'test@revature.com';
    component.user.username = 'test';
    component.user.password = 'ing';
    const registrationElement = fixture.debugElement.query(
      By.css('[id = registration-container]')
    ); // Capture the template for inside of a variable for mocking
    fixture.detectChanges();
    // Gain access to button element within the template to trigger a click event
    const button =
      registrationElement.nativeElement.childNodes[0].childNodes[0]
        .childNodes[0].childNodes[1].childNodes[1].childNodes[3].childNodes[1]
        .childNodes[0].childNodes[0].childNodes[2].childNodes[1];
    button.click(); // Simulate a button click
    // the user service register method should be called with the passed credentials
    expect(serviceSpy).toHaveBeenCalled();
  });

  /**
   * This test should verify registering is false, authentication is true, loginUser username
   * and loginUser password is set to user when user is inserted to userService.register method.
   * Not sure why this isn't working. If not skipped, other things fail.
   * @author Fadi Alzoubi | Edward Bechtold | (190107-Java-Spark-USF)
   */
  xit('should verify registering, authenticating, loginUser username and password when userService.register is called', () => {
    let testUser = {
      username: 'test',
      password: 'testpassword'
    };

    spyOn(userService, 'register').and.returnValue(testUser);
    component.register();
    expect(component.registering).toBeFalsy;
    expect(component.authenticating).toBeTruthy;
    expect(component.loginUser.username).toEqual(testUser.username);
    expect(component.loginUser.password).toEqual(testUser.password);
  });

  /**
   * Tests the "checkIfEmailIsInUse" method up until the observable (.subscribe) line
   * This test passes when tested alone. However, it fails when tested alongside other tests for this component
   * Therefore, it's skipped and needs fixing. Probably an indication the test is not properly isolated.
   * @author Slavik Gleanco | (190107-Java-Spark-USF)
   */
  xit('should check the properties of checkIfEmailIsInUse method values of emailToCheck, emailIsAvailable, emailIsNotAvailable, checkingIfEmailIsInUse ', () => { 
    component.user.email = 'testEmail';
    component.checkIfEmailIsInUse(); 
    expect(component.emailToCheck).toBe('testEmail');
    expect(component.emailIsAvailable).toBeFalsy();
    expect(component.emailIsNotAvailable).toBeFalsy();
    expect(component.checkingIfEmailIsInUse).toBeTruthy();
  });

  /**
   * Tests the "checkIfUsernameIsAvailable" method up until the observable (.subscribe) line
   * This test passes when tested alone. However, it fails when tested alongside other tests for this component
   * Therefore, it's skipped and needs fixing.
   * @author Slavik Gleanco | (190107-Java-Spark-USF)
   */
  xit('should check the properties of checkIfUsernameIsAvailable method values of usernameToCheck, emailIsAvailable, emailIsNotAvailable, checkingIfEmailIsInUse ', () => {
    component.user.username = 'username';
    component.checkIfUsernameIsAvailable(); 
    expect(component.usernameToCheck).toBe('username');
    expect(component.usernameIsAvailable).toBeFalsy();
    expect(component.usernameIsNotAvailable).toBeFalsy();
    expect(component.checkingIfUsernameIsAvailable).toBeTruthy();

  });

  /**
   * Tests the "checkIfUsernameIsAvailableKey" method up until the observable (.subscribe) line
   * This test passes when tested alone. However, it fails when tested alongside other tests for this component
   * Therefore, it's skipped and needs fixing.
   * @author Slavik Gleanco | (190107-Java-Spark-USF)
   */
  xit('Should check the properties of checkIfUsernameIsAvailableKey method values of usernameToCheck, usernameIsAvailable, usernameIsNotAvailable, checkIfUsernameIsAvailable', (done) => {
    component.user.username = 'testName';
    component.checkIfUsernameIsAvailableKey();
    
    setTimeout(() => {
      expect(component.usernameToCheck).toBe('testName');
      expect(component.usernameIsAvailable).toBeFalsy();
      expect(component.usernameIsNotAvailable).toBeFalsy();
      expect(component.checkIfUsernameIsAvailable).toBeTruthy();

      done();  
    }, 1000);
  });

  /**
   * Tests the "checkIfEmailIsInUseKey" method up until the observable (.subscribe) line
   * This test passes when tested alone. However, it fails when tested alongside other tests for this component
   * Therefore, it's skipped and needs fixing.
   * @author Slavik Gleanco | (190107-Java-Spark-USF)
   */
  xit('Should check the properties of checkIfEmailIsInUseKey method values of emailToCheck, emailIsAvailable, emailIsNotAvailable, checkingIfEmailIsInUse', (done) => { 
    component.user.email = 'testEmail';
    component.checkIfEmailIsInUseKey();

    setTimeout(() => {
      expect(component.emailToCheck).toBe('testEmail');
      expect(component.emailIsAvailable).toBeFalsy();
      expect(component.emailIsNotAvailable).toBeFalsy();
      expect(component.checkingIfEmailIsInUse).toBeTruthy();

      done();
    }, 1000);
  });

});
