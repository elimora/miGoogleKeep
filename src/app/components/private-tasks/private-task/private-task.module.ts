import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivateTaskPageRoutingModule } from './private-task-routing.module';

import { PrivateTaskPage } from './private-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivateTaskPageRoutingModule
  ],
  declarations: [PrivateTaskPage]
})
export class PrivateTaskPageModule {}
