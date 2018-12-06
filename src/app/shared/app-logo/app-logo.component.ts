import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-logo',
  templateUrl: './app-logo.component.html',
  styleUrls: ['./app-logo.component.scss']
})
export class AppLogoComponent implements OnInit {

   /**
	 * the constructor is called when an instance of the class is created
	 *
	 * @param iconRegistry:  a service to register icons so they can be used with the mat-icon component from Angular Materials
   * @param sanitizer:     prevents cross-site scripting attacks by filtering values to be used in the DOM; in this case it is bypassing
   *                         Angular's default security to use this image asset
   * @param router:        enables navigation to various views in the application
	 * @author Shawn Bickel (1810-Oct08-Java-USF)
	 */
  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private router: Router) { 
    this.iconRegistry.addSvgIcon(
      'AppLogo',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/round-cloud_upload-24px.svg'));
  }

  ngOnInit() {
  }

}
