import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController,PopoverController, MenuController, NavParams, IonContent } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { RepliesComponent } from '../replies/replies.component';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ReactionComponent } from '../reaction/reaction.component';
import { RestApiService } from 'src/app/services/rest-api.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @ViewChild(IonContent) contentScroll: IonContent;

  postBtnHide : boolean = false;
  newmessage: any;

  post_id : number;
  postAuthor : number;

  user_display_name:any;
  image_url:any;
  content:any;
  activity:any;
  user_url: any;
  user_name:any;
  img_url:any;
  act;
  cont;
  like: boolean = false;
  user_id:any;
  posts:any=[];

  iscomment: boolean = true;

  constructor(private modalCtrl: ModalController,
    private router: Router,
    private camera: Camera,
    private popoverCtrl: PopoverController,
    private restProvider:RestApiService,
    private auth:AuthenticationService,
    private navParams: NavParams, 
    private menu: MenuController,
       private statusBar: StatusBar

    ) {
      
      // this.user_id = this.route.snapshot.paramMap.get('userid');
      this.menu.enable(true);
      this.statusBar.overlaysWebView(false);

      this.post_id = this.navParams.get('postId');
      console.log('post_id',this.post_id);
      this.postAuthor = this.navParams.get('postAuthor');
      console.log('postAuthor',this.postAuthor);
      
      this.iscomment = false;

      this.restProvider.presentLoading();
      this.auth.userDetails
        .subscribe(res => {
          if (res) {
            this.user_url = res.avatar;
            this.user_id = res.id;

          }
          console.log(this.user_id);
        });

      this.comment();

      }

  ngOnInit() {
  }
  
  goToProfile() {
    this.router.navigate(['/profile']);
  }
  
  comment() {

      this.restProvider.get('wp-json/my-route/postcomment/'+this.user_id+'/postid:' + this.post_id).subscribe(data => {
        this.contentScroll.scrollToTop();
       if(data){
          this.posts= data;
        }
        console.log(this.posts);
      
        this.restProvider.dismissLoading();
        },err => {
          console.log('Error:',err);
          this.restProvider.presentToastWithOptions('Something Wrong! Please try again.');
          this.restProvider.dismissLoading();
        });     
  }

  likeComment(index:any, commentId: any){
    if (index > -1) {
      this.posts[index].like = true;
    }
    var body ={
      like_user_id : this.user_id,
      like_external_id: commentId,
      like_module_id: "1"

    }
    this.restProvider.post('wp-json/my-route/v1/makepostcommentlike', body)
    .subscribe(v =>{
      console.log('V:',v);
    },err=>{
      console.log('Comment Like Eroor:', err);
    })
    
  }

  dislikeComment(index:any, commentId: any){
    if (index > -1) {
      this.posts[index].like = false;
    }
    
  }

  async closeModal(){
    this.modalCtrl.dismiss();
   }

   async openModal(comment_id: number, comment: any){

    const modal = await this.modalCtrl.create({
      component: RepliesComponent,
      componentProps: {
        commentId : comment_id,
        preComment : comment
      }
    });
    return await modal.present();
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
      act_owner_id : this.postAuthor,
      act_comment_object_id : this.post_id
    }
    this.restProvider.post('wp-json/my-route/v1/postcomment', body)
      .subscribe(v => {
        this.comment();
      },err=> {
        console.log('Error:',err);
        this.restProvider.presentToastWithOptions('Something Wrong! try Again.','','top');
        this.comment();
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
