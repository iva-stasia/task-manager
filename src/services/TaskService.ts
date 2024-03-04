import Employee from "../entries/Employee";
import Task from "../entries/Task";
import { TaskFilterParams, TaskStatus } from "../types/common";
import { ITask } from "../types/interfaces";
import { checkExecutorRole } from "../utils/check-executor-role";
import { getByIdFromArray } from "../utils/get-by-id-from-array";
import ErrorLoggingService from "./ErrorLoggingService";
import FilteringService from "./FilteringService";
import HistoryService from "./HistoryService";
import SortingService from "./sorting/SortingService";
import ByPrioritySortingStrategy from "./sorting/sorting-strategies/ByPrioritySortingStrategy";

class TaskService {
  private readonly filteringService: FilteringService = new FilteringService();
  private readonly sortingService: SortingService = new SortingService(new ByPrioritySortingStrategy());
  private tasks: Task[] = [];

  constructor(private historyService: HistoryService, private errorLoggerService: ErrorLoggingService) {}

  public getTasks(): Task[] {
    return this.tasks;
  }

  public getTaskById(taskId: string): Task {
    const task = getByIdFromArray(this.tasks, taskId, this.errorLoggerService);
    return task;
  }

  public createTask(taskData: ITask, executor: Employee): void {
    const task = new Task(
      taskData.type,
      taskData.title,
      taskData.description,
      taskData.priority,
      taskData.dueDate,
      this.errorLoggerService
    );

    this.tasks.push(task);
    this.historyService.addHistoryLog(executor, "createTask");
  }

  public editTask(taskId: string, taskData: ITask, executor: Employee): void {
    checkExecutorRole(executor, this.errorLoggerService);

    const task = getByIdFromArray(this.tasks, taskId, this.errorLoggerService);

    task.editTask(taskData);
    this.historyService.addHistoryLog(executor, "editTask");
  }

  public deleteTask(taskId: string, executor: Employee): void {
    checkExecutorRole(executor, this.errorLoggerService);

    const taskToDelete = getByIdFromArray(this.tasks, taskId, this.errorLoggerService);

    this.tasks = this.tasks.filter((task) => task.id !== taskToDelete.id);
    this.historyService.addHistoryLog(executor, "deleteTask");
  }

  public assignTo(taskId: string, employee: Employee, executor: Employee): void {
    checkExecutorRole(executor, this.errorLoggerService);

    const task = getByIdFromArray(this.tasks, taskId, this.errorLoggerService);

    task.assignTo(employee);
    this.historyService.addHistoryLog(executor, "assignTo");
  }

  public updateStatus(taskId: string, status: TaskStatus, executor: Employee): void {
    checkExecutorRole(executor, this.errorLoggerService);

    const task = getByIdFromArray(this.tasks, taskId, this.errorLoggerService);

    task.updateStatus(status);
    this.historyService.addHistoryLog(executor, "updateStatus");
  }

  public filter(params: TaskFilterParams): Task[] {
    return this.filteringService.filter([...this.tasks], params);
  }

  public sort(): Task[] {
    return this.sortingService.sort([...this.tasks]);
  }
}

export default TaskService;
