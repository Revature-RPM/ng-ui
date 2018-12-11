import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent implements OnInit {
  user: User = {};

  constructor(private router: Router) {
  }

  submitProject() {
    this.router.navigate(['/project_submission']);
  }

  ngOnInit() {
  }
}
