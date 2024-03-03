import Employee from "../entries/Employee";
import Task from "../entries/Task";
import { NotificationService } from "../services/notifications/NotificationService";
import { TaskFilterParams, TaskPriority, TaskStatus, TaskType } from "./common";

interface ITask {
  type: TaskType;
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: Date;
}

interface IEmployee {
  name: string;
  position: string;
}

interface IPublisher {
  attach(observer: IObserver): void;
  detach(observer: IObserver): void;
  notify(message: string): void;
}

interface IObserver {
  update(publisher: NotificationService): void;
}

interface ISortingStrategy {
  sort: (tasks: Task[]) => Task[];
}

export { ITask, IEmployee, IPublisher, IObserver, ISortingStrategy };
