import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/Project';

@Component({
  selector: 'app-pending-projects-table',
  templateUrl: './pending-projects-table.component.html',
  styleUrls: ['./pending-projects-table.component.scss']
})
/**
 * This component's purpose is to display projects submitted to RPM for administrator's approval
 */
export class PendingProjectsTableComponent implements OnInit {

 /**
   *This object is used to communicate with the parent component that the click event 
   * has happened in this child component
   */
  @Output() readonly swapProject = new EventEmitter<{row: any}>();

  /**
   * These fields are used to store and display the pending projects from the
   *  database that are awaiting admin approval
   */
  dataSource: Project[];
  selected: boolean;
  displayedColumns: string[] = ['Project', 'Trainer', 'Tech Stack', 'Batch', 'Status of Request'];
  displayedColumnsData: string[] = ['name', 'trainer', 'techStack', 'batch', 'status'];

  constructor(private router: Router, private projectService: ProjectService) { }

  ngOnInit() {
    this.selected = false;
    this.projectService.getProjectByField('status','Pending').subscribe(response => {
      this.dataSource = response;
    });
  }

  goToProject(project: Project) {
    console.log(project);
    this.projectService.CurrentProject$.next(project);
    this.router.navigate(['/project-view']);
  }

}
