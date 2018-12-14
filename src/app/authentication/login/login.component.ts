import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgMetaService } from 'ngmeta';
import { first } from 'rxjs/operators';

import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user.service';

/**
 * Login component takes in a username and password and checks to see if user exists. If
 * user exists, user is successfully logged in. Validation includes not letting user hit
 * login until form is entirely filled out
 * @author Ryan Beevers (1810-Oct08-Java-USF)
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = { };

  constructor(private userService: UserService, private router: Router, private ngmeta: NgMetaService) { }

  ngOnInit() {
    if (this.userService.getUser() !== null) {
      this.router.navigate(['']);
    } else {
      this.ngmeta.setHead({ title: 'Login | RPM' });
    }
  }

  login() {
    this.userService.login(this.user).pipe(first()).subscribe((user) => {
      if (user) {
        this.router.navigate(['/home']);
      } else {
        alert('Error logging in');
      }
    }, (error) => { alert('ERROR LOGGING IN'); });
  }
}
