import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { User } from '../../../../models/User';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';

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
  displayedColumns: string[] = ['ID#', 'Name', 'Role', 'Username', 'Email'];
  displayedColumnsData: string[] = ['id', 'firstName', 'lastName', 'email', 'username', 'role'];
  dataSource = new MatTableDataSource(users);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    if (!localStorage.getItem('jwt')) {
      this.router.navigate(['/auth/login']);
    }
    this.userService.getAllUsers().subscribe(
      response => {
        users = response;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  /**
   * This function keeps track of all the changes made on the table. 
   * @author Zak Noori (1905-Java-USF)
   * @author Glory Umeasalugo (1905-Java-USF)
   * @author Aisha Hodge (1905-Java-USF)
   * @author Toyin Fadiran (1905-Java-USF)
   */
  userChanged(user) {
    if (!updatedRoles.includes(user)) {
      updatedRoles.push(user);
    }
  }

  /**
   * This function saves all changes made on the table and updates a role. 
   * @author Zak Noori (1905-Java-USF)
   * @author Glory Umeasalugo (1905-Java-USF)
   * @author Aisha Hodge (1905-Java-USF)
   * @author Toyin Fadiran (1905-Java-USF)
   */
  updateToAdmin() {
    updatedRoles.forEach(user => {
      this.userService.updateUserToAdmin(user).subscribe(
        response => {
          console.log(response);
        }
      );
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
