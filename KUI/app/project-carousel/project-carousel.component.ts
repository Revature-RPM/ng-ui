import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-project-carousel',
  templateUrl: './project-carousel.component.html',
  styleUrls: ['./project-carousel.component.scss']
})
export class ProjectCarouselComponent implements OnInit {

  // pictures to display in the carousel
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
    }
  ];

//   // this is for the carousel functionality
//   slideIndex = 0;
//   // showSlides(slideIndex) {}

//   plusSlides(n) {
//     this.showSlides(this.slideIndex += n);
//   }

//   currentSlide(n) {
//     this.showSlides(this.slideIndex = n);
//   }

//   showSlides(n) {
//     let i = 1;
//     const SLIDES = document.getElementsByClassName("mySlides");
//     const DOTS = document.getElementsByClassName("dot");
    
//     if (n > SLIDES.length) {this.slideIndex = 1}
//     if (n < 1) {this.slideIndex = SLIDES.length}
//     for (i = 0; i < SLIDES.length; i++) {
//       SLIDES[i].style.display = "none";
//     }
//     for (i = 0; i < DOTS.length; i++) {
//       DOTS[i].className = DOTS[i].className.replace(" active", "");
//     }
//     SLIDES[this.slideIndex-1].style.display = "block";
//     DOTS[this.slideIndex-1].className += " active";
//   }

  constructor() { }

  ngOnInit() {
  }

}
