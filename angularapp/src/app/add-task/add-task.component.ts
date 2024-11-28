import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
 
  taskForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private taskService: TaskService) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      dueDate: ['', [Validators.required, Validators.pattern(/^\d{2}-\d{2}-\d{4}$/)]],
    });
  }
  ngOnInit(): void {
  }
  addNewTask() {
    if (this.taskForm.valid) {
      console.log(this.taskForm.value);
      try{
        this.taskService.addTask(this.taskForm.value)
          .subscribe((res) => {
           console.log(res)
            // this.tasks = res
          },(err)=>{
            console.log(err)
          });
      }catch(err){
        console.log("Err",err)
      }
    }
  }

}
