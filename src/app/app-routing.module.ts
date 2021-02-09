import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'tutorial', loadChildren: './tutorial/tutorial.module#TutorialPageModule' },
  { path: '',canActivate: [AuthGuardService], loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'home',canActivate: [AuthGuardService], loadChildren: './home/home.module#HomePageModule' },
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
  { path: 'calender', loadChildren: './calender/calender.module#CalenderPageModule' },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
