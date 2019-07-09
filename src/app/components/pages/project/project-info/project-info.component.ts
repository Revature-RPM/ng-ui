import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../../services/project.service';
import { Project } from '../../../../models/Project';

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

  project: Project;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    this.projectService.CurrentProject$.asObservable().subscribe(
      proj => {
        console.log("test");
        if (proj) {
          console.log(proj);
          this.project = proj;
        }
      });
  }

}
