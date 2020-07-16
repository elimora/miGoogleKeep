import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivateTasksPage } from './private-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: PrivateTasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateTasksPageRoutingModule {}
