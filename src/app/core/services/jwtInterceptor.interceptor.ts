import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if(window.localStorage.getItem("jwt")){
    console.log("attaching headers")
    console.log("attaching: "   + window.localStorage.getItem("jwt"))
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${window.localStorage.getItem("jwt")}`
      }
    });
    console.log(request.headers.get('authorization'))
  }
  
    return next.handle(request);
  }
}