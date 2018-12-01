import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  Name : String;
  Batch?: String;
  Trainers?: User[];
  GroupMembers?: String[];
  Screenshots?: String[];
  TeamImage?: String;
  RepoLinks?: String[];
  TeckStack?: String[];
  Status?: String;
  Description?: String;
  constructor() { }

  ngOnInit() {
  }

}
