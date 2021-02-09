import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalController ,PopoverController, NavController, MenuController, NavParams, IonInput} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ReactionComponent } from '../reaction/reaction.component';
import { RestApiService } from 'src/app/services/rest-api.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.scss']
})
export class RepliesComponent implements OnInit {
  @ViewChild('replayCommentbox') replayCommentbox:IonInput ;


  postBtnHide : boolean = false;
  newmessage: any;
  commentId: number;
  preComment: any;
  user_display_name:any;
  image_url:any;
  content:any;
  activity:any;
  user_name:any;
  img_url:any;
  user_url:any;
  act;
  cont;
  user_id:any;
  posts:any;
  constructor(private modalCtrl: ModalController,
    private router: Router,
    private camera: Camera,    
    private popoverCtrl: PopoverController,
    private navCtrl: NavController,
    private restProvider:RestApiService,
    private auth:AuthenticationService,
    private route: ActivatedRoute,
    private navParams: NavParams,
    private menu: MenuController,
       private statusBar: StatusBar) {
      this.commentId = this.navParams.get('commentId');
      this.preComment = this.navParams.get('preComment');

      console.log('PreComent:',this.preComment);
      this.user_id = this.route.snapshot.paramMap.get('userid');
      this.menu.enable(true);
      this.statusBar.overlaysWebView(false);
      this.restProvider.presentLoading();
      this.auth.userDetails
        .subscribe(res => {
          if (res) {
            this.user_url = res.avatar;
            this.user_id = res.id;

          }
          console.log(this.user_id);
        });
      this.reply();
      }
  ngOnInit() {

  }
  goToProfile() {
    this.router.navigate(['/profile']);
  }
  reply() {
    this.restProvider.get('wp-json/my-route/postcomment/postid:' + this.commentId).subscribe(data => {
      if(data){
          this.posts = data;
          console.log(this.posts);
        }
      this.restProvider.dismissLoading();
        
      },err => {
        console.log('Error:', err);
        this.restProvider.presentToastWithOptions('Something Wrong! Please try Again.');
        this.restProvider.dismissLoading();
      });
      
 }
  async closeModal(){
    this.modalCtrl.dismiss();
   }

   clickbtnHide(){
    this.replayCommentbox.setFocus();
    this.postBtnHide = true;
  }
  cancelWritePost(){
    this.postBtnHide = false;
    this.newmessage = "";
  }

  submitWritePost(){
    if(!this.newmessage){
      this.restProvider.presentToastWithOptions("Write Some text...",'','top');
      return;
    }
    this.restProvider.presentLoading();
    var body = {
      post_author : this.user_id,
      post_content : this.newmessage,
      post_type : "peepso-comment",
      act_owner_id : this.preComment.author.ID,
      act_comment_object_id : this.commentId
    }
    this.restProvider.post('wp-json/my-route/v1/postcomment', body)
      .subscribe(v => {
        this.reply();
      },err=> {
        console.log('Error:',err);
        this.restProvider.presentToastWithOptions('Something Wrong! try Again.','','top');
        this.reply();
      });
    
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
  async showReactions(ev){
    console.log("you have cliked like button");
      const reactions = await this.popoverCtrl.create({
      component:ReactionComponent,
      event:ev,
      cssClass: 'contact-popover'
    });
  return await reactions.present( );
  }
}
