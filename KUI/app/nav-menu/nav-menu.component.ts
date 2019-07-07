import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  loggedIn;
  panelOpenState = false;

  login() {
    this.loggedIn=true;
  }

  logout() {
    this.loggedIn=false;
  }

  constructor() { }

  ngOnInit() {
    
  }

}
