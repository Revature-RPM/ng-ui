import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { User } from 'src/app/models/User';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Notification } from 'src/app/models/Notification';
import { ProjectFilterService } from 'src/app/services/project-filter.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class NotificationsComponent implements OnInit {
  title: string = "My Notifications";
  currentUser: User;
  userId: string;
  notificationList: Notification[];

  constructor(private router: Router, private userService: UserService, private notificationService: NotificationsService,
    private filterService: ProjectFilterService, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.userService.$userObservable.subscribe(
      user => {
        if (user) {
          this.currentUser = user;
        }
      }
    );

    // If the current page is 'notifications' get the userId
    if (this.router.url.includes('notification')) {
      this.userId = this.currentUser.id + "";
    }
    this.getNotifications(this.currentUser, 2);
  }

  getNotifications(userObject: User, n: number):Notification[] {
    this.notificationService.getNotificationPage(userObject.id, n).subscribe(notices => {
        this.notificationList = notices;
      console.log(notices);
    });
    return this.notificationList;
  };
}


