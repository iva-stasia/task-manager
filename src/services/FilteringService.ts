import Task from "../entries/Task";
import { TaskFilterParams } from "../types/common";

class FilteringService {
  public filter(tasks: Task[], params: TaskFilterParams): Task[] {
    return tasks.filter((task) => {
      for (const key in params) {
        if (task[key as keyof Task] !== params[key as keyof Task]) {
          return false;
        }
      }
      return true;
    });
  }
}

export default FilteringService;
