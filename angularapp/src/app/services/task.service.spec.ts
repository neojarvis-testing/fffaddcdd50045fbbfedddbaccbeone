import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
 
describe('TaskService', () => {
  let service: TaskService;
  let httpTestingController: HttpTestingController;
 
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
      description: 'Project titlen2',
      dueDate: '12-11-2023',
      status: 'Completed',
    },
  ];
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });
    service = TestBed.inject(TaskService) as any;
    httpTestingController = TestBed.inject(HttpTestingController);
  });
 
  afterEach(() => {
    // Ensure that there are no outstanding requests after each test
    httpTestingController.verify();
  });
 
  fit('should be created', () => {
    expect(service).toBeTruthy();
  });
 
  fit('should retrieve tasks from the API via GET', () => {
    // const mocktasks = [...]; // Define your mock data
    (service as any).getTasks().subscribe((tasks: any) => {
      expect(tasks).toEqual(mocktasks);
    });
 
    const req = httpTestingController.expectOne(`${service['backendUrl']}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mocktasks);
  });
 
  fit('should add a task via POST', () => {
    const newtask = {
      id: 1,
      title: "Project 1",
      description: 'Project title',
      dueDate: '12-12-2023',
      status: 'Started',
    };
 
    service['addTask'](newtask).subscribe((task) => {
      expect(task).toEqual(newtask);
    });
    const req = httpTestingController.expectOne(`${service['backendUrl']}`);
    expect(req.request.method).toEqual('POST');
    req.flush(newtask);
  });
 
  fit('should delete a task via DELETE', () => {
    const taskId = 1;

    (service as any).deleteTask(taskId).subscribe(() => {
      // The response is void, so no need to assert anything here
    });

    const req = httpTestingController.expectOne(`${service['backendUrl']}/${taskId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
});




