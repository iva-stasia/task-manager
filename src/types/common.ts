import Task from "../entries/Task";
import EmployeeService from "../services/EmployeeService";
import TaskService from "../services/TaskService";

enum ManagementPositionsEnum {
  admin = "Admin",
  manager = "Manager",
}

enum TaskPriorityEnum {
  low = "Low",
  medium = "Medium",
  hight = "Hight",
}

type TaskType = "Story" | "Bug" | "Task";
type TaskStatus = "New" | "In progress" | "Done" | "Deferred";

type TaskFilterParams = {
  [K in keyof Task]?: Task[K];
};

type ChangesType = keyof TaskService | keyof EmployeeService;

export {
  TaskType,
  TaskPriorityEnum as TaskPriority,
  TaskStatus,
  TaskFilterParams,
  ChangesType,
  ManagementPositionsEnum,
};