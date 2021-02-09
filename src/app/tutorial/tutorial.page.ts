import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
export interface Slide {
  title: string;
  description: string;
  image: string;
}
@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})

export class TutorialPage implements OnInit {
  slidesPage: Slide[];
  showSkip = true;
  dir: string = 'ltr';
  slideOpts = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    pager: false,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows : true,
    },
    autoplay: {
      delay: 5000,
    },
    // pagination: {
    //   el: '.swiper-pagination',
    // },
  };
  constructor(public menu: MenuController,
    private statusBar: StatusBar,
    private router: Router) { 
    this.slidesPage = [
      {
        title: "Welcome to the Ionic Super Starter",
        description: "The <b>Ionic Super Starter</b> is a fully-featured Ionic starter with many pre-built pages and best practices.",
        image: 'assets/img/slider-img.jpg',
      },
      {
        title: "Welcome to the Ionic Super Starter",
        description: "The <b>Ionic Super Starter</b> is a fully-featured Ionic starter with many pre-built pages and best practices.",
        image: 'assets/img/slider-img.jpg',
      },
      {
        title: "Welcome to the Ionic Super Starter",
        description: "The <b>Ionic Super Starter</b> is a fully-featured Ionic starter with many pre-built pages and best practices.",
        image: 'assets/img/slider-img.jpg',
      }
    ];
  }

  ngOnInit() {
    this.menu.enable(false);
    //this.statusBar.backgroundColorByHexString('#');
    this.statusBar.overlaysWebView(true);
  }

  gotologinPage(){
    this.router.navigateByUrl('/login')
  } 

  gotoregistrationPage(){
    this.router.navigateByUrl('/signup');
  }

}
