import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-screenshot-thumbnails',
  templateUrl: './project-screenshot-thumbnails.component.html',
  styleUrls: ['./project-screenshot-thumbnails.component.scss']
})
export class ProjectScreenshotThumbnailsComponent implements OnInit {

  screenshots = [
    {
      picture: "../../assets/images/chinchilla2.jpg",
      caption: "Here is a cute, fluffy chinchilla."
    },
    {
      picture: "../../assets/images/screenshot.png",
      caption: "This is a picture of my computer desktop."
    },
    {
      picture: "../../assets/images/pikachu.png",
      caption: "This is a creepy image."
    },
    {
      picture: "../../assets/images/omar.png",
      caption: "This is my friend Omar."
    },
    {
      picture: "../../assets/images/chinchilla2.jpg",
      caption: "Here is a cute, fluffy chinchilla."
    },
    {
      picture: "../../assets/images/screenshot.png",
      caption: "This is a picture of my computer desktop."
    },
    {
      picture: "../../assets/images/pikachu.png",
      caption: "This is a creepy image."
    },
    {
      picture: "../../assets/images/omar.png",
      caption: "This is my friend Omar."
    },
    {
      picture: "../../assets/images/chinchilla2.jpg",
      caption: "Here is a cute, fluffy chinchilla."
    },
    {
      picture: "../../assets/images/screenshot.png",
      caption: "This is a picture of my computer desktop."
    },
    {
      picture: "../../assets/images/pikachu.png",
      caption: "This is a creepy image."
    },
    {
      picture: "../../assets/images/omar.png",
      caption: "This is my friend Omar."
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
