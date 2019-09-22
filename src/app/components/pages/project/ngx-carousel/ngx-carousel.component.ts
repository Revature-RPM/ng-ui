import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../../services/project.service';
import {Project} from '../../../../models/Project';

@Component({
  selector: 'app-ngx-carousel',
  templateUrl: './ngx-carousel.component.html',
  styleUrls: ['./ngx-carousel.component.scss']
})

/**
 * This Component houses the pictures of a project after a project is selected from the project list.
 * The list of pictures are rotated through using a set timer.
 */
export class NgxCarouselComponent implements OnInit {

  project: Project;

  index = 0;
  speed = 2000;
  infinite = true;
  direction = 'right';
  directionToggle = true;
  autoplay = true;
  avatars = '12345'.split('').map((x, i) => {
    const num = i;
    // const num = Math.floor(Math.random() * 1000);
    return {
      url: `https://picsum.photos/600/400/?${num}`,
      title: `${num}`
    };
  });

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    this.projectService.CurrentProject$.subscribe(
      proj => {
        //the proj.screenShots.length check is temporary because project screenshots are currently not persisted
        //in the server side application
        if(proj && proj.screenShots.length>1) {
          this.project = proj;
          this.avatars = this.project.screenShots;
        }
      });
  }

  push(image) {
    this.avatars.push(image);
  }

  remove() {
    this.avatars.splice(this.avatars.length - 1, 1);
  }


  indexChanged(index) {
    console.log(index);
  }

  toggleDirection($event) {
    this.direction = this.directionToggle ? 'right' : 'left';
  }

}
