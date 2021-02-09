import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { CreatepostPageModule } from '../createpost/createpost.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SafePipe } from '../pipes/safe.pipe';
import { PipeModule } from '../pipes/pipe.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    CreatepostPageModule,
    FontAwesomeModule,
    PipeModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
