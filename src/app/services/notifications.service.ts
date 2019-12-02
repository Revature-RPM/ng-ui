import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {Message} from '../models/Message';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  message: BehaviorSubject<Message>;

  constructor(private http: HttpClient) { }

  // TODO clean this up: coppied from user.service
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

getAllNotifications():Observable<Message[]>{
  let url=`https://localhost:8000/`;
  return this.http.get<Message[]>(url    /*environment.url + '/notify/', httpOptions*/)
  .pipe(catchError(this.handleError));
}
}
