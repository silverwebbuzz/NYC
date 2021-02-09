import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-editaccount',
  templateUrl: './editaccount.page.html',
  styleUrls: ['./editaccount.page.scss'],
})
export class EditaccountPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goToBack(){
    this.navCtrl.back();
  }

}
