import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/Project';
import { Subscription } from 'rxjs';
<<<<<<< HEAD
import { ProjectServiceService } from 'src/app/core/services/project-service.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
=======
import { ProjectService } from 'src/app/core/services/project.service';
>>>>>>> 058c0817660304d5ce32fe5dfff2b4cb07bba413

const PROJECT_DATA: Project[] = [
  {id: 1, name: 'TopShelf', batch: '1810-oct08-java-usf', fullName: 'Wezley Singleton', 
  groupMembers:['Yuki Mano','Caleb Massey', 'Shawn Bickel'], screenShots: [], zipLinks: [], 
  techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'description of TopShelf'},
  {id: 2, name: 'Kevin Craft Bacon', batch: '1810-oct08-java-usf', fullName: 'Wezley Singleton', 
  groupMembers:['Sahil','Ryan', 'Jeffly', 'Sadiki'], screenShots: [], zipLinks: [], 
  techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'description of Kevin Craft Bacon'},
  {id: 3, name: 'Tratior', batch: '1810-oct08-java-usf', fullName: 'Wezley Singleton', 
  groupMembers:['Paul','Miles',  'Derek', 'Andrew'], screenShots: [], zipLinks: [], 
  techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'Description of Tratior'},
  {id: 1, name: 'TopShelf', batch: '1810-oct08-java-usf', fullName: 'Wezley Singleton', 
  groupMembers:['Yuki Mano','Caleb Massey', 'Shawn Bickel'], screenShots: [], zipLinks: [], 
  techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'description of TopShelf'},
  {id: 2, name: 'Kevin Craft Bacon', batch: '1810-oct08-java-usf', fullName: 'Wezley Singleton', 
  groupMembers:['Sahil','Ryan', 'Jeffly', 'Sadiki'], screenShots: [], zipLinks: [], 
  techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'description of Kevin Craft Bacon'},
  {id: 3, name: 'Tratior', batch: '1810-oct08-java-usf', fullName: 'Wezley Singleton', 
  groupMembers:['Paul','Miles',  'Derek', 'Andrew'], screenShots: [], zipLinks: [], 
  techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'Description of Tratior'},
  {id: 1, name: 'TopShelf', batch: '1810-oct08-java-usf', fullName: 'Wezley Singleton', 
  groupMembers:['Yuki Mano','Caleb Massey', 'Shawn Bickel'], screenShots: [], zipLinks: [], 
  techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'description of TopShelf'},
  {id: 2, name: 'Kevin Craft Bacon', batch: '1810-oct08-java-usf', fullName: 'Wezley Singleton', 
  groupMembers:['Sahil','Ryan', 'Jeffly', 'Sadiki'], screenShots: [], zipLinks: [], 
  techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'description of Kevin Craft Bacon'},
  {id: 3, name: 'Tratior', batch: '1810-oct08-java-usf', fullName: 'Wezley Singleton', 
  groupMembers:['Paul','Miles',  'Derek', 'Andrew'], screenShots: [], zipLinks: [], 
  techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'Description of Tratior'},
];

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
<<<<<<< HEAD

export class ViewProjectsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'batch', 'fullName', 'techStack', 'status']; // change fullName to trainer
  dataSource = PROJECT_DATA;
  expandedProject: Project | null;
  
=======
export class ViewProjectsComponent implements OnInit, OnDestroy {
>>>>>>> 058c0817660304d5ce32fe5dfff2b4cb07bba413
  projects: Project[];
  subscription: Subscription;
  constructor(private viewProjectsService: ProjectService) { }

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
            console.log('got projects');
            console.log( projectResponse);
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
