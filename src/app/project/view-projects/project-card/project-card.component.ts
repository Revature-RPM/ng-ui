import { Component, OnInit, Input  } from '@angular/core';

import { Project } from '../../../core/models/Project';
import { User } from '../../../core/models/User';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() project: Project;
  admin = true;
  approved = false;
  loggedInUser: User;
  currentimage: string;

  constructor() { }

  ngOnInit() {
    console.log(this.project.techStack[0]);
  }

  changeImage() {
  }
}
