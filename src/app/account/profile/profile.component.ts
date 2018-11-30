import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = {
    id: 1,
    firstname: 'Yuki',
    lastname: 'Mano',
    username: 'ysm',
    password: 'password',
    userRole: 'trainer',
    email: 'ym@gmail.com',
  }

  constructor() { }

  ngOnInit() {
  }

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

}
