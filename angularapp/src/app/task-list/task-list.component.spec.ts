import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../services/task.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
 
describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let service: TaskService;
 
  const mocktasks = [
    {
      id: 1,
      title: "Project 1",
      description: 'Project title',
      dueDate: '12-12-2023',
      status: 'Started',
    },
    {
      id: 2,
      title: "Project 2",
      description: 'Project title',
      dueDate: '12-11-2023',
      status: 'Completed',
    },
  ];
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [TaskService],
      imports: [HttpClientTestingModule], // Add this line
 
    });
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TaskService);
  });
 
 
  fit('should create TaskListComponent', () => {
    expect(component).toBeTruthy();
  });
 
  fit('should call getTasks', () => {
    spyOn((service as any), 'getTasks').and.returnValue(of([]));
    (component as any).getTasks();
    expect((component as any).getTasks).toBeDefined();
    expect((component as any).getTasks instanceof Function).toBeTruthy();
    expect((service as any).getTasks).toHaveBeenCalled();
  });

  fit('should call deleteTask', () => {
    spyOn((service as any), 'deleteTask').and.returnValue(of());
    (component as any).deleteTask();
    expect((component as any).deleteTask).toBeDefined();
    expect((component as any).deleteTask instanceof Function).toBeTruthy();
    expect((service as any).deleteTask).toHaveBeenCalled();
  });

});



