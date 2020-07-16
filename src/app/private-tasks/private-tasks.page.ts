import { Component, OnInit } from '@angular/core';
import {TasksService} from '../services/tasks.service'
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.page.html',
  styleUrls: ['./private-tasks.page.scss'],
})
export class PrivateTasksPage implements OnInit {

  tasks=[]; 

  constructor(private tasksService:TasksService) { }

  ngOnInit() {
    this.tasksService.getPrivateTasks()
      .subscribe(
        res=>{
          console.log(res);
          this.tasks=res;
        }
      )
  }

}
