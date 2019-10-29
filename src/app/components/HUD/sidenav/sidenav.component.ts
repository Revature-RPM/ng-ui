import {Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  loggedIn = false;

  log(state) {
    console.log(state);
  }

  constructor(
    private userService: UserService,
    private router: Router)
  {
    this.userService.user.asObservable().subscribe(
      user => {
        if(user) this.loggedIn = true;
        else this.loggedIn = false;
      }
    );

  }

  ngOnInit() {

  }

  routeToProfile() {
    this.router.navigate(['/profile']);
  }

}
