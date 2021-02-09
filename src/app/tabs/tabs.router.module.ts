import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'mynetwork',
        children: [
          {
            path: '',
             loadChildren: '../members/members.module#MembersPageModule'
          }
        ]
      },
      {
        path: 'directory',
        children: [
          {
            path: '',
             loadChildren: '../networks/networks.module#NetworksPageModule'
          }
        ]
      },
      {
        path: 'messaging',
        children: [
          {
            path: '',
            loadChildren: '../messaging/messaging.module#MessagingPageModule'
          }
        ]
      },
      {
        path: 'notification',
        children: [
          {
            path: '',
            loadChildren: '../notification/notification.module#NotificationPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
