import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from 'src/app/models/User';
import {Project} from 'src/app/models/Project';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ProjectService} from 'src/app/services/project.service';
import {UserService} from 'src/app/services/user.service';
import {Router, Params, ActivatedRoute} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProjectListComponent implements OnInit {

  trainerFullName;
  currentUser: User;
  displayedColumns: string[] = ['name', 'batch', 'trainer', 'techStack', 'status'];
  dataSource: MatTableDataSource<Project>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  expandedProject: Project | null;
  imagePage = 0;
  userId: string;
  projectList: Project[] = [];

  constructor(private router: Router, private userService: UserService, private projectService: ProjectService, private route: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.userService.user.asObservable().subscribe(
      user => {
        if (user) {
        this.currentUser = user;
        this.trainerFullName = this.currentUser.firstName.trim() + ' ' + this.currentUser.lastName.trim();
        }
      }
    );
    
    // If the current page is 'projects-user' get the userId
    if(this.router.url.includes('projects-user')) {
      this.userId = this.currentUser.id + "";
    }

    this.projectList = this.loadProjects(this.userId);

    this.dataSource = new MatTableDataSource(this.projectList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }



  /* Basically, if the route contains no param for userId, then get all projects;
    else get projects by userId */
  loadProjects(userId): Project[] {
    if (!userId) {
      this.projectService.getProjectByField("status", "Approved").subscribe(proj => {
        this.projectList = proj;
      });
    } else {
      this.projectService.getProjectByField("userId", this.userId).subscribe(proj => {
        this.projectList = proj;
      });
    }
    return this.projectList;
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

  swapProject(proj): void {
    this.projectService.CurrentProject$.next(proj);
    this.router.navigate(['/project-view']);
  }
}
