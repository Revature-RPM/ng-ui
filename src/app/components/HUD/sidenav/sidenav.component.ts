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
  homepage = false;
  notification = false;
  count = 1;

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
    
    /**
     * Subscribe to router changes in order to know when to display content in the toolbar
     */
    this.router.events.subscribe(e => {
      if(e instanceof NavigationEnd) {
        if( e.url == "/" || e.url.includes("home")) this.homepage = true;
        else this.homepage = false;
      }

    });

  }

  ngOnInit() {

  }

  routeToProfile() {
    this.router.navigate(['/profile']);
  }

  /**
   * Navigate to the element in the screen that matches the id passed to the method
   * @param id
   */
  goToElement(id: string) {
    let elem = document.getElementById(id);
    elem.scrollIntoView({behavior: "smooth"});
  }
}
