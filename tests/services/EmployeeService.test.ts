import { ERROR_MESSAGES } from "../../src/constant/messages";
import Employee from "../../src/entries/Employee";
import EmployeeService from "../../src/services/EmployeeService";
import ErrorLoggingService from "../../src/services/ErrorLoggingService";
import HistoryService from "../../src/services/HistoryService";
import TaskService from "../../src/services/TaskService";
import { TaskPriorityEnum } from "../../src/types/common";

describe("EmployeeService", () => {
  const errorLoggerService: ErrorLoggingService = ErrorLoggingService.getInstance();
  const historyService: HistoryService = HistoryService.getInstance();

  let employeeService: EmployeeService;
  let executor: Employee;
  let employee: Employee;

  const employeeData = {
    name: "Secret Employee",
    position: "Secret Agent",
  };

  beforeEach(() => {
    employeeService = new EmployeeService(historyService, errorLoggerService);
    executor = new Employee("Unknown Employee", "Manager");

    employeeService.addEmployee(employeeData, executor);

    [employee] = employeeService.getEmployees();
  });

  it("should add a new employee", () => {
    expect(employeeService.getEmployees().length).toBe(1);
  });

  it("should delete an employee without unfinished tasks", () => {
    employeeService.deleteEmployee(employee.id, executor);

    expect(employeeService.getEmployees().length).toBe(0);
  });

  it("should throw an error when deleting an employee with unfinished tasks", () => {
    const taskData = {
      title: "Test Task",
      description: "This is a test task",
      priority: TaskPriorityEnum.low,
      dueDate: new Date(),
    };
    const taskService = new TaskService(historyService, errorLoggerService);

    taskService.createTask({ type: "Task", ...taskData }, executor);
    const [task] = taskService.getTasks();
    taskService.assignTo(task.id, employee, executor);

    expect(() => {
      employeeService.deleteEmployee(employee.id, executor);
    }).toThrow(ERROR_MESSAGES.DELETING_EMPLOYEE_WITH_UNFINISHED_TASK);
  });

  it("should change an employee position", () => {
    const newPosition = "New Position";

    employeeService.changePosition(employee.id, executor, newPosition);

    expect(employee.position).toEqual(newPosition);
  });

  it("should throw an error when updating an employee with unfinished tasks", () => {
    const taskData = {
      title: "Test Task",
      description: "This is a test task",
      priority: TaskPriorityEnum.low,
      dueDate: new Date(),
    };
    const taskService = new TaskService(historyService, errorLoggerService);

    taskService.createTask({ type: "Task", ...taskData }, executor);
    const [task] = taskService.getTasks();
    taskService.assignTo(task.id, employee, executor);

    expect(() => {
      employeeService.changePosition(employee.id, executor, "New Position");
    }).toThrow(ERROR_MESSAGES.UPDATING_EMPLOYEE_WITH_UNFINISHED_TASK);
  });
});
