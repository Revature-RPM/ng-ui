import {Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  log(state) {
    console.log(state);
  }

  loggedIn:boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((e) => {
      if(e instanceof NavigationEnd) {
        this.loggedIn = e.url.includes("auth/login") ? false : true;
        console.log("loggedIn", this.loggedIn);
      }
    });
  }

  ngOnInit() {

  }

  routeToProfile() {
    this.router.navigate(['/profile']);
  }
}
