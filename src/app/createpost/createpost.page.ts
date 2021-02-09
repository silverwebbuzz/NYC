import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalController, ActionSheetController, Platform, NavParams, IonContent } from '@ionic/angular';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { PrivacyComponent } from '../component/privacy/privacy.component';
import { AuthenticationService } from '../services/authentication.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from '../services/rest-api.service';
import { empty } from 'rxjs';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.page.html',
  styleUrls: ['./createpost.page.scss'],
})
export class CreatepostPage implements OnInit {
  @ViewChild(IonContent) contentScroll: IonContent;
  // myStorage:any;
  
  image: any = '';
  imageURI: any = '';
  setPhotoArea: any = '';
  networkType: string = 'Public';
  videoArea : boolean = false;
  photoArea : boolean = false;
  
  user_id:any;
  Message:any;
  VideoTitle:any;
  user_url: any;
  username: any;
  VideoURL : any;
  // post_id:any;
  constructor(private modalController: ModalController,
              private actionSheetController: ActionSheetController,
              private plt: Platform,
              private filePath: FilePath,
              private router:Router,
              private auth: AuthenticationService,
              private file: File,
              private camera: Camera,
              private restProvider: RestApiService) {
                // this.post_id = this.navParams.get('postId');
                this.auth.userDetails
                  .subscribe(res => {
                    if (res) {
                      console.log("res:",res);
                      this.user_id = res.id;
                      this.user_url = res.avatar;
                      this.username = res.username;
                    }
                  });

               }

             
  ngOnInit() {
      this.auth.NetworktypeState.subscribe(v => {
        console.log('v:',v);
        this.networkType = v;
      });
  }



  closeModal(){
    this.modalController.dismiss();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Photo',
        icon: 'albums',
        handler: () => {
          //console.log('Photo Clicked');
          this.videoArea = false;
          
          const options: CameraOptions ={
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: true
          }
          this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            console.log(imageData);
            this.photoArea = true;
            this.setPhotoArea = 'data:image/jpeg;base64,' + imageData;
           }, (err) => {
            // Handle error
           });
        }
      }, {
        text: 'Video',
        icon: 'videocam',
        handler: () => {
          //console.log('Clicked Video Url');
          this.videoArea = true;
          this.photoArea = false;
        }
      }, {
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          //console.log('Clicked on Camera');
          this.videoArea = false;
          const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            cameraDirection:0
          }
          
          this.camera.getPicture(options).then((imageData) => {
           
          
          this.photoArea = true;
          this.setPhotoArea = 'data:image/jpeg;base64,' + imageData;
         
          }, (err) => {
           // Handle error
           
          });
        }
      }]
    });
    await actionSheet.present();
  }

  submitWritePost(){
    if(!this.photoArea && !this.videoArea){
        if(!this.Message){
          this.restProvider.presentToastWithOptions('Write Something....','', 'top');
          return;
        }
        let body = {
          post_author :this.user_id,
          act_owner_id :this.user_id,
          post_content :this.Message,
          post_type : "peepso-post"
        }
        this.restProvider.presentLoading();
        this.restProvider.post('wp-json/my-route/v1/postadd', body)
          .subscribe(v => {
            this.modalController.dismiss();
            this.restProvider.dismissLoading();
          },err=> {
            this.restProvider.dismissLoading();
            this.restProvider.presentToastWithOptions('Something Wrong! try Again.','','top');
            
          });
    }else if(this.videoArea){
      if(!this.VideoURL){
        this.restProvider.presentToastWithOptions('Please Insert a Video URL..','', 'top');
        return;
      }
      let videotitle;
      if(!this.VideoTitle){
        videotitle = '';
      }else{
        videotitle = this.VideoTitle;
      }
      let msgbox;
      if(!this.Message){
        msgbox = '';
      }else{
        msgbox = this.Message;
      }
      let body={
        vid_url : this.VideoURL,
        vid_title : videotitle,
        post_author :this.user_id,
        act_owner_id :this.user_id,
        post_content :msgbox,
        post_type : "peepso-post"
      }
      this.restProvider.presentLoading();
      this.restProvider.post('wp-json/my-route/v1/postaddvideo', body)
          .subscribe(v => {
            this.modalController.dismiss();
            this.restProvider.dismissLoading();
          },err=> {
            this.restProvider.dismissLoading();
            this.restProvider.presentToastWithOptions('Something Wrong! try Again.','','top');
            
          });
    }else if(this.photoArea){
      
      let msgbox;
      if(!this.Message){
        msgbox = '';
      }else{
        msgbox = this.Message;
      }
      this.restProvider.presentLoading();
      let body = {
        photo: this.setPhotoArea,
        id: this.user_id,
        post_type: "peepso-post",
        post_excerpt: msgbox
      }
      this.restProvider.post('wp-json/my-route/v1/uploadimg/'+this.user_id,body)
        .subscribe(v => {
          this.modalController.dismiss();
          this.restProvider.dismissLoading();
        },err=> {
          this.restProvider.dismissLoading();
          this.restProvider.presentToastWithOptions('Something Wrong! try Again.','','top');
          
        });

    }else{
      this.restProvider.presentToastWithOptions('Something Wrong! try Again.','','top');
    }
    
   
    
  }

  async privacy()
  {
    const modal = await this.modalController.create({
      component: PrivacyComponent,
      componentProps: {
        networkType: this.networkType
      }
    });
    return await modal.present();
  }
  
}
