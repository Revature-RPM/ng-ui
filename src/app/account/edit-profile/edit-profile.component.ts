import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  user: User = {
    id: 1,
    firstname: 'Yuki',
    lastname: 'Mano',
    username: 'ysm',
    password: 'password',
    userRole: 'trainer',
    email: 'ym@gmail.com',
  }

}
