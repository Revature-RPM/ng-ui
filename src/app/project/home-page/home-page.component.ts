import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // if (localStorage.getItem('user') === null) {
    //   this.router.navigate(['/auth/login']);
    // }
    const tempUser: User = {
      id: 1,
      firstName: 'Wezley',
      lastName: 'Singleton',
      username: 'YukiMano',
      password: 'password',
      role: 'trainer',
      email: 'ym@revature.com',
    };

    window.localStorage.setItem('user', JSON.stringify(tempUser));
  }
}
