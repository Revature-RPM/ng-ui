import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAdministrator: Boolean;
  /**
	 * the constructor is called when an instance of the class is created
	 * 
	 * @param iconRegistry:  a service to register icons so they can be used with the mat-icon component from Angular Materials
   * @param sanitizer: prevents cross-site scripting attacks by filtering values to be used in the DOM
	 * @author Shawn Bickel (1810-Oct08-Java-USF)
	 */
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon(
      'account',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/round-account_circle-24px.svg'));
  }

  ngOnInit() {
  }

}
