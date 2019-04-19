import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { User } from './../models/User';
import { TestBed, getTestBed } from '@angular/core/testing';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticationModule } from 'src/app/authentication/authentication.module';
import { AppModule} from '../../app.module';
import { UserService } from './user.service';

/**
 * UserService tests. For future testing research implementing HttpClientTestingModule 
 * and HttpTestingController to perform actual unit testing for reaching the application-tier. 
 * 
 * @author (1810-Oct08-Java-USF)
 * @author Gabriel Zapata | Fadi Alzoubi | Slavik Gleanco | Alex Johnson | Edward Bechtold (190107-Java-Spark-USF)
 */
describe('UserService', () => {
  let injector: TestBed;
  let httpMock:HttpClientTestingModule;
  let service;
  let testUser:User;

  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [ ],
    imports: [ RouterTestingModule, BrowserAnimationsModule, AppModule, AuthenticationModule,HttpClientTestingModule],
    providers: [UserService]
  })
    injector = getTestBed();
    service = injector.get(UserService);
    httpMock = injector.get(HttpClientTestingModule);
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  /**
   * The following test is not a unit test. No spyOn is called. Isolation is not maintained. Needs refactoring. 
   * 
   * @author (1810-Oct08-Java-USF)
   */
  it('should return \'{emailIsInUse:true}\' on checking if email is in use with \'admin@revature.com\'', () => {
    let response = {emailIsInUse:true};
    service.checkIfEmailIsInUse('admin@revature.com').subscribe(res => {
      expect(res).toEqual(response);
    })
  })

  /**
   * The following test is not an isolated unit test. No spy method is used to mock the service. Refactor by implementing HttpTestingController.
   * HttpTestingController will be used to mock a fake application-tier. Read more here on mocking http services: https://angular.io/guide/http - Gabriel Zapata
   * @author (1810-Oct08-Java-USF)
   */
  it('should return \'{emailIsInUse:false}\' on checking if email is in use with \'(╯• ◡•)╯︵ ┻━┻@email.o\'', () => {
    let response = {emailIsInUse:false}
    service.checkIfEmailIsInUse('(╯• ◡•)╯︵ ┻━┻@email.o').subscribe(res => {
      expect(res).toEqual(response);
    })
  })

  /**
   * The following test is not an isolated unit test. No spy method is used to mock the service. Refactor by implementing HttpTestingController.
   * HttpTestingController will be used to mock a fake application-tier. Read more here on mocking http services: https://angular.io/guide/http - Gabriel Zapata
   * @author (1810-Oct08-Java-USF)
   */
  it('should return \'{usernameIsAvailable:false}\' on checking if username is available with \'admin\'', () => {
    let response = {usernameIsAvailable:false}
    service.checkIfUsernameIsAvailable('admin').subscribe(res => {
      expect(res).toEqual(response);
    });
  })

 
  /**
   * Verifies local storage is cleared upon logging out
   * @author Gabriel Zapata (190107-Java-Spark-USF)
   */
  it('should remove items from local storage and return null for jwtauth and user',() => {
    
    localStorage.setItem('jwt','testJwt');
    localStorage.setItem('user','testUser')
    service.logout();

    expect(service.jwtauthtoken).toBeNull;
    expect(service.user).toBeNull;

  })

});
