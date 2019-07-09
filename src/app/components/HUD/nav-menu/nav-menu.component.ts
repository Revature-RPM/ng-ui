import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import {Router} from '@angular/router';
import {UserService} from 'src/app/services/user.service';
import {User} from 'src/app/models/User';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  loggedIn = false;
  panelOpenState = false;
  user: User;

  constructor(private projectService: ProjectService, private userService: UserService, private router: Router) {
  }

  ngOnInit() {

    this.userService.user.asObservable().subscribe(
      user => {
        this.user = user;
        if (this.user) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      }
    );
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['auth/login']);
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
