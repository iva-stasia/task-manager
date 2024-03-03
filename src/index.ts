import Employee from "./entries/Employee";
import EmployeeService from "./services/EmployeeService";
import ErrorLoggingService from "./services/ErrorLoggingService";
import HistoryService from "./services/HistoryService";
import TaskService from "./services/TaskService";
import { TaskPriority } from "./types/common";

class TaskManager {
  private historyService: HistoryService = HistoryService.getInstance();
  private errorLoggerService: ErrorLoggingService = ErrorLoggingService.getInstance();
  public taskService: TaskService = new TaskService(this.historyService, this.errorLoggerService);
  public employeeService: EmployeeService = new EmployeeService(this.historyService, this.errorLoggerService);
}

const taskManager = new TaskManager();
const employee = new Employee("Rick Sanchez", "Scientist");
const manager = new Employee("Morty Smith", "Manager");

taskManager.employeeService.addEmployee(employee, manager);
taskManager.taskService.createTask(
  {
    type: "Task",
    title: "Funny Task",
    description: "Explanation of the importance of the task",
    priority: TaskPriority.hight,
    dueDate: new Date(),
  },
  manager
);
