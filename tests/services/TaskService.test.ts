import Employee from "../../src/entries/Employee";
import Task from "../../src/entries/Task";
import ErrorLoggingService from "../../src/services/ErrorLoggingService";
import FilteringService from "../../src/services/FilteringService";
import HistoryService from "../../src/services/HistoryService";
import TaskService from "../../src/services/TaskService";
import SortingService from "../../src/services/sorting/SortingService";
import ByCreatedAtSortingStrategy from "../../src/services/sorting/sorting-strategies/ByCreatedAtSortingStartegy";
import { TaskPriorityEnum } from "../../src/types/common";

describe("TaskService", () => {
  const errorLoggerService: ErrorLoggingService = ErrorLoggingService.getInstance();
  const historyService: HistoryService = HistoryService.getInstance();
  const filteringService: FilteringService = new FilteringService();
  const sortingService: SortingService = new SortingService(new ByCreatedAtSortingStrategy());

  let taskService: TaskService;
  let task: Task;
  let executor: Employee;

  beforeEach(() => {
    taskService = new TaskService(historyService, errorLoggerService);
    executor = new Employee("Name", "Manager");

    taskService.createTask(
      {
        type: "Task",
        title: "Test Task",
        description: "This is a test task",
        priority: TaskPriorityEnum.hight,
        dueDate: new Date(),
      },
      executor
    );

    task = taskService.getTasks()[0];
  });

  it("should create a new task and add it to the tasks list", () => {
    expect(taskService.getTasks().length).toBe(1);
  });

  it("should edit a task", () => {
    const taskData = {
      title: "New Title",
      description: "This is a test task",
      priority: TaskPriorityEnum.hight,
      dueDate: new Date(),
    };

    taskService.editTask(task.id, { type: "Task", ...taskData }, executor);

    expect(task.title).toEqual(taskData.title);
  });

  it("should delete a task from the tasks list", () => {
    taskService.deleteTask(task.id, executor);

    expect(taskService.getTasks().length).toBe(0);
  });
});
