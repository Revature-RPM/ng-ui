import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})



export class ProjectListComponent implements OnInit {

  

  projects = [
    {
      title: "Project 1"
    },
    {
      title: "Project 2"
    },
    {
      title: "Project 3"
    },
    {
      title: "Project 4"
    },
    {
      title: "Project 5"
    },
    {
      title: "Project 6"
    },
    {
      title: "Project 7"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
