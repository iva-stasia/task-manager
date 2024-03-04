import Task from "../../../src/entries/Task";
import ErrorLoggingService from "../../../src/services/ErrorLoggingService";
import SortingService from "../../../src/services/sorting/SortingService";
import ByCreatedAtSortingStrategy from "../../../src/services/sorting/sorting-strategies/ByCreatedAtSortingStrategy";
import ByDueDateSortingStrategy from "../../../src/services/sorting/sorting-strategies/ByDueDateSortingStrategy";
import ByPrioritySortingStrategy from "../../../src/services/sorting/sorting-strategies/ByPrioritySortingStrategy";
import { TaskPriorityEnum } from "../../../src/types/common";

const errorLoggerService: ErrorLoggingService = ErrorLoggingService.getInstance();

describe("SortingService", () => {
  const tasks = [
    new Task("Task", "Title 1", "Description", TaskPriorityEnum.medium, new Date("2024-03-04"), errorLoggerService),
    new Task("Bug", "Title 2", "Description", TaskPriorityEnum.hight, new Date("2024-03-03"), errorLoggerService),
    new Task("Story", "Title 3", "Description", TaskPriorityEnum.low, new Date("2024-03-02"), errorLoggerService),
  ];

  it("should sort tasks using the 'ByCreatedAtSortingStrategy' sorting strategy", () => {
    const sortingService = new SortingService(new ByCreatedAtSortingStrategy());
    const sortedTasks = sortingService.sort(tasks);

    expect(sortedTasks.map((task) => task.title)).toEqual(["Title 1", "Title 2", "Title 3"]);
  });

  it("should sort tasks using the 'ByDueDateSortingStrategy' sorting strategy", () => {
    const sortingService = new SortingService(new ByDueDateSortingStrategy());
    const sortedTasks = sortingService.sort(tasks);

    expect(sortedTasks.map((task) => task.title)).toEqual(["Title 3", "Title 2", "Title 1"]);
  });

  it("should sort tasks using the 'ByDueDateSortingStrategy' sorting strategy", () => {
    const sortingService = new SortingService(new ByPrioritySortingStrategy());
    const sortedTasks = sortingService.sort(tasks);

    expect(sortedTasks.map((task) => task.title)).toEqual(["Title 3", "Title 1", "Title 2"]);
  });
});
