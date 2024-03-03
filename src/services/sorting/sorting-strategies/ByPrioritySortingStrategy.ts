import Task from "../../../entries/Task";
import { ISortingStrategy } from "../../../types/interfaces";
import { insertionSorting } from "../../../utils/sort";

class ByPrioritySortingStrategy implements ISortingStrategy {
  public sort(tasks: Task[]): Task[] {
    return insertionSorting(tasks, "priority");
  }
}

export default ByPrioritySortingStrategy;
