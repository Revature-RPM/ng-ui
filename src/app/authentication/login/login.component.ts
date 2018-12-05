import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { User } from 'src/app/core/models/User';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  sessionUser = false; // localStorage.getItem('user');
  user: User = {};

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (this.sessionUser) {
      this.router.navigate(['']);
    }
  }

  login() {
    this.userService.login(this.user).pipe(first()).subscribe((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['']);
      }
    });
  }
}
