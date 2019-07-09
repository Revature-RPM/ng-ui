import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../../services/project.service';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})

/**
 *  This component is responsible for displaying project metatdata
 *  It subscribes to the ProjectService.currentProject taking
 *  its initial value and updating as needed via an observable.
 *
 *  @author Rodel Flores | Ian Baker 190422-Java-USF
 */

export class ProjectInfoComponent implements OnInit {
  private displayName: string;
  private displayBatch: string;
  private displayApprovingProject: boolean;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    this.projectService.CurrentProject$.subscribe(
      proj => {
        this.displayName = this.projectService.CurrentProject.name;
        this.displayBatch = this.projectService.CurrentProject.batch;
        this.displayApprovingProject = this.projectService.CurrentProject.approvingProject;
      });
  }

}
