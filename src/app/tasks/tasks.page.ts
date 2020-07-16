import { Component, OnInit } from '@angular/core';
import {TasksService} from '../services/tasks.service'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  tasks=[];
  

  constructor(private tasksService:TasksService) { }

  ngOnInit() {
    
    this.tasksService.getTasks()
      .subscribe(
        res=>{
          console.log(res)
          this.tasks=res;
        },
        err=>console.log(err)
      )
  }

 
}
