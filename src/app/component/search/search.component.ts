import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private modalCtrl: ModalController,
    private router: Router) { }

  ngOnInit() {
  }

  async closeModal(){
    this.modalCtrl.dismiss();
  }

  userProfile(){
    //this.router.navigate(['/userprofile']);
  }

}
