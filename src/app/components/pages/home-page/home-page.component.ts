import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

	constructor() { }

	ngOnInit() {
		
	}

	/**
	 * Navigate to the element in the screen that matches the id passed to the method
	 * @param id
	 */
	goToElement(id: string) {
		let elem = document.getElementById(id);
		elem.scrollIntoView({behavior: "smooth"});
	}

}
