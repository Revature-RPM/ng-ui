import { Component, OnInit } from '@angular/core';
import { Project } from '../../../core/models/Project';
@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  project: Project;
  admin: Boolean = true;
  approved: Boolean = false;
  constructor() {

   }

  ngOnInit() {
  }

}
