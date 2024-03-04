import Employee from "../entries/Employee";
import { TaskStatus } from "../types/common";

const ERROR_MESSAGES = {
  INCORRECT_ID: "Incorrect id.",
  DELETING_EMPLOYEE_WITH_UNFINISHED_TASK: "Finish or reassign unfinished tasks before deleting an employee",
  UPDATING_EMPLOYEE_WITH_UNFINISHED_TASK: "Finish or reassign unfinished tasks before changing an employee position",
  FORBIDDEN_ERROR: "Only management staff can perform this action",
  CHANGING_STATUS_OF_UNASSIGNED_TASK: (status: TaskStatus) =>
    `Assign the task to an employee to change status to "${status}".`,
};

export { ERROR_MESSAGES };
