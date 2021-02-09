import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserprofilePage } from './userprofile.page';
import { PipeModule } from '../pipes/pipe.module';

const routes: Routes = [
  {
    path: '',
    component: UserprofilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    PipeModule,
  ],
  declarations: [UserprofilePage]
})
export class UserprofilePageModule {}
