import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponentOptions } from 'ion2-calendar';
import { EventsPage } from '../events/events.page';
import { AlertController, ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.page.html',
  styleUrls: ['./calender.page.scss'],
})
export class CalenderPage implements OnInit {

  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };
 
  minDate = new Date().toISOString();
 
  eventSource = [];
  viewTitle;
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  optionsMulti: CalendarComponentOptions = {
    color: 'secondary',
    daysConfig: [{
      date: new Date(),
      //subTitle: 'H.Nay',
      // disable: true,
      cssClass: 'dayOff'
    },
    {
      date: new Date('2018-09-28'),
      // disable:true,
      //subTitle: 'Nghỉ',
      marked:true,
      cssClass: 'dayOff'
    }],
  };
  // date: any;
  // daysInThisMonth: any;
  // daysInLastMonth: any;
  // daysInNextMonth: any;
  // monthNames: string[];
  // currentMonth: any;
  // currentYear: any;
  // currentDate: any;
 
  @ViewChild(EventsPage) myCal: EventsPage;

  constructor(private alertCtrl: AlertController,
    private router:Router, 
    private modalCtrl: ModalController,
    @Inject(LOCALE_ID) private locale: string) { }
 
  ngOnInit() {
    this.resetEvent();
  }

  // getDaysOfMonth() {
  //   this.daysInThisMonth = new Array();
  //   this.daysInLastMonth = new Array();
  //   this.daysInNextMonth = new Array();
  //   this.currentMonth = this.monthNames[this.date.getMonth()];
  //   this.currentYear = this.date.getFullYear();
  //   if(this.date.getMonth() === new Date().getMonth()) {
  //     this.currentDate = new Date().getDate();
  //   } else {
  //     this.currentDate = 999;
  //   }
  
  //   var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
  //   var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
  //   for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
  //     this.daysInLastMonth.push(i);
  //   }
  
  //   var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
  //   for (var i = 0; i < thisNumOfDays; i++) {
  //     this.daysInThisMonth.push(i+1);
  //   }
  
  //   var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
  //   var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
  //   for (var i = 0; i < (6-lastDayThisMonth); i++) {
  //     this.daysInNextMonth.push(i+1);
  //   }
  //   var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
  //   if(totalDays<36) {
  //     for(var i = (7-lastDayThisMonth); i < ((7-lastDayThisMonth)+7); i++) {
  //       this.daysInNextMonth.push(i);
  //     }
  //   }
  // }
  // goToLastMonth() {
  //   this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
  //   this.getDaysOfMonth();
  // }
  // goToNextMonth() {
  //   this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
  //   this.getDaysOfMonth();
  // }
  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }
 
  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime:  new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }
 
    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
 
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }
 
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }

  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }
   
  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }
   
  // Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }
   
  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }
   
  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
   
  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
   
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }
   
  // Time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }

  async pageEvents(){
      const modal = await this.modalCtrl.create({
        component: EventsPage
      });
      return await modal.present();
    }

}