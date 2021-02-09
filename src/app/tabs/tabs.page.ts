import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreatepostPage } from '../createpost/createpost.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  constructor(private modalController: ModalController) {
  }
  ngOnInit() {
    
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: CreatepostPage
    });
    return await modal.present();
  }
}
