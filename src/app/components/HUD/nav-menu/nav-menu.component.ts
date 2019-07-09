import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  loggedIn = false;
  panelOpenState = false;

  constructor(private projectService: ProjectService, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('jwt')) this.loggedIn = true;
    else this.loggedIn = false;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['auth/login'])
  }

  getProjects(type) {
    switch (type) {
      case 'user':
        this.projectService.projFilter = 'user';
        break;
      case 'all':
        this.projectService.projFilter = 'all';
        break;
    }
  }

}
