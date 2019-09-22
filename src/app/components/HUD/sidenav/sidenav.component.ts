import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  log(state) {
    console.log(state);
  }
  constructor(private router: Router) { }

  ngOnInit() {
  }

  routeToProfile() {
    this.router.navigate(['/profile']);
  }
}
