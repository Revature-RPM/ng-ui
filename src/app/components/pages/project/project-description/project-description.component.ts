import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../../services/project.service';
import {Project} from '../../../../models/Project';

@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.scss']
})
export class ProjectDescriptionComponent implements OnInit {

  project: Project;
  displayText: string;

  constructor(private projectService: ProjectService) {
  }

  /**
   * In this component we subscribe to the CurrentProject$ observable.
   * If the ProjectService.currentProject is changed via the project-list
   * component then the observable pushes new content to this component to
   * display.
   *
   * @author Ian Baker | Rodel Flores 190422-Java-USF
   */

  ngOnInit() {

    this.projectService.CurrentProject$.subscribe(
      proj => {
        this.project = proj;
        this.displayText = this.project.description;
      });
  }
}
