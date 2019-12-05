import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Notification } from 'src/app/models/Notification';
import { ProjectService } from 'src/app/services/project.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  loggedIn = false;
  homepage = false;
  activeNotifications = false;
  count = 0;
  parseCount: any;
  userID: number;
  notifications: Notification[];

  log(state) {
    console.log(state);
  }

  constructor(
    private userService: UserService, private notificationService: NotificationsService,
    private projectService: ProjectService, private router: Router) {
    this.userService.$userObservable.subscribe(
      user => {
        if (user) {
          this.loggedIn = true;
          this.userID = user.id;
        }
        else this.loggedIn = false;
      }
    );

    /**
     * Subscribe to router changes in order to know when to display content in the toolbar
     */
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (e.url == "/" || e.url.includes("home")) this.homepage = true;
        else this.homepage = false;
      }

    });

  }

  ngOnInit() {
    this.noticeCount();
  }

  routeToProfile() {
    this.router.navigate(['/profile']);
  }

  /**
   * Navigate to the element in the screen that matches the id passed to the method
   * @param id
   */
  goToElement(id: string) {
    let elem = document.getElementById(id);
    elem.scrollIntoView({ behavior: "smooth" });
  }

  readAll() {
    this.notifications.forEach(n => {
      if (n.isRead == false)
        this.notificationService.patchReadNotification(n);
    });
    this.noticeCount();
  }

  routeToProject(n: Notification) {
    if (n.isRead == false)
      this.notificationService.patchReadNotification(n);
    this.projectService.getProjectByField("id", n.projectId + "").subscribe(proj => {
      this.projectService.CurrentProject$.next(proj[0]);
      this.router.navigate(['/project-view']);
    });
  }
  noticeCount() {
    this.notificationService.getAllNotifications(this.userID).subscribe(notices => {
      this.notifications = notices;
      this.count = 0;
      this.notifications.forEach(notification => {
        if (notification.isRead == false) {
          this.activeNotifications = true;
          this.count++;
          if (this.count > 9)
            this.parseCount = "9+";
          else
            this.parseCount = this.count;
        }
      });
    });
  }
  markRead(n:Notification){
    this.notificationService.patchReadNotification(n);
  }
}
