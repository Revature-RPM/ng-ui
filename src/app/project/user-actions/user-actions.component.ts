import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent implements OnInit {

  isAdministrator: Boolean = true;
  /**
	 * the constructor is called when an instance of the class is created
	 * 
	 * @param iconRegistry:  a service to register icons so they can be used with the mat-icon component from Angular Materials
   * @param sanitizer: prevents cross-site scripting attacks by filtering values to be used in the DOM; in this case it is bypassing
   *                         Angular's default security to use this image asset
	 * @author Shawn Bickel (1810-Oct08-Java-USF)
	 */
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon(
      'add_project',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/round-add-24px.svg'));
  }

  ngOnInit() {
  }

}
