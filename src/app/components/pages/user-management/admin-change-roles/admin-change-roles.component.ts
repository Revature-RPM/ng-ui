import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { User } from '../../../../models/User';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

let users: User[] = [
];

let updatedRoles: User[] = [
];

@Component({
  selector: 'app-admin-change-roles',
  templateUrl: './admin-change-roles.component.html',
  styleUrls: ['./admin-change-roles.component.scss']
})
export class AdminChangeRolesComponent implements OnInit {
  roles: String[] = [
    'admin',
    'user'
  ];
  allUsersArray: User[];
  displayedColumns: string[] = ['ID#', 'Name', 'Role', 'Username', 'Email'];
  displayedColumnsData: string[] = ['id', 'firstName', 'lastName', 'email', 'username', 'role'];
  dataSource = new MatTableDataSource(users);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private userService: UserService, private snackbar: SnackbarService) { }

  ngOnInit() {
    if (!localStorage.getItem('jwt')) this.router.navigate(['/auth/login']);
    this.userService.getAllUsers().subscribe(
      response => {
        users = response;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  userChanged(user) {
    if (!updatedRoles.includes(user)) {
      updatedRoles.push(user);
    }
  }

  logData(row) {
   }

  updateChanges() {
    console.log('beginning of postchanges');
    updatedRoles.forEach(user => {
      this.userService.updateUserToAdmin(user).subscribe(
        response => {
          console.log(response);
        }
      );
      console.log('end of changes');
    });
  }

  test() {
    console.log(updatedRoles);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
