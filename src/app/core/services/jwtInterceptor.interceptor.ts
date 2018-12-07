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
    console.log("heloehelehoeheheoeheoheoeheho i'm an annoying interceptor")
    console.log(request.url)
    if(this.protectedEndPoints(request.url)>0)
    console.log("YOU ARE WELECOME")
    else
    console.log("GET LOST")
    request = request.clone({
      setHeaders: {
      }
    });
    return next.handle(request);
  }
  protectedEndPoints(url: string): number{
      console.log(url.indexOf('http://localhost:4200/login'))
      return url.indexOf('http://localhost:4200/login');
      
  }
}