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
  displayedColumns: string[] = ['Trainer', 'Project', 'Status of Request'];
  displayedColumnsData: string[] = ['trainer', 'name', 'status'];

  constructor(private router: Router, private projectService: ProjectService) { }

  ngOnInit() {
    this.selected = false;
    this.projectService.getProjectByField('status','Pending').subscribe(response => {
      this.dataSource = response;
    });
  }

  /**
   * The method is called from a click event in the pending-projects-table html.
   * This method emits the row selected to the project-pending-approval-page component.
   * @param row
   * @author Donald Henderson
   * @author Mikaela Enters
   */
  onSwapProject(row): void {
    this.swapProject.emit(row);
  }

}
