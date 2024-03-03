import Task from "../../../entries/Task";
import { ISortingStrategy } from "../../../types/interfaces";
import { selectionSorting } from "../../../utils/sort";

class ByDueDateSortingStrategy implements ISortingStrategy {
  public sort(tasks: Task[]): Task[] {
    return selectionSorting(tasks, "dueDate");
  }
}

export default ByDueDateSortingStrategy;
