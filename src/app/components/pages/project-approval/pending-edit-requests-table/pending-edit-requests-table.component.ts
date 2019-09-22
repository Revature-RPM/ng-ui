import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/Project';

@Component({
  selector: 'app-pending-edit-requests-table',
  templateUrl: './pending-edit-requests-table.component.html',
  styleUrls: ['./pending-edit-requests-table.component.scss']
})
/*
    This component's purpose is to provide a view for showing 
    pending edit request to user with an administrator role.
*/
export class PendingEditRequestsTableComponent implements OnInit {

  /**
   *This object is used to communicate with the parent component (pending-projects-approval-page)
   *that the click event has happened in this child component
   */
  @Output() swapProject = new EventEmitter<{row: any}>();

  /**
   * These fields are used to display the collected data about the projects that
   * have been resubmitted for edits into a table
   */
  dataSource: Project[];
  selected: boolean;
  displayedColumns: string[] = ['Trainer', 'Project', 'Status of Request'];
  displayedColumnsData: string[] = ['trainer', 'name', 'status'];

  constructor(private router: Router, private projectService: ProjectService) { }

  ngOnInit() {
    this.selected = false;
    this.projectService.getProjectsByStatus('PendingEdit').subscribe(response => {
      this.dataSource = response;
    });
  }

  /**
   * The method is called from a click event in the pending edit requests html.
   * This method emits the row selected to the project-pending-approval-page component.
   * @param row
   * @author Donald Henderson
   * @author Mikaela Enters
   */
  onSwapProject(row): void {
    this.swapProject.emit(row);
  }

}
