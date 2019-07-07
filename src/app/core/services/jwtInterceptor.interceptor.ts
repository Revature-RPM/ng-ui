import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {UserService} from './user.service';
import {environment} from 'src/environments/environment';
import {Router} from '@angular/router';
import { LocationStrategy } from '@angular/common';

/**
 * TokenInterceptor
 * Http Interceptor that attaches jwt tokens to request to the microservice projected api
 * implements one functions intercept used in the app.module.ts as a provider.
 *
 * In addition this interceptor is responsible for checking and replacing rpmRefresh tokens
 * which have an expiration of 6 hours from the time of the last successful transaction.
 * @author Andrew Mitchem
 * @author Ian Baker
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router, private url: LocationStrategy) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const currentTime = Math.round((new Date()).getTime() / 1000);
    
    console.log("currentTime " + currentTime)
    console.log("rpmTime " + JSON.parse(localStorage.getItem('rpmRefresh')));
    
    if (localStorage.getItem('rpmRefresh') && currentTime < JSON.parse(localStorage.getItem('rpmRefresh')) && request.url.indexOf(environment.url) >= 0) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${window.localStorage.getItem('jwt')}`
          }
        });
        const newRefreshTime = currentTime + 21600000;
        localStorage.setItem('rpmRefresh', newRefreshTime + '');

    } else {
      localStorage.removeItem('jwt');
      localStorage.removeItem('rpmRefresh');
      localStorage.removeItem('user');
      this.userService.user = null;

      if (this.url.path() != '/auth/login' && this.url.path() != '/auth/register') {
      this.router.navigate(['/auth/login']);
      }

    }

    return next.handle(request);
  }

}

