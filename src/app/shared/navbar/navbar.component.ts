import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: User = {};
  /**
	 * the constructor is called when an instance of the class is created
	 *
	 * @param iconRegistry:  a service to register icons so they can be used with the mat-icon component from Angular Materials
   * @param sanitizer:     prevents cross-site scripting attacks by filtering values to be used in the DOM; in this case it is bypassing
   *                         Angular's default security to use image assets as icons
   * @param router:        enables navigation to various views in the application
	 * @author Shawn Bickel (1810-Oct08-Java-USF)
	 */
  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private router: Router) {
  }

  goToRegister() {
    this.router.navigate(['auth','register']);
  }

  goToLogin() {
    this.router.navigate(['auth','login']);
  }

  userAccount() {
    this.router.navigate(['account',this.user.id]);
  }

  logout() {
    this.router.navigate(['auth','logout']);
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.iconRegistry.addSvgIcon(
      'account',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/round-account_circle-24px.svg'));

      this.iconRegistry.addSvgIcon(
        'logo',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/round-cloud_upload-24px.svg'));
  }

  homepageShortcut() {
    this.router.navigate(['projects','home']);
  }
}
