import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-logo',
  templateUrl: './app-logo.component.html',
  styleUrls: ['./app-logo.component.scss']
})
export class AppLogoComponent implements OnInit {

  loginRegister = false;

  constructor(private router: Router) { }

  ngOnInit() {
    if(this.router.url == '/auth/login' || this.router.url == '/auth/register') {
      this.loginRegister = true;
    }
  }

  homepageShortcut() {
    this.router.navigate(['projects', 'home']);
  }
}
