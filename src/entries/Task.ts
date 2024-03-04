import { ERROR_MESSAGES } from "../constant/messages";
import ErrorLoggingService from "../services/ErrorLoggingService";
import { NotificationService } from "../services/notifications/NotificationService";
import { TaskPriorityEnum, TaskStatus, TaskType } from "../types/common";
import { IEmployee, ITask } from "../types/interfaces";
import Employee from "./Employee";

class Task extends NotificationService implements ITask {
  private readonly _id: string;
  private readonly _createdAt: Date;
  private _status: TaskStatus;
  private _assignedTo: Employee | null = null;

  public get id(): string {
    return this._id;
  }

  public get status(): TaskStatus {
    return this._status;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get type(): TaskType {
    return this._type;
  }

  public set type(newType: TaskType) {
    this._type = newType;
  }

  public get title(): string {
    return this._title;
  }

  public set title(newTitle: string) {
    this._title = newTitle;
  }

  public get description(): string {
    return this._description;
  }

  public set description(newDescription: string) {
    this._description = this.description;
  }

  public get priority(): TaskPriorityEnum {
    return this._priority;
  }

  public set priority(newPriority: TaskPriorityEnum) {
    this._priority = newPriority;
  }

  public get dueDate(): Date {
    return this._dueDate;
  }

  public set dueDate(newDueDate: Date) {
    this._dueDate = newDueDate;
  }

  public get assignedTo(): IEmployee | null {
    return this._assignedTo;
  }

  constructor(
    private _type: TaskType,
    private _title: string,
    private _description: string,
    private _priority: TaskPriorityEnum,
    private _dueDate: Date,
    private errorLogger: ErrorLoggingService
  ) {
    super();
    this._id = "uniqueTaskId";
    this._status = "New";
    this._createdAt = new Date();
  }

  public editTask(taskData: ITask): void {
    Object.assign(this, taskData);
  }

  public assignTo(employee: Employee): void {
    this._assignedTo = employee;
  }

  public updateStatus(status: TaskStatus): void {
    if (this._status === "In progress" || (this._status === "Done" && !this._assignedTo)) {
      const errorMessage = ERROR_MESSAGES.CHANGING_STATUS_OF_UNASSIGNED_TASK(this._status);

      this.errorLogger.addErrorLog(errorMessage);
      throw new Error(errorMessage);
    }

    this._status = status;
  }
}

export default Task;
