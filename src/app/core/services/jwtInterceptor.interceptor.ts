import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
@Injectable()
export class jwtinterceptor implements HttpInterceptor {
  constructor(public auth: UserService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request.url)
    if(this.protectedEndPoints(request.url)>0)
    console.log("jwinterceptor if block")
    else
    console.log("jwinterceptor else block")
    request = request.clone({
      setHeaders: {
      }
    });
    return next.handle(request);
  }
  protectedEndPoints(url: string): number{
      console.log(url.indexOf('http://localhost:4200/auth/'))
      return url.indexOf('http://localhost:4200/auth/');
      
  }
}