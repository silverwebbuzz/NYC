import { Component, OnInit} from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController){
    
  }

  ngOnInit(){

  }

  loadEvents() {
    throw new Error("Method not implemented.");
  }

  close(){
    this.modalCtrl.dismiss();
  }
}