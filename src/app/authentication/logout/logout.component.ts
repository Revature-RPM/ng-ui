import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoggedInService } from '../../core/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private loggedIn: LoggedInService, private router: Router) {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
      this.loggedIn.loggedIn.next(false);
      router.navigate(['']);
    }
  }

  ngOnInit() {
  }
}
