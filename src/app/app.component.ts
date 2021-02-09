import { Component, ViewChildren, QueryList } from '@angular/core';

import { Platform, AlertController, MenuController, IonApp, ToastController, ActionSheetController, PopoverController, ModalController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { RestApiService } from './services/rest-api.service';

import { fromEvent, Observable, Subscription } from 'rxjs';
import { Network } from '@ionic-native/network/ngx';
import { faWindows } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/tabs/home',
      icon: 'home'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'contact'
    },
    {
      title: 'Calender',
      url: '/calender',
      icon: 'calendar'
    },
    {
      title: 'Groups',
      url: '/',
      icon: 'people'
    },
    {
      title: 'Contact NYCWN',
      url: '/contact',
      icon: 'contacts'
    },
    {
      title: 'Terms & Policies',
      url: '/terms',
      icon: 'paper'
    },
    {
      title: 'Account Settings',
      url: '/setting',
      icon: 'settings'
    },
    {
      title: 'Invite',
      url: '/invite',
      icon: 'person-add'
    },
  ];
  public counter = 0;
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;

  subscriptions: Subscription[] = [];

  connectionStatusMessage: string;
  connectionStatus: string;

  public user_url: 'https://go-demo.co/nycwn-new/wp-content/plugins/peepso-core/assets/images/avatar/user-neutral-thumb.png';
  public user_name: any;
  public user_email : any;

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthenticationService,
    private router: Router,
    private menu: MenuController,
    public alertController: AlertController,
    private api: RestApiService,
    private network: Network,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
    private toast: ToastController
  ) {
    this.initializeApp();
    this.backButtonEvent();
  }
  ngOnInit() {
    
    this.network.onDisconnect().subscribe(() => {
      this.presentAlertOffline();
    });

    this.network.onConnect().subscribe(() => {
      this.presentAlertOnline();
    });

  }

  async presentAlertOnline() {
    const alert = await this.alertController.create({
      header: 'Great!',
      message: ' Back to online',
      backdropDismiss: false,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertOffline() {
    const alert = await this.alertController.create({
      header: 'Connection lost!',
      message: '  You are not connected to internet',
      backdropDismiss: false,
      buttons: [{
        text: 'Retry',
        handler: () => {
          this.splashScreen.show();
          location.reload();
        }
      }]
    });

    await alert.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      if(this.network.type == 'none' || !this.network.type){
        //this.presentAlertOffline();
       }
      this.auth.authenticationState.subscribe(state => {
        if (state) {
          this.auth.getUserDetails().then(val => {
            if (val) {
              this.auth.userDetails.next(val);
              this.user_url = val.avatar;
              this.user_name = val.displayname;
              this.user_email = val.email;
            }
          });
          this.auth.validateAuthCookie();
          this.router.navigateByUrl('/tabs');
        } else {
          this.router.navigateByUrl('/tutorial');
        }
      });
      
      this.splashScreen.hide();
    });
  }

  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
      // close action sheet
      try {
        const element = await this.actionSheetCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {

      }

      // close popover
      try {
        const element = await this.popoverCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {

      }

      // close modal
      try {
        const element = await this.modalCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {
        console.log(error);

      }

      // close side menu
      try {
        const element = await this.menu.getOpen();
        if (element !== null) {
          this.menu.close();
          return;

        }

      } catch (error) {

      }
      //console.log('url:', this.router.url);
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {

        if (outlet && outlet.canGoBack()) {
          outlet.pop();

        } else if (this.router.url === '/tabs/home') {
          console.log('homepage');
          if (this.counter == 0) {
            this.counter++;
            this.exitAppToastMsg();
            setTimeout(() => { this.counter = 0 }, 3000)
          } else {
            navigator['app'].exitApp();
          }
        }
      });
    });
  }
  async exitAppToastMsg() {
    const toastmsg = await this.toast.create({
      message: `Press back again to exit App.`,
      duration: 2000,
      position: 'top',
      cssClass: 'dark-trans exit-app-toster',
      closeButtonText: 'OK',
      showCloseButton: false
    });
    toastmsg.present();
  }

  async doLogout() {
    const alert = await this.alertController.create({
      header: 'Confirm?',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Yes',
          handler: () => {
            this.auth.logout();
            this.menu.open('end');
            this.menu.enable(false);
            this.router.navigate(['/tutorial']);
          }
        }
      ]
    });

    await alert.present();
  }

}