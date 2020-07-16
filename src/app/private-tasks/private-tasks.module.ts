import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivateTasksPageRoutingModule } from './private-tasks-routing.module';

import { PrivateTasksPage } from './private-tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivateTasksPageRoutingModule
  ],
  declarations: [PrivateTasksPage]
})
export class PrivateTasksPageModule {}
