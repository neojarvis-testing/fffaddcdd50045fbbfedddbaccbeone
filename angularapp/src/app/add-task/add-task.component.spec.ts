import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {
  FormBuilder,
  MaxLengthValidator,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddTaskComponent } from './add-task.component';
import { TaskService } from '../services/task.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';

describe('AddtaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let service: TaskService;
  let debugElement: DebugElement;
  let formBuilder: FormBuilder;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTaskComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [TaskService],
    });
    formBuilder = TestBed.inject(FormBuilder) as any;
    fixture = TestBed.createComponent(AddTaskComponent) as any;
    component = fixture.componentInstance as any;
    service = TestBed.inject(TaskService) as any;
    fixture.detectChanges();
  });

  fit('should create AddtaskComponent', () => {
    expect(component).toBeTruthy();
  });


  fit('should add a new task when form is valid', () => {
    const mocktask = {
      title: 'Project 1',
      description: 'Project title',
      dueDate: '12-12-2023',
      status: 'Started',
    };
    spyOn((service as any), 'addTask').and.returnValue(of(mocktask)); // Mock the addtask method
    (component as any).taskForm.setValue(mocktask); // Set form values
    (component as any).addNewTask(); // Trigger the addNewtask method
    expect((component as any).taskForm.valid).toBeTruthy();
    expect(service['addTask']).toHaveBeenCalledWith(mocktask);
  });


  fit('should add all the required fields', () => {
    const form = (component as any).taskForm;
    form.setValue({
      title: '',
      description: '',
      dueDate: '',
      status: '',
    });

    expect(form.valid).toBeFalsy();
    expect(form.get('title')?.hasError('required')).toBeTruthy();
    expect(form.get('description')?.hasError('required')).toBeTruthy();
    expect(form.get('dueDate')?.hasError('required')).toBeTruthy();
    expect(form.get('status')?.hasError('required')).toBeTruthy();

  });


  fit('should validate dueDate format', () => {
    const form = (component as any).taskForm;
    form.setValue({
      title: 'Project 1',
      description: 'Project title',
      dueDate: '12-12-2023',
    status: 'Started',
    });
    expect(form.valid).toBeTruthy();
    expect(form.get('dueDate')?.hasError('pattern')).toBeFalsy();
    form.setValue({
      title: 'Project 1',
      description: 'Project title',
      dueDate: '12-12-20234',
      status: 'Started',
    });
    expect(form.valid).toBeFalsy();
    expect(form.get('dueDate')?.hasError('pattern')).toBeTruthy();
  });
});


