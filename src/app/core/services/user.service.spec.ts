import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticationModule } from 'src/app/authentication/authentication.module';
import { AppModule} from '../../app.module';
import { UserService } from './user.service';

/**
 * This test serves to check if this service was properly created
 * as well as the functionality of the various methods within
 * @author Ryan Beevers | Shawn Bickel | Sahil Makhijani | Andrew Mitchem | Yuki Mano | Jeffly Luctamar | (1810-Oct08-Java-USF)
 */
describe('UserService', () => {

  var service;
  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [ ],
    imports: [ RouterTestingModule, BrowserAnimationsModule, AppModule, AuthenticationModule]})
    service = TestBed.get(UserService)
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should return \'{emailIsInUse:true}\' on checking if email is in use with \'admin@revature.com\'', () => {
    var response = {emailIsInUse:true};
    service.checkIfEmailIsInUse('admin@revature.com').subscribe(res => {
      expect(res).toEqual(response);
    })
  })

  it('should return \'{emailIsInUse:false}\' on checking if email is in use with \'(╯• ◡•)╯︵ ┻━┻@email.o\'', () => {
    var response = {emailIsInUse:false}
    service.checkIfEmailIsInUse('(╯• ◡•)╯︵ ┻━┻@email.o').subscribe(res => {
      expect(res).toEqual(response);
    })
  })

  it('should return \'{usernameIsAvailable:false}\' on checking if username is available with \'admin\'', () => {
    var response = {usernameIsAvailable:false}
    service.checkIfUsernameIsAvailable('admin').subscribe(res => {
      expect(res).toEqual(response);
    });
  })

  

});
