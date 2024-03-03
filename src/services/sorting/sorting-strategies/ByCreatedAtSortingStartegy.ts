import Task from "../../../entries/Task";
import { ISortingStrategy } from "../../../types/interfaces";
import { bubbleSorting } from "../../../utils/sort";

class ByCreatedAtSortingStrategy implements ISortingStrategy {
  public sort(tasks: Task[]): Task[] {
    return bubbleSorting(tasks, "createdAt");
  }
}

export default ByCreatedAtSortingStrategy;
