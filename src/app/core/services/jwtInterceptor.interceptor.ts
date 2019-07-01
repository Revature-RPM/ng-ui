import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {UserService} from './user.service';
import {environment} from 'src/environments/environment';
import {Router} from '@angular/router';

/**
 * TokenInterceptor
 * Http Interceptor that attaches jwt tokens to request to the microservice projected api
 * implements one functions intercept.
 * used in the app.module.ts as a provider
 * @author Andrew Mitchem
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Set the current time in UNIX
    const currentTime = Math.round((new Date()).getTime() / 1000); // Set this to current time

    // If rpmRefresh token is found in local storage. Get its value.
    let tokenExpiration;
    if (localStorage.getItem('rpmRefresh')) {
      tokenExpiration = localStorage.getItem('rpmRefresh');
    }

    // Set the refresh period for the new token.
    const newRefreshTime = currentTime + 21600000; // Set this to current time + 6 hours.

    // Add check to see if currentTime < tokenExpiration. If it is. Skip all logic and go to
    // else block.

    if (currentTime < tokenExpiration) {
      // If the URL contains the evironment URL and they have a JWT then attach the value of the
      // JWT as the header.
      if (request.url.indexOf(environment.url) >= 0 && window.localStorage.getItem('jwt')) {
        // TODO Check URI later
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${window.localStorage.getItem('jwt')}`
          }
        });

        // Reset rpmRefresh token to expireTime. The refreshTime variable is brute forced into a string here.
        localStorage.setItem('rpmRefresh', newRefreshTime + '');
      }
      return next.handle(request);
    } else {
      // If their refresh token is expired then kick them back to the login screen and purge
      // both refresh and JWT tokens.

      // Purge JWT Token
      localStorage.removeItem('jwt');

      // Purge rpmRefresh Token
      localStorage.removeItem('rpmRefresh');

      // Reroute to the login page.
      this.router.navigate(['/auth/login']);
    }
  }

}
