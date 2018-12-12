import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { Project } from 'src/app/core/models/Project';
import { ProjectService } from 'src/app/core/services/project.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/User';

// hardcoded Project data ... should be deleted later
const PROJECT_DATA: Project[] = [
  {
    id: 1, name: 'TopShelf', batch: '1810-oct08-java-usf', trainer: 'Yuki Mano',
    groupMembers: ['Yuki Mano', 'Caleb Massey', 'Shawn Bickel'],
    screenShots: ['https://i.ytimg.com/vi/wRx3Uvcktm8/maxresdefault.jpg',
      'https://gfnc1kn6pi-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/best-food-for-pug-puppies-header.jpg',
      'https://buzzsharer.com/wp-content/uploads/2016/04/pug-sleeping-upside.jpg', ],
      zipLinks: ['https://github.com/1810-oct08-java-usf/ng-ui', 'https://github.com/1810-oct08-java-usf/auth-service'],
    techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'description of TopShelf'
  },
  {
    id: 2, name: 'Kevin Craft Bacon', batch: '1810-oct08-java-usf', trainer: 'Wezley Singleton',
    groupMembers: ['Sahil', 'Ryan', 'Jeffly', 'Sadiki'], screenShots: ['https://i.ytimg.com/vi/wRx3Uvcktm8/maxresdefault.jpg',
      'https://gfnc1kn6pi-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/best-food-for-pug-puppies-header.jpg',
      'https://buzzsharer.com/wp-content/uploads/2016/04/pug-sleeping-upside.jpg', ],
      zipLinks: ['https://github.com/1810-oct08-java-usf/ng-ui', 'https://github.com/1810-oct08-java-usf/auth-service'],
    techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'description of Kevin Craft Bacon'
  },
  {
    id: 3, name: 'Tratior', batch: '1810-oct08-java-usf', trainer: 'Wezley Singleton',
    groupMembers: ['Paul', 'Miles', 'Derek', 'Andrew'], screenShots: ['https://i.ytimg.com/vi/wRx3Uvcktm8/maxresdefault.jpg',
      'https://gfnc1kn6pi-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/best-food-for-pug-puppies-header.jpg',
      'https://buzzsharer.com/wp-content/uploads/2016/04/pug-sleeping-upside.jpg', ],
      zipLinks: ['https://github.com/1810-oct08-java-usf/ng-ui', 'https://github.com/1810-oct08-java-usf/auth-service'],
    techStack: 'Full-Stack Java Developer', status: 'Pending', description: 'Description of Tratior'
  },
  {
    id: 1, name: 'TopShelf', batch: '1810-oct08-java-usf', trainer: 'Wezley Singleton',
    groupMembers: ['Yuki Mano', 'Caleb Massey', 'Shawn Bickel'], screenShots: ['https://i.ytimg.com/vi/wRx3Uvcktm8/maxresdefault.jpg',
      'https://gfnc1kn6pi-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/best-food-for-pug-puppies-header.jpg',
      'https://buzzsharer.com/wp-content/uploads/2016/04/pug-sleeping-upside.jpg', ],
      zipLinks: ['https://github.com/1810-oct08-java-usf/ng-ui', 'https://github.com/1810-oct08-java-usf/auth-service'],
    techStack: 'Full-Stack Java Developer', status: 'Pending', description: 'description of TopShelf'
  },
  {
    id: 2, name: 'Kevin Craft Bacon', batch: '1810-oct08-java-usf', trainer: 'Wezley Singleton',
    groupMembers: ['Sahil', 'Ryan', 'Jeffly', 'Sadiki'], screenShots: ['https://i.ytimg.com/vi/wRx3Uvcktm8/maxresdefault.jpg',
      'https://gfnc1kn6pi-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/best-food-for-pug-puppies-header.jpg',
      'https://buzzsharer.com/wp-content/uploads/2016/04/pug-sleeping-upside.jpg', ],
      zipLinks: ['https://github.com/1810-oct08-java-usf/ng-ui', 'https://github.com/1810-oct08-java-usf/auth-service'],
    techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'description of Kevin Craft Bacon'
  },
  {
    id: 3, name: 'Tratior', batch: '1810-oct08-java-usf', trainer: 'Wezley Singleton',
    groupMembers: ['Paul', 'Miles', 'Derek', 'Andrew'], screenShots: ['https://i.ytimg.com/vi/wRx3Uvcktm8/maxresdefault.jpg',
      'https://gfnc1kn6pi-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/best-food-for-pug-puppies-header.jpg',
      'https://buzzsharer.com/wp-content/uploads/2016/04/pug-sleeping-upside.jpg', ],
      zipLinks: ['https://github.com/1810-oct08-java-usf/ng-ui', 'https://github.com/1810-oct08-java-usf/auth-service'],
    techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'Description of Tratior'
  },
  {
    id: 1, name: 'TopShelf', batch: '1810-oct08-java-usf', trainer: 'Wezley Singleton',
    groupMembers: ['Yuki Mano', 'Caleb Massey', 'Shawn Bickel'], screenShots: ['https://i.ytimg.com/vi/wRx3Uvcktm8/maxresdefault.jpg',
      'https://gfnc1kn6pi-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/best-food-for-pug-puppies-header.jpg',
      'https://buzzsharer.com/wp-content/uploads/2016/04/pug-sleeping-upside.jpg', ],
      zipLinks: ['https://github.com/1810-oct08-java-usf/ng-ui', 'https://github.com/1810-oct08-java-usf/auth-service'],
    techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'description of TopShelf'
  },
  {
    id: 2, name: 'Kevin Craft Bacon', batch: '1810-oct08-java-usf', trainer: 'Wezley Singleton',
    groupMembers: ['Sahil', 'Ryan', 'Jeffly', 'Sadiki'], screenShots: ['https://i.ytimg.com/vi/wRx3Uvcktm8/maxresdefault.jpg',
      'https://gfnc1kn6pi-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/best-food-for-pug-puppies-header.jpg',
      'https://buzzsharer.com/wp-content/uploads/2016/04/pug-sleeping-upside.jpg', ],
      zipLinks: ['https://github.com/1810-oct08-java-usf/ng-ui', 'https://github.com/1810-oct08-java-usf/auth-service'],
    techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'description of Kevin Craft Bacon'
  },
  {
    id: 3, name: 'Tratior', batch: '1810-oct08-java-usf', trainer: 'Wezley Singleton',
    groupMembers: ['Paul', 'Miles', 'Derek', 'Andrew'], screenShots: ['https://i.ytimg.com/vi/wRx3Uvcktm8/maxresdefault.jpg',
      'https://gfnc1kn6pi-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/best-food-for-pug-puppies-header.jpg',
      'https://buzzsharer.com/wp-content/uploads/2016/04/pug-sleeping-upside.jpg', ],
      zipLinks: ['https://github.com/1810-oct08-java-usf/ng-ui', 'https://github.com/1810-oct08-java-usf/auth-service'],
    techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'Description of Tratior'
  },
  {
    id: 1, name: 'TopShelf', batch: '1810-oct08-java-usf', trainer: 'Wezley Singleton',
    groupMembers: ['Yuki Mano', 'Caleb Massey', 'Shawn Bickel'], screenShots: ['https://i.ytimg.com/vi/wRx3Uvcktm8/maxresdefault.jpg',
      'https://gfnc1kn6pi-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/best-food-for-pug-puppies-header.jpg',
      'https://buzzsharer.com/wp-content/uploads/2016/04/pug-sleeping-upside.jpg', ],
      zipLinks: ['https://github.com/1810-oct08-java-usf/ng-ui', 'https://github.com/1810-oct08-java-usf/auth-service'],
    techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'description of TopShelf'
  },
  {
    id: 2, name: 'Kevin Craft Bacon', batch: '1810-oct08-java-usf', trainer: 'Wezley Singleton',
    groupMembers: ['Sahil', 'Ryan', 'Jeffly', 'Sadiki'], screenShots: ['https://i.ytimg.com/vi/wRx3Uvcktm8/maxresdefault.jpg',
      'https://gfnc1kn6pi-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/best-food-for-pug-puppies-header.jpg',
      'https://buzzsharer.com/wp-content/uploads/2016/04/pug-sleeping-upside.jpg', ],
      zipLinks: ['https://github.com/1810-oct08-java-usf/ng-ui', 'https://github.com/1810-oct08-java-usf/auth-service'],
    techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'description of Kevin Craft Bacon'
  },
  {
    id: 3, name: 'Tratior', batch: '1810-oct08-java-usf', trainer: 'Wezley Singleton',
    groupMembers: ['Paul', 'Miles', 'Derek', 'Andrew'], screenShots: ['https://i.ytimg.com/vi/wRx3Uvcktm8/maxresdefault.jpg',
      'https://gfnc1kn6pi-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/best-food-for-pug-puppies-header.jpg',
      'https://buzzsharer.com/wp-content/uploads/2016/04/pug-sleeping-upside.jpg', ],
      zipLinks: ['https://github.com/1810-oct08-java-usf/ng-ui', 'https://github.com/1810-oct08-java-usf/auth-service'],
    techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'Description of Tratior'
  },
];

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ViewProjectsComponent implements OnInit, OnDestroy {
  trainerCanEdit = false;
  currentUser: User;
  displayedColumns: string[] = ['name', 'batch', 'trainer', 'techStack', 'status']; // change trainer to trainer
  dataSource: MatTableDataSource<Project>;
  @ViewChild(MatSort) sort: MatSort;
  expandedProject: Project | null;

  imagePage = 0;

  allProjects: Project[];
  userProjects: Project[];
  subscription: Subscription;
  constructor(private router: Router, private viewProjectsService: ProjectService) { 

   }

  /**
 * this is a lifecycle method called once by Angular after ngOnChanges(); it should be used to perform intialization logic; 
 * the content of the method includes a call to a service to consume information from an endpoint concerning projects; an observable 
 * is subscribed to and the returned projects are placed in an array to be displayed in a grid view.
 * @author Shawn Bickel (1810-Oct08-Java-USF)
 */
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    const trainerFullName = this.currentUser.firstName + ' ' + this.currentUser.lastName;
    this.subscription = this.viewProjectsService.getAllProjects()
    .subscribe((projectResponse) => {
      console.log(projectResponse);
      this.allProjects = projectResponse;
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.allProjects);
      /* place all the current user's project's in an array to easily switch between tabs to see all projects and a particular user's projects
          without having to make multiple calls to the server  */
      this.userProjects = [];
      for (let i = 0; i < projectResponse.length; i++){
        if (projectResponse[i].trainer === trainerFullName){
          this.userProjects.push(projectResponse[i]);
        }
    }
      this.dataSource = new MatTableDataSource(this.allProjects);
      this.dataSource.sort = this.sort;
      console.log('got projects');
      console.log(this.allProjects);
    });
  }

  /**
   * This method determines if a trainer can edit a project; a trainer can only edit a project if the project was submitted by the trainer.
   * The click event of this method is used to find the name of the trainer displayed in the row; if the trainer in the row is the same as the 
   *        currently logged in user, then the trainer can edit the project
   * @param rowClick : the event when a row is clicked and expanded
   * @author Shawn Bickel (1810-Oct08-Java-USF)
   */
  canEdit(rowClick) {
    console.log();
   // retrieve the trainer displayed in the table row
    const trainer = rowClick.path[1].cells[2].innerHTML.trim();

     // Retrieve the user from local storage and ensure that the user can edit the project if the user submitted the project
     const trainerFullName = this.currentUser.firstName + ' ' + this.currentUser.lastName;
     if (trainerFullName === trainer) {
        this.trainerCanEdit = true;
     } else {
       this.trainerCanEdit = false;
     }
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

  /**
   * This function is used to filter the table based on the inputted string. 
   * It is binded as an event listener. 
   * @param filterValue : a string value that is used to filter the dataSource for the MatTable
   * @author Yuki Mano (1810-Oct08-Java-USF)
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * This function is used to increment the page index of the project's screenshot.
   * Incrementing the page index will render the next project's screenshot. 
   * @param totalAmountOfScreenShots : a number value that contains the total number of screenshots for a particular project
   * @author Yuki Mano (1810-Oct08-Java-USF)
   */
  nextImage(totalAmountOfScreenShots: number) {
    this.imagePage = (this.imagePage + 1)%totalAmountOfScreenShots;
  }

  /**
   * This function is used to decrement the page index of the project's screenshot.
   * Decrementing the page index will render the next project's screenshot. 
   * @param totalAmountOfScreenShots : a number value that contains the total number of screenshots for a particular project
   * @author Yuki Mano (1810-Oct08-Java-USF)
   */
  previousImage(totalAmountOfScreenShots: number) {
    this.imagePage--;
    if (this.imagePage < 0) {
      this.imagePage = totalAmountOfScreenShots;
    }
  }

  codebase(project){
    this.viewProjectsService.CurrentProject = project;
    this.router.navigate(['/codebase']);
  }

  edit(project){
    this.router.navigate([project.id + '/edit']);
  }

  submitProject() {
    this.router.navigate(['/project_submission']);
  }

  yourProjects(){
    this.viewProjects(false);
  }

  projects(){
    this.viewProjects(true);
  }

  viewProjects(allProjects: boolean){
    if (allProjects){
      this.dataSource = new MatTableDataSource(this.allProjects);
    }else{
      this.dataSource = new MatTableDataSource(this.userProjects);
    }
  }
}
