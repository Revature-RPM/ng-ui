import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
  {
<<<<<<< HEAD:src/app/guards/myproject-view.guard.ts
    let user:User = JSON.parse(localStorage.getItem("user"));

    // if(user && user.role.toLowerCase() != "admin")
    
=======
    let user: User = JSON.parse(localStorage.getItem("user"));
    if(user && user.role.toLowerCase().includes("admin")) return true;
    else this.router.navigate([""]);
    return false;
>>>>>>> 1ccb38255feef2925bb6d16c522c34a3c36bfe28:src/app/guards/admin.guard.ts
  }
}
