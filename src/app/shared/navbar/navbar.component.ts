import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: User = {};

  constructor(private router: Router) {
  }

  goToRegister() {
    this.router.navigate(['auth','register']);
  }

  goToLogin() {
    this.router.navigate(['auth','login']);
  }

  userAccount() {
    this.router.navigate(['account',this.user.id]);
  }

  logout() {
    this.router.navigate(['auth','login']);
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    // if(!this.user){
    //   this.router.navigate(['auth','login']);
    // }
  }

  homepageShortcut() {
    this.router.navigate(['projects','home']);
  }
}
