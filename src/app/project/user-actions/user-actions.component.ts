import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent implements OnInit {
  user: User = {};

  constructor(private router: Router,) {
  }

  ngOnInit() {
  }
}
