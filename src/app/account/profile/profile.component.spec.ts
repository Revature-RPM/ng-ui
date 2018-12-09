import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { AppModule } from '../../app.module';



import { ProfileComponent } from './profile.component';

/** 
 * This test suite serves to check the proper creation of the Profile
 * component as well the as well as the functionality 
 * of the various methods within it.
 * @param null
 * @author Ryan Beevers| Shawn Bickle | Sahil Makhijani| Andrew Mitchem | Yuki Mano |Jeffly Luctamar| (1810-Oct08-Java-USF)
 * 
 * */

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent],
      imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule, AppModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  //Tests conditions for an invalid form(ie. missing field values)
  it('Should be invalid', () =>{

    component.form.controls['firstname'].setValue(''); 
    component.form.controls['lastname'].setValue('');
    component.form.controls['email'].setValue('Test@revature.com');
    component.form.controls['username'].setValue('Tester');
    component.form.controls['password'].setValue('Testing');

    expect(component.form.valid).toBeFalsy;

  })

  //Tests conditions for an valid form(ie. )
  it('Should be valid', () =>{

    component.form.controls['firstname'].setValue('Tester');
    component.form.controls['lastname'].setValue('Test');
    component.form.controls['email'].setValue('Test@revature.com');
    component.form.controls['username'].setValue('Tester');
    component.form.controls['password'].setValue('Testing');
    expect(component.form.valid).toBeTruthy;

  })
});
