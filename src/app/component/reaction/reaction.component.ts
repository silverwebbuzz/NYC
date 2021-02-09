import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.scss']
})

export class ReactionComponent implements OnInit {

  allrecation:any;
  
  constructor(private restProvider:RestApiService ,private popCtrl:PopoverController,private navParams:NavParams) {
    
    this.allrecation = this.navParams.get('allrecation');
    console.log('Reaction:', this.allrecation);
  }

  ngOnInit() {
    
  }
  like(index:any)
  {
    let typeLike = index;
    this.popCtrl.dismiss(typeLike);
   } 
}
