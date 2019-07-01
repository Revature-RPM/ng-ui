import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

/**
 * The Home page contains the navbar and the ability to view projects and their details
 * To future batches: learn everything you can about change detection
 * Here is a helpful resource: https://youtu.be/ybNj-id0kjY
 * Good luck!
 */
export class HomePageComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }


  /* The logic for stripping expired JWTs and rerouting
     to the login page is in the JWTInterceptor.

     The logic below is commented out in light of the
     improvements to the JWTInterceptor.
  */

  ngOnInit() {
    // if (this.userService.getUser() === null) {
    //   this.router.navigate(['/auth/login']);
    // }
  }
}
