import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emailverify',
  templateUrl: './emailverify.page.html',
  styleUrls: ['./emailverify.page.scss'],
})
export class EmailverifyPage implements OnInit {

  constructor(public menuCtrl: MenuController,
            public statusCtrl: StatusBar,
            public router: Router) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.statusCtrl.overlaysWebView(true);
  }
  resendEmail(){
    console.log('On Progress');
  }
  backtoLogin(){
    this.router.navigate(['/login']);
  }

}
