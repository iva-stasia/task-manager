import Task from "../../entries/Task";
import { ISortingStrategy } from "../../types/interfaces";

class SortingService {
  public set sortingStrategy(strategy: ISortingStrategy) {
    this._sortingStrategy = strategy;
  }

  constructor(private _sortingStrategy: ISortingStrategy) {}

  public sort(tasks: Task[]): Task[] {
    return this._sortingStrategy.sort(tasks);
  }
}

export default SortingService;
