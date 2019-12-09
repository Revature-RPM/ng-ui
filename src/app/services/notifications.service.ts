import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Notification } from '../models/Notification';
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
    notification: BehaviorSubject<Notification>;

    constructor(private http: HttpClient) { }

    // TODO clean this up: copied from user.service
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

    // TODO Verify function works, replace url when backend is finished.

    /* Requests all notifications for the current user.
       This will return any unread notifications and enough
       read notifications to make the total number five,
       as long as there are that many read notification.
       Returns array of notifications.
    */
    getAllNotifications(userID: any): Observable<Notification[]> {
        return this.http.get<Notification[]>(environment.url, httpOptions)
            .pipe(catchError(this.handleError));
    }

    // TODO Verify function works, replace url when backend is finished.

    /* Requests a page of notifications, regardless of read status.
       Returns array of notifications.
    */
    getNotificationPage(userID: any, n: number): Observable<Notification[]> {
        return this.http.get<Notification[]>(environment.url + '/history?page=${n}', httpOptions)
            .pipe(catchError(this.handleError));
    }

    // TODO Verify function works, replace url when backend is finished.

/* Requests an update for a notification if it has been read.
   Returns a status code.
*/
patchReadNotification(notification:Notification){
  this.http.patch(environment.url, notification, httpOptions)
  .pipe(catchError(this.handleError));
}

}
