import { Component, OnInit} from '@angular/core';
import { NavController, ModalController,ToastController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CreatepostPage } from 'src/app/createpost/createpost.page';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {
  // testObject : any;
  networkType: string = 'wp-json/my-route/v1/reactions';
  private users: any;
  public items:any=[];
  
  constructor(private navCtrl: NavController,
              private modalCtrl:ModalController,
              private toastController: ToastController,
              public storage: Storage,
              private auth: AuthenticationService,
              public navParams : NavParams
    ) 
    {  
      this.networkType = this.navParams.data.networkType;
      
      this.items=[
        { id:1,title:"Public" ,value:"Public",icon:"globe"},
        { id:2,title:"Site Members",value:"Site Members",icon:"contacts"},
        { id:3,title:"Connection Only",value:"Connection Only" ,icon:"contact"},
        { id:4,title:"Only Me",value:"Only Me",icon:"lock"}
      ];
     }

  ngOnInit() {
    this.users = JSON.parse(localStorage.getItem("Users"));   
  }
  async goToBack(){
   this.modalCtrl.dismiss();
  }

  edit(info: any)
  {
    this.auth.setNetworkType(info);
    this.networkType = info;
    this.modalCtrl.dismiss(CreatepostPage, info );
    console.log(JSON.stringify(info)
    );
  }
}
