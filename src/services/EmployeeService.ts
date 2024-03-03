import { ERROR_MESSAGES } from "../constant/messages";
import Employee from "../entries/Employee";
import Task from "../entries/Task";
import { IEmployee } from "../types/interfaces";
import { getByIdFromArray } from "../utils/get-by-id-from-array";
import ErrorLoggingService from "./ErrorLoggingService";
import HistoryService from "./HistoryService";

class EmployeeService {
  private employees: Employee[] = [];

  constructor(private historyService: HistoryService, private errorLoggerService: ErrorLoggingService) {}

  public addEmployee(employeeData: IEmployee, executor: Employee): void {
    const employee = new Employee(employeeData.name, employeeData.position);

    this.employees.push(employee);
    this.historyService.addHistoryLog(executor, "addEmployee");
  }

  public deleteEmployee(employeeId: string, executor: Employee, newEmployeeId?: string): void {
    const employee = getByIdFromArray(this.employees, employeeId, this.errorLoggerService);

    const unfinishedTask = employee.tasks.filter((task) => task.status !== "Done");
    if (unfinishedTask) {
      if (newEmployeeId) {
        this.reassignTo(newEmployeeId, unfinishedTask);
      } else {
        this.errorLoggerService.addErrorLog(ERROR_MESSAGES.DELETING_EMPLOYEE_WITH_UNFINISHED_TASK);
        throw new Error(ERROR_MESSAGES.DELETING_EMPLOYEE_WITH_UNFINISHED_TASK);
      }
    }

    this.employees = this.employees.filter((employee) => employee.id === employeeId);
    this.historyService.addHistoryLog(executor, "deleteEmployee");
  }

  public changePosition(employeeId: string, executor: Employee, newPosition: string, newEmployeeId?: string): void {
    const employee = getByIdFromArray(this.employees, employeeId, this.errorLoggerService);

    const unfinishedTask = employee.tasks.filter((task) => task.status !== "Done");
    if (unfinishedTask) {
      if (newEmployeeId) {
        this.reassignTo(newEmployeeId, unfinishedTask);
      } else {
        this.errorLoggerService.addErrorLog(ERROR_MESSAGES.UPDATING_EMPLOYEE_WITH_UNFINISHED_TASK);
        throw new Error(ERROR_MESSAGES.UPDATING_EMPLOYEE_WITH_UNFINISHED_TASK);
      }
    }

    employee.changePosition(newPosition);
    this.historyService.addHistoryLog(executor, "changePosition");
  }

  private reassignTo(newEmployeeId: string, tasks: Task[]): void {
    const employee = getByIdFromArray(this.employees, newEmployeeId, this.errorLoggerService);
    tasks.forEach((task) => task.assignTo(employee));
  }
}

export default EmployeeService;
