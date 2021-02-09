var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
var routes = [
    { path: 'tutorial', loadChildren: './tutorial/tutorial.module#TutorialPageModule' },
    { path: '', canActivate: [AuthGuardService], loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'home', canActivate: [AuthGuardService], loadChildren: './home/home.module#HomePageModule' },
    { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
    { path: 'emailverify', loadChildren: './emailverify/emailverify.module#EmailverifyPageModule' },
    { path: 'createpost', canActivate: [AuthGuardService], loadChildren: './createpost/createpost.module#CreatepostPageModule' },
    { path: 'forgotpassword', loadChildren: './forgotpassword/forgotpassword.module#ForgotpasswordPageModule' },
    { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
    { path: 'messaging', loadChildren: './messaging/messaging.module#MessagingPageModule' },
    { path: 'members', canActivate: [AuthGuardService], loadChildren: './members/members.module#MembersPageModule' },
    { path: 'userprofile/:frdid/:userid', loadChildren: './userprofile/userprofile.module#UserprofilePageModule' },
    { path: 'notification', loadChildren: './notification/notification.module#NotificationPageModule' },
    { path: 'setting', loadChildren: './setting/setting.module#SettingPageModule' },
    { path: 'userdetails', loadChildren: './userdetails/userdetails.module#UserdetailsPageModule' },
    { path: 'events', loadChildren: './events/events.module#EventsPageModule' },
    { path: 'networks', loadChildren: './networks/networks.module#NetworksPageModule' },
    { path: 'conversation', loadChildren: './conversation/conversation.module#ConversationPageModule' },
    { path: 'blocklist', loadChildren: './blocklist/blocklist.module#BlocklistPageModule' },
    { path: 'editaccount', loadChildren: './editaccount/editaccount.module#EditaccountPageModule' },
    { path: 'contact', loadChildren: './contact/contact.module#ContactPageModule' },
    { path: 'guidelines', loadChildren: './guidelines/guidelines.module#GuidelinesPageModule' },
    { path: 'invite', loadChildren: './invite/invite.module#InvitePageModule' },
    { path: 'terms', loadChildren: './terms/terms.module#TermsPageModule' },
    { path: 'preferences', loadChildren: './preferences/preferences.module#PreferencesPageModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map