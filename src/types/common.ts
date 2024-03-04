import Task from "../entries/Task";
import EmployeeService from "../services/EmployeeService";
import TaskService from "../services/TaskService";

enum ManagementPositionsEnum {
  admin = "Admin",
  manager = "Manager",
}

enum TaskPriorityEnum {
  low = 1,
  medium = 2,
  hight = 3,
}

type TaskType = "Story" | "Bug" | "Task";
type TaskStatus = "New" | "In progress" | "Done" | "Deferred";

type TaskFilterParams = {
  [K in keyof Task]?: Task[K];
};

type ChangesType = keyof TaskService | keyof EmployeeService;

export { TaskType, TaskPriorityEnum, TaskStatus, TaskFilterParams, ChangesType, ManagementPositionsEnum };
