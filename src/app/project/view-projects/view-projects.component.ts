import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/Project';
import { Subscription } from 'rxjs';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}


@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.scss']
})
export class ViewProjectsComponent implements OnInit {
  projects: Project[];
  subscription: Subscription;
  constructor(private viewProjectsService: ProjectServiceService) { }

    /**
	 * this is a lifecycle method called once by Angular after ngOnChanges(); it should be used to perform intialization logic; 
   * the content of the method includes a call to a service to consume information from an endpoint concerning projects; an observable 
   * is subscribed to and the returned projects are placed in an array to be displayed in a grid view.
	 * @author Shawn Bickel (1810-Oct08-Java-USF)
	 */
  ngOnInit() {
    this.subscription = this.viewProjectsService.getAllProjects()
          .subscribe((projectResponse) => {
            this.projects = projectResponse;
            console.log("got projects")
            console.log( projectResponse)
            });
  }

   /**
	 * this is a lifecycle method called once by Angular before the component is destroyed;
   * it is usually used to close resources such as unsubscribing from the observable's data stream;
   * resources should be released to avoid memory leaks
	 * @author Shawn Bickel (1810-Oct08-Java-USF)
	 */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
