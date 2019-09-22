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

/**
 * The purpose of this component is to display the current project's details
 * and make them available for approval/denial.
 * @author Mikaela Enters
 * @author Donald Henderson
 */

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

  /**
   * This method is used to set the project's status to 'approved,' making it 
   * eligible to be viewed from the project-list component.
   * @author Donald Henderson
   * @author Mikaela Emters
   * @author Zak Noori
   * @author Aisha Hodge
   */
  approveProject() {
    this.project.status = 'Approved';
    this.projectService.updateProject(this.project, this.project.id).subscribe(response => {
    });
  }

  /**
   * This method is used to set the project's status to 'denied,' making it
   *  uneligible to be viewed from the project-list component.
   * @author Donald Henderson
   * @author Mikaela Emters
   * @author Zak Noori
   * @author Aisha Hodge 
   */
  denyProject() {
    this.project.status = 'Denied';
    this.projectService.updateProject(this.project, this.project.id).subscribe(response => {
    });
  }
}
