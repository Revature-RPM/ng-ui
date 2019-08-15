import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from 'src/app/models/User';
import {Project} from 'src/app/models/Project';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ProjectService} from 'src/app/services/project.service';
import {UserService} from 'src/app/services/user.service';
import {Router, Params, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
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
  trainerCanEdit = false;
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

    this.userId = this.route.snapshot.params['userId'];

    this.projectList = this.loadProjects(this.userId);

    this.dataSource = new MatTableDataSource(this.projectList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }



  loadProjects(userId): Project[] {
    // Basically, if the route contains no param for userId, then get all projects;
    // else get projects by userId
    if (!userId) {
      this.projectService.getAllProjects().subscribe(proj => {
        this.projectList = proj;
      });
    } else {
      this.projectService.getProjectsByUserId(this.userId).subscribe(proj => {
        this.projectList = proj;
      });
    }
    return this.projectList;
  }

  /**
   * This method determines if a trainer can edit a project; a trainer can only edit a project if the project was submitted by the trainer.
   * @param project: the project who's trainer is being validated
   * @author Shawn Bickel (1810-Oct08-Java-USF)
   */
  
  //Dead Code?; should probably be deleted
  canEdit(project: any) {
    if (this.currentUser.role === 'ROLE_ADMIN') {
      this.trainerCanEdit = true;
    } else if (this.trainerFullName === project.trainer) {
      this.trainerCanEdit = true;
    } else {
      this.trainerCanEdit = false;
    }
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
    this.imagePage = (this.imagePage + 1) % totalAmountOfScreenShots;
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

  //Dead Code?; should probably be deleted
  codebase(project) {
    this.projectService.CurrentProject$ = project;
    this.router.navigate(['/codebase']);
  }

  //Dead Code?; should probably be deleted
  edit(project) {
    this.router.navigate([project.id + '/edit']);
  }


  swapProject(proj): void {
    this.projectService.CurrentProject$.next(proj);
  }
}
