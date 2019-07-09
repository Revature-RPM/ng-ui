import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../../services/project.service';

@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.scss']
})
export class ProjectDescriptionComponent implements OnInit {

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
        this.displayText = this.projectService.CurrentProject.description;
      });
  }
}
