import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../models/user';

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

  constructor(private http: HttpClient) { }

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

  login(user: User): Observable<User> {
    return this.http.post<User>(environment.url + 'customer/login', user, httpOptions)
    .pipe(catchError(this.handleError));
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(environment.url + 'customer/register', user, httpOptions)
    .pipe(catchError(this.handleError));
  }
  
}

@Injectable({
  providedIn: 'root'
})
export class LoggedInService {
  userExists = (localStorage.getItem('user')) ? true : false;
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.userExists);
}