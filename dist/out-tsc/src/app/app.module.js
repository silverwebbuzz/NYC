var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { Network } from '@ionic-native/network/ngx';
import { NotificationsComponent } from './component/optionsnotifications/notifications.component';
import { CalendarComponent } from './component/calendar/calendar.component';
import { PrivacyComponent } from './component/privacy/privacy.component';
import { FormsModule } from '@angular/forms';
import { CommentsComponent } from './component/comments/comments.component';
import { RepliesComponent } from './component/replies/replies.component';
import { ReactionComponent } from './component/reaction/reaction.component';
import { SearchComponent } from './component/search/search.component';
import { OptionshomeComponent } from './component/optionshome/optionshome.component';
import { OptionsconnectionsComponent } from './component/optionsconnections/optionsconnections.component';
import { TermsPage } from './terms/terms.page';
import { CreatepostPageModule } from './createpost/createpost.module';
import { TermsPageModule } from './terms/terms.module';
library.add(fas, far, fab);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [AppComponent, NotificationsComponent, CalendarComponent, PrivacyComponent, CommentsComponent, RepliesComponent, ReactionComponent, SearchComponent, OptionshomeComponent, OptionsconnectionsComponent],
            entryComponents: [NotificationsComponent, PrivacyComponent, CommentsComponent, RepliesComponent, ReactionComponent, SearchComponent, OptionshomeComponent, OptionsconnectionsComponent, TermsPage],
            imports: [
                BrowserModule,
                IonicModule.forRoot({
                    rippleEffect: false,
                    mode: 'ios'
                }),
                AppRoutingModule,
                FormsModule,
                IonicStorageModule.forRoot(),
                HttpClientModule,
                FontAwesomeModule,
                CreatepostPageModule,
                TermsPageModule
            ],
            providers: [
                StatusBar,
                SplashScreen,
                Camera,
                File,
                WebView,
                FilePath,
                Network,
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
                SocialSharing
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map