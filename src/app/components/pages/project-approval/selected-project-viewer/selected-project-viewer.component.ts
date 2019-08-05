import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../../../services/project.service';
import {Project} from '../../../../models/Project';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-selected-project-viewer',
  templateUrl: './selected-project-viewer.component.html',
  styleUrls: ['./selected-project-viewer.component.scss']
})
export class SelectedProjectViewerComponent implements OnInit {

  project: Project;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.projectService.CurrentProject$.asObservable().subscribe(
      proj => {
        if (proj) {
          this.project = proj;
        }
      });
  }

  approveProject() {
    this.project.status = 'Approved';
    this.projectService.updateProject(this.project, this.project.id).subscribe(response => {
    });
  }

  denyProject() {
    this.project.status = 'Denied';
    this.projectService.updateProject(this.project, this.project.id).subscribe(response => {
    });
  }
}
