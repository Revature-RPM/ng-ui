import { User } from 'src/app/core/models/User';
import { UserService } from './../../core/services/user.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { AppModule } from '../../app.module';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * This test suite serves to check the proper creation of the Profile
 * component as well the as well as the functionality
 * of the various methods within it.
 * @author Ryan Beevers | Shawn Bickel | Sahil Makhijani | Andrew Mitchem | Yuki Mano | Jeffly Luctamar | (1810-Oct08-Java-USF)
 * @author Gabriel Zapata | Slavik Gleanco | Fadi Alzoubi | Alex Johnson | Edward Bechtold | (109107-Java-Spark-USF)

 */
describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let service: UserService;
  let testUser: User;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent],
      imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule, AppModule,ReactiveFormsModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    service =TestBed.get(UserService);
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Tests conditions for producing an invalid form; ensures no values are missing.
   * Remove the 'x' from 'xit' to not skip the test.
   * @author (1810-Oct08-Java-USF)
   */
  xit('Should produce an invalid form', () => {

    expect(component.form.valid).toBeFalsy();

  });
  
 /**
   * Tests conditions for producing a valid form.
   * Remove the 'x' from 'xit' to not skip the test.
   * @author (1810-Oct08-Java-USF)
   */
  xit('Should produce a valid form', () => {

    component.form.controls['firstName'].setValue('Tester');
    component.form.controls['lastName'].setValue('Test');
    component.form.controls['email'].setValue('Test@revature.com');
    component.form.controls['username'].setValue('Tester');
    component.form.controls['password'].setValue('Testing');

    expect(component.form.valid).toBeTruthy();

  });
  /**
   * Tests the initialization of the component (ngoninit) ; ensures user fields are inserted with the fillFormGroup
   * 
   * @author Gabriel Zapata (190107-Java-Spark-USF)
   */
  it('should verify user fields are  inserted into fillFormGroup',() =>{
    testUser = {
      username: 'testUserName',
      password: 'testPassword',
      firstName: 'testFirstname',
      lastName: 'testLastName',
      email: 'test@test.com'
    }
    spyOn(service,'getUser').and.returnValue(testUser);

    component.ngOnInit();

    expect(component.fillFormGroup).toBeTruthy();
  });

  
  /**
   * Tests the cancel edit profile fields. Necessitates the use of the UserService which we've decoupled using the 'spyOn'.
   * 
   * @author Gabriel Zapata (190107-Java-Spark-USF)
   */
  it('should test cancelEditProfile fields',() =>{
    testUser = {
      username: 'testUserName',
      password: 'testPassword',
      firstName: 'testFirstname',
      lastName: 'testLastName',
      email: 'test@test.com'
    }
  spyOn(service,'getUser').and.returnValue(testUser);

  component.cancelEditProfile();

  expect(component.disableButton).toBeTruthy();
  expect(component.fillFormGroup).toBeTruthy();
  });

  /**
   * Tests to verify whether the disable button works.
   * Remove the 'x' from 'xit' to not skip the test.
   * @author (1810-Oct08-Java-USF)
   */
  xit('should verify disable button if form is valid',()=>{
    
    let formValidSpy = spyOnProperty(component.form, 'valid', 'get').and.returnValue(true)
    component.formFilled();

  })
});
