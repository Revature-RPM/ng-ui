import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { Project } from 'src/app/core/models/Project';
import { ProjectService } from 'src/app/core/services/project.service';
import { Router } from '@angular/router';

const PROJECT_DATA: Project[] = [
  {
    id: 1, name: 'TopShelf', batch: '1810-oct08-java-usf', userFullName: 'Wezley Singleton',
    groupMembers: ['Yuki Mano', 'Caleb Massey', 'Shawn Bickel'],
    screenShots: ['https://i.ytimg.com/vi/wRx3Uvcktm8/maxresdefault.jpg',
      'https://gfnc1kn6pi-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/best-food-for-pug-puppies-header.jpg',
      'https://buzzsharer.com/wp-content/uploads/2016/04/pug-sleeping-upside.jpg',], zipLinks: ['https://github.com/1810-oct08-java-usf/ng-ui', 'https://github.com/1810-oct08-java-usf/auth-service'],
    techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'description of TopShelf'
  },
  {
    id: 2, name: 'Kevin Craft Bacon', batch: '1810-oct08-java-usf', userFullName: 'Wezley Singleton',
    groupMembers: ['Sahil', 'Ryan', 'Jeffly', 'Sadiki'], screenShots: ['https://i.ytimg.com/vi/wRx3Uvcktm8/maxresdefault.jpg',
      'https://gfnc1kn6pi-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/best-food-for-pug-puppies-header.jpg',
      'https://buzzsharer.com/wp-content/uploads/2016/04/pug-sleeping-upside.jpg',], zipLinks: ['https://github.com/1810-oct08-java-usf/ng-ui', 'https://github.com/1810-oct08-java-usf/auth-service'],
    techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'description of Kevin Craft Bacon'
  },
  {
    id: 3, name: 'Tratior', batch: '1810-oct08-java-usf', userFullName: 'Wezley Singleton',
    groupMembers: ['Paul', 'Miles', 'Derek', 'Andrew'], screenShots: ['https://i.ytimg.com/vi/wRx3Uvcktm8/maxresdefault.jpg',
      'https://gfnc1kn6pi-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/best-food-for-pug-puppies-header.jpg',
      'https://buzzsharer.com/wp-content/uploads/2016/04/pug-sleeping-upside.jpg',], zipLinks: ['https://github.com/1810-oct08-java-usf/ng-ui', 'https://github.com/1810-oct08-java-usf/auth-service'],
    techStack: 'Full-Stack Java Developer', status: 'Pending', description: 'Description of Tratior'
  },
  {
    id: 1, name: 'TopShelf', batch: '1810-oct08-java-usf', userFullName: 'Wezley Singleton',
    groupMembers: ['Yuki Mano', 'Caleb Massey', 'Shawn Bickel'], screenShots: ['https://i.ytimg.com/vi/wRx3Uvcktm8/maxresdefault.jpg',
      'https://gfnc1kn6pi-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/best-food-for-pug-puppies-header.jpg',
      'https://buzzsharer.com/wp-content/uploads/2016/04/pug-sleeping-upside.jpg',], zipLinks: ['https://github.com/1810-oct08-java-usf/ng-ui', 'https://github.com/1810-oct08-java-usf/auth-service'],
    techStack: 'Full-Stack Java Developer', status: 'Pending', description: 'description of TopShelf'
  },
  {
    id: 2, name: 'Kevin Craft Bacon', batch: '1810-oct08-java-usf', userFullName: 'Wezley Singleton',
    groupMembers: ['Sahil', 'Ryan', 'Jeffly', 'Sadiki'], screenShots: ['https://i.ytimg.com/vi/wRx3Uvcktm8/maxresdefault.jpg',
      'https://gfnc1kn6pi-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/best-food-for-pug-puppies-header.jpg',
      'https://buzzsharer.com/wp-content/uploads/2016/04/pug-sleeping-upside.jpg',], zipLinks: ['https://github.com/1810-oct08-java-usf/ng-ui', 'https://github.com/1810-oct08-java-usf/auth-service'],
    techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'description of Kevin Craft Bacon'
  },
  {
    id: 3, name: 'Tratior', batch: '1810-oct08-java-usf', userFullName: 'Wezley Singleton',
    groupMembers: ['Paul', 'Miles', 'Derek', 'Andrew'], screenShots: ['https://i.ytimg.com/vi/wRx3Uvcktm8/maxresdefault.jpg',
      'https://gfnc1kn6pi-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/best-food-for-pug-puppies-header.jpg',
      'https://buzzsharer.com/wp-content/uploads/2016/04/pug-sleeping-upside.jpg',], zipLinks: ['https://github.com/1810-oct08-java-usf/ng-ui', 'https://github.com/1810-oct08-java-usf/auth-service'],
    techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'Description of Tratior'
  },
  {
    id: 1, name: 'TopShelf', batch: '1810-oct08-java-usf', userFullName: 'Wezley Singleton',
    groupMembers: ['Yuki Mano', 'Caleb Massey', 'Shawn Bickel'], screenShots: ['https://i.ytimg.com/vi/wRx3Uvcktm8/maxresdefault.jpg',
      'https://gfnc1kn6pi-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/best-food-for-pug-puppies-header.jpg',
      'https://buzzsharer.com/wp-content/uploads/2016/04/pug-sleeping-upside.jpg',], zipLinks: ['https://github.com/1810-oct08-java-usf/ng-ui', 'https://github.com/1810-oct08-java-usf/auth-service'],
    techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'description of TopShelf'
  },
  {
    id: 2, name: 'Kevin Craft Bacon', batch: '1810-oct08-java-usf', userFullName: 'Wezley Singleton',
    groupMembers: ['Sahil', 'Ryan', 'Jeffly', 'Sadiki'], screenShots: ['https://i.ytimg.com/vi/wRx3Uvcktm8/maxresdefault.jpg',
      'https://gfnc1kn6pi-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/best-food-for-pug-puppies-header.jpg',
      'https://buzzsharer.com/wp-content/uploads/2016/04/pug-sleeping-upside.jpg',], zipLinks: ['https://github.com/1810-oct08-java-usf/ng-ui', 'https://github.com/1810-oct08-java-usf/auth-service'],
    techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'description of Kevin Craft Bacon'
  },
  {
    id: 3, name: 'Tratior', batch: '1810-oct08-java-usf', userFullName: 'Wezley Singleton',
    groupMembers: ['Paul', 'Miles', 'Derek', 'Andrew'], screenShots: ['https://i.ytimg.com/vi/wRx3Uvcktm8/maxresdefault.jpg',
      'https://gfnc1kn6pi-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/best-food-for-pug-puppies-header.jpg',
      'https://buzzsharer.com/wp-content/uploads/2016/04/pug-sleeping-upside.jpg',], zipLinks: ['https://github.com/1810-oct08-java-usf/ng-ui', 'https://github.com/1810-oct08-java-usf/auth-service'],
    techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'Description of Tratior'
  },
  {
    id: 1, name: 'TopShelf', batch: '1810-oct08-java-usf', fullName: 'Wezley Singleton',
    groupMembers: ['Yuki Mano', 'Caleb Massey', 'Shawn Bickel'], screenShots: ['https://i.ytimg.com/vi/wRx3Uvcktm8/maxresdefault.jpg',
      'https://gfnc1kn6pi-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/best-food-for-pug-puppies-header.jpg',
      'https://buzzsharer.com/wp-content/uploads/2016/04/pug-sleeping-upside.jpg',], zipLinks: ['https://github.com/1810-oct08-java-usf/ng-ui', 'https://github.com/1810-oct08-java-usf/auth-service'],
    techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'description of TopShelf'
  },
  {
    id: 2, name: 'Kevin Craft Bacon', batch: '1810-oct08-java-usf', fullName: 'Wezley Singleton',
    groupMembers: ['Sahil', 'Ryan', 'Jeffly', 'Sadiki'], screenShots: ['https://i.ytimg.com/vi/wRx3Uvcktm8/maxresdefault.jpg',
      'https://gfnc1kn6pi-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/best-food-for-pug-puppies-header.jpg',
      'https://buzzsharer.com/wp-content/uploads/2016/04/pug-sleeping-upside.jpg',], zipLinks: ['https://github.com/1810-oct08-java-usf/ng-ui', 'https://github.com/1810-oct08-java-usf/auth-service'],
    techStack: 'Full-Stack Java Developer', status: 'Approved', description: 'description of Kevin Craft Bacon'
  },
  {
    id: 3, name: 'Tratior', batch: '1810-oct08-java-usf', fullName: 'Wezley Singleton',
    groupMembers: ['Paul', 'Miles', 'Derek', 'Andrew'], screenShots: ['https://i.ytimg.com/vi/wRx3Uvcktm8/maxresdefault.jpg',
      'https://gfnc1kn6pi-flywheel.netdna-ssl.com/wp-content/uploads/2018/06/best-food-for-pug-puppies-header.jpg',
      'https://buzzsharer.com/wp-content/uploads/2016/04/pug-sleeping-upside.jpg',], zipLinks: ['https://github.com/1810-oct08-java-usf/ng-ui', 'https://github.com/1810-oct08-java-usf/auth-service'],
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
  displayedColumns: string[] = ['name', 'batch', 'userFullName', 'techStack', 'status']; // change userFullName to trainer
  dataSource: MatTableDataSource<Project>;
  @ViewChild(MatSort) sort: MatSort;
  expandedProject: Project | null;

  imagePage = 0; 

  projects: Project[];
  subscription: Subscription;
  constructor(private router: Router, private viewProjectsService: ProjectService) { 
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(PROJECT_DATA);
   }

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
        console.log(projectResponse);
      });

      this.dataSource.sort = this.sort;
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

  // apply filter to the data source table by entering in any string
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  nextImage() {
    this.imagePage++;
  }

  previousImage(num: number) {
    this.imagePage--;
    if(this.imagePage<0){
      this.imagePage=num;
    }
  }
}
