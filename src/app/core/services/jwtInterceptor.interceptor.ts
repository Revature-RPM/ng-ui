import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { environment} from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf(environment.url) >= 0 && window.localStorage.getItem('jwt')) {
      // check uri later
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${window.localStorage.getItem('jwt')}`
        }
      });
    }
    return next.handle(request);
  }
}
