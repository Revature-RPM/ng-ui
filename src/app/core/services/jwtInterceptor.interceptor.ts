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

    // If there isn't a jwt in storage, there's no need for the user to be anywhere besides the login/register and no reason
    // to continue in this function.
    if (!localStorage.getItem('jwt') && this.url.path() != '/auth/login' && this.url.path() != '/auth/register') {
      this.router.navigate(['/auth/login']);
      return next.handle(request);
    }

    // Set the current time in UNIX
    const currentTime = Math.round((new Date()).getTime() / 1000); // Set this to current time

    // If rpmRefresh token is found in local storage. Get its value.
    let tokenExpiration;
    if (localStorage.getItem('rpmRefresh')) {
      tokenExpiration = localStorage.getItem('rpmRefresh');
    }

    // Set the refresh period for the new token.
    const newRefreshTime = currentTime + 120; // Development - Set this to current time + 2 minutes.
    // const newRefreshTime = currentTime + 21600000; // Production - Set this to current time + 6 hours.

    // Add check to see if currentTime < tokenExpiration. If it is. Skip all logic and go to
    // else block.

    if (localStorage.getItem('rpmRefresh') && currentTime < tokenExpiration) {
      console.log('user has jwt');
      // If the URL contains the evironment URL and they have a JWT then attach the value of the
      // JWT as the header.
      if (request.url.indexOf(environment.url) >= 0 && window.localStorage.getItem('jwt')) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${window.localStorage.getItem('jwt')}`
          }
        });

        // Reset rpmRefresh token to expireTime. The refreshTime variable is brute forced into a string here.
        localStorage.setItem('rpmRefresh', newRefreshTime + '');
      }
    } else {
      // If their refresh token is expired then kick them back to the login screen and purge
      // both refresh and JWT tokens.


      // Purge JWT Token
      localStorage.removeItem('jwt');

      // Purge rpmRefresh Token
      localStorage.removeItem('rpmRefresh');

      //Purge user
      localStorage.removeItem('user');
      this.userService.user = null;

      // Reroute to the login page.
      if (this.url.path() != '/auth/login' && this.url.path() != '/auth/register') {
      this.router.navigate(['/auth/login']);
      }

    }

    return next.handle(request);
  }

}

