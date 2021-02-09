import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-guidelines',
  templateUrl: './guidelines.page.html',
  styleUrls: ['./guidelines.page.scss'],
})
export class GuidelinesPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goToBack(){
    this.navCtrl.back();
  }

}
