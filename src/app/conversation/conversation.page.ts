import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {

  postBtnHide : boolean = false;
  newmessage: any;

  constructor(private router: Router,
    private camera: Camera,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  clickbtnHide(){
    this.postBtnHide = true;
  }
  cancelWritePost(){
    this.postBtnHide = false;
    this.newmessage = "";
  }

  openGallery(){
    const options: CameraOptions ={
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
     });
  }

  back(){
    this.navCtrl.pop();
  }

}
