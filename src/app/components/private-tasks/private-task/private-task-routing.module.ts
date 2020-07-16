import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivateTaskPage } from './private-task.page';

const routes: Routes = [
  {
    path: '',
    component: PrivateTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateTaskPageRoutingModule {}
