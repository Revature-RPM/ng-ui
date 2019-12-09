import { Component, OnInit, OnChanges } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { User } from 'src/app/models/User';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Notification } from 'src/app/models/Notification';
import { ProjectFilterService } from 'src/app/services/project-filter.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from 'src/app/services/project.service';

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
    notificationList: Notification[] = [];
    pageNumber = 0;

    constructor(
        private router: Router,
        private userService: UserService,
        private notificationService: NotificationsService,
        private filterService: ProjectFilterService,
        private route: ActivatedRoute,
        private projectService: ProjectService,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.userService.user.asObservable().subscribe(
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
        this.showMore(this.currentUser);
    }

    routeToProject(n: Notification) {
        if (n.isRead == false)
            this.notificationService.patchReadNotification(n);
        this.projectService.getProjectByField("id", n.projectId + "").subscribe(proj => {
            this.projectService.CurrentProject$.next(proj[0]);
            this.router.navigate(['/project-view']);
        });
    }

    toggleRead(n: Notification) {
        this.notificationService.patchReadNotification(n);
    }

    showMore(userObject: User) {
        this.pageNumber++
        this.notificationService.getNotificationPage(userObject.id, this.pageNumber).subscribe(notices => {
            notices.forEach(n => {
                this.notificationList.push(n)
            });
        });
    }
}


