import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    try{
    this.taskService.getTasks()
      .subscribe((res) => {
       console.log(res)
        this.tasks = res
      },(err)=>{
        console.log(err)
      });
  }catch(err){
    console.log("Err",err)
  }
}

  deleteTask(id: any): void {
    this.taskService.deleteTask(id)
      .subscribe(() => {
        // Remove the deleted task from the list
        this.tasks = this.tasks.filter(task => task.id !== id);
      });
  }
}
