import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from '../services/project.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectViewGuard implements CanActivate {
  
  constructor(private router: Router, private projectService: ProjectService) {

  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
  {
    if(this.projectService.CurrentProject) return true;
    else {
      this.router.navigate([""]);
      //return false;
    }
    return false;
  }
}
