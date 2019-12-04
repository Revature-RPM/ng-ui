import {Component, OnInit, OnChanges} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Notification } from 'src/app/models/Notification';

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
  userID: number;
  notifications:Notification[];

  log(state) {
    console.log(state);
  }

  constructor(
    private userService: UserService, private notificationService: NotificationsService,
    private router: Router)
  {
    this.userService.$userObservable.subscribe(
      user => {
        if(user) this.loggedIn = true;
        else this.loggedIn = false;
        this.userID = user.id;
      }
    );
    
    /**
     * Subscribe to router changes in order to know when to display content in the toolbar
     */
    this.router.events.subscribe(e => {
      if(e instanceof NavigationEnd) {
        if( e.url == "/" || e.url.includes("home")) this.homepage = true;
        else this.homepage = false;
      }

    });

  }

  ngOnInit() {
    console.log();
    this.notificationService.getAllNotifications(this.userID).subscribe(notices =>{
      console.log(notices);
      this.notifications = notices;
      console.log(this.notifications);
      this.count = 0;
      this.notifications.forEach(notification => {
        console.log(notification.isRead);
        if (notification.isRead == false){
          this.activeNotifications = true;
          this.count++;
          console.log(this.count);
        }
      });
    });
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
    elem.scrollIntoView({behavior: "smooth"});
  }
  AllNotifications(){
    this.router.navigate(['notifications']);
  }
  
}
