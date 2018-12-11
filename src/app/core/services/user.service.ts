import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map} from 'rxjs/operators';

import { User } from '../models/User';
import { environment } from '../../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  jwtauthtoken: string;
  user: User;

  constructor(private http: HttpClient) { }

  // TODO clean this up
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Aw, Snap!\n' + error.error.message);
    } else {
      console.error(
        `Error code ${error.status}:
${error.error}`
      );
    }

    return throwError('Something went wrong; please try again later.');
  }
  // user.logout()... remove the user information from app and storge.
  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this.jwtauthtoken = null;
    this.user = null;
  }
  getUser() {
    if (this.user) {
      return this.user;
    } else if (window.localStorage.getItem('user') && window.localStorage.getItem('jwt')) {
      this.user = JSON.parse(window.localStorage.getItem('user'));
    } else {
      return null;
    }
    return this.user;
  }
  // only use environment.url for the base url and concat any restful endpoints
  // user.login(user). login the user and retrieve the jwt token from the header
  // @param user
  //
  login(user: User): Observable<any> {
    return this.http.post(environment.url + '/auth/', user, { observe: 'response'})
      .pipe(map(reponse => {
        if (reponse.headers.get('Authorization')) {
          this.user = reponse.body;
          this.jwtauthtoken = reponse.headers.get('Authorization').split(' ')[1];
          localStorage.setItem('user', JSON.stringify(reponse.body));
          localStorage.setItem('jwt', this.jwtauthtoken);
          return reponse.body;
        } else {
          return null; // this should throwerror
        }
      }), catchError(this.handleError));
  }

    // only use environment.url for the base url and concat any restful endpoints
  register(user: User): Observable<User> {
    user.role = 'user';
    return this.http.post<User>(environment.url + '/auth/users/', user, httpOptions)
      .pipe(catchError(this.handleError));
  }

    // only use environment.url for the base url and concat any restful endpoints
  updateProfile(user: User): Observable<User> {
    return this.http.put<User>(environment.url + '/auth/users/', user, httpOptions)
      .pipe(catchError(this.handleError));
  }
}
