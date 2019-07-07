import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../node_modules/primeng/components/common/messageservice';

@Component({
  selector: 'app-primeng-carousel',
  templateUrl: './primeng-carousel.component.html',
  providers: [MessageService],
  styleUrls: ['./primeng-carousel.component.scss']
})
export class PrimengCarouselComponent implements OnInit {

  slides;

  constructor(private messageService: MessageService) {
    this.slides = [
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
    ]
   }

  ngOnInit() {
  }

}
