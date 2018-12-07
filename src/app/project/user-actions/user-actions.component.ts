import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent implements OnInit {
  user: User = {};
  
  /**
	 * the constructor is called when an instance of the class is created
	 * 
	 * @param iconRegistry:  a service to register icons so they can be used with the mat-icon component from Angular Materials
   * @param sanitizer: prevents cross-site scripting attacks by filtering values to be used in the DOM; in this case it is bypassing
   *                         Angular's default security to use this image asset
   * @param router: provides navigation to various views in an Angular application
	 * @author Shawn Bickel (1810-Oct08-Java-USF)
	 */
  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private router: Router) { 
   
  }

  submitProject(){
    this.router.navigate(['/projects/project_submission']);
  }

  ngOnInit() {
    // this.user = JSON.parse(localStorage.getItem('user'));
    this.iconRegistry.addSvgIcon(
      'add_project',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/round-add-24px.svg'));
  }

}
