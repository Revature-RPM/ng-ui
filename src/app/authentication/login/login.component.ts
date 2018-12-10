import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgMetaService } from 'ngmeta';
import { first } from 'rxjs/operators';

import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = {};

  constructor(private userService: UserService, private router: Router, private ngmeta: NgMetaService) { }

  ngOnInit() {
    if (localStorage.getItem('user') !== null) {
      this.router.navigate(['']);
    } else {
      this.ngmeta.setHead({ title: 'Login | RPM' });
    }
  }

  login() {
    this.userService.login(this.user).pipe(first()).subscribe((user) => {
        this.router.navigate(['/home']);
    }, (error) => { alert('ERROR LOGGING IN'); });
  }
}
