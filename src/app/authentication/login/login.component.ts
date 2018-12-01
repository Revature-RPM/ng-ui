import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { User } from 'src/app/core/models/user';
import { LoggedInService, UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  sessionUser = localStorage.getItem('user');
  user: User = {};

  constructor(private loggedIn: LoggedInService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    if (this.sessionUser) {
      this.router.navigate(['']);
    }
  }

  login() {
    this.userService.login(this.user).pipe(first()).subscribe((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.loggedIn.loggedIn.next(true);
        this.router.navigate(['']);
      }
    });
  }
}
