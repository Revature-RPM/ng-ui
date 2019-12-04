import { Component, OnInit, OnChanges } from '@angular/core';
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
export class NotificationsComponent implements OnInit, OnChanges {
  title: string = "My Notifications";
  currentUser: User;
  userId: string;
  notificationList: Notification[];
  pageNumber = 1;
  pageMax = 7;

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
    this.getNotifications(this.currentUser, this.pageNumber);
  }

  ngOnChanges(){
    this.getNotifications(this.currentUser, this.pageNumber);
    console.log("change detected")
  }

  getNotifications(userObject: User, n: number):Notification[] {
    this.notificationService.getNotificationPage(userObject.id, n).subscribe(notices => {
        this.notificationList = notices;
      //this.pageMax = XXXXXXXXXXXXXXXXXXXXXX
    });
    return this.notificationList;
  };
  firstPage(){
    this.pageNumber = 1;
    this.changedPage();
  }
  previousPage(){
    if (this.pageNumber>1)
      this.pageNumber--;
      this.changedPage();  
  }
  nextPage(){
    if (this.pageNumber<this.pageMax)
      this.pageNumber++;
    this.changedPage();
  }
  lastPage(){
    this.pageNumber = this.pageMax;
    this.changedPage();
  }
  changedPage(){
    Math.floor(this.pageNumber);
    if (this.pageNumber<1){
      this.pageNumber = 1;}
    if (this.pageNumber>this.pageMax){
      this.pageNumber = this.pageMax;}
    this.getNotifications(this.currentUser, this.pageNumber);
  }
  routeToProject(n:Notification){
    if (n.isRead == false){
      this.notificationService.patchReadNotification(n);
    }
  }
}


