import Employee from "../../src/entries/Employee";
import Task from "../../src/entries/Task";
import ErrorLoggingService from "../../src/services/ErrorLoggingService";
import HistoryService from "../../src/services/HistoryService";
import TaskService from "../../src/services/TaskService";
import { TaskPriorityEnum } from "../../src/types/common";

describe("TaskService", () => {
  const errorLoggerService: ErrorLoggingService = ErrorLoggingService.getInstance();
  const historyService: HistoryService = HistoryService.getInstance();

  let taskService: TaskService;
  let task: Task;
  let executor: Employee;

  const taskData = {
    title: "First Test Task",
    description: "This is a test task",
    priority: TaskPriorityEnum.hight,
    dueDate: new Date(),
  };

  beforeEach(() => {
    taskService = new TaskService(historyService, errorLoggerService);
    executor = new Employee("Name", "Manager");

    taskService.createTask({ type: "Task", ...taskData }, executor);

    [task] = taskService.getTasks();
  });

  it("should provide a task by id", () => {
    const taskById = taskService.getTaskById(task.id);
    expect(taskById.title).toEqual(taskData.title);
  });

  it("should create a new task and add it to the tasks list", () => {
    expect(taskService.getTasks().length).toBe(1);
  });

  it("should edit a task", () => {
    const updatedTaskData = {
      ...taskData,
      title: "New Title",
    };

    taskService.editTask(task.id, { type: "Task", ...updatedTaskData }, executor);

    expect(task.title).toEqual(updatedTaskData.title);
  });

  it("should delete a task from the tasks list", () => {
    taskService.deleteTask(task.id, executor);

    expect(taskService.getTasks().length).toBe(0);
  });

  it("should assign a task to employee", () => {
    taskService.assignTo(task.id, executor, executor);

    const taskById = taskService.getTaskById(task.id);

    expect(taskById.assignedTo).toEqual(executor);
  });

  it("should update a task status", () => {
    taskService.updateStatus(task.id, "In progress", executor);

    const taskById = taskService.getTaskById(task.id);

    expect(taskById.status).toEqual("In progress");
  });

  it("should filter tasks", () => {
    const secondTaskData = {
      title: "Second Test Task",
      description: "This is a test task",
      priority: TaskPriorityEnum.low,
      dueDate: new Date(),
    };

    taskService.createTask({ type: "Task", ...secondTaskData }, executor);
    const filteredTasks = taskService.filter({ priority: TaskPriorityEnum.low });

    expect(filteredTasks.length).toBe(1);
  });

  it("should sort tasks", () => {
    const secondTaskData = {
      title: "Second Test Task",
      description: "This is a test task",
      priority: TaskPriorityEnum.low,
      dueDate: new Date(),
    };

    taskService.createTask({ type: "Task", ...secondTaskData }, executor);

    const sortedTasks = taskService.sort();

    expect(sortedTasks[0].priority).toBe(TaskPriorityEnum.low);
    expect(sortedTasks[1].priority).toBe(TaskPriorityEnum.hight);
  });
});
