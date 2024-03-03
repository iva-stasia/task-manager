import Employee from "../entries/Employee";
import { ChangesType } from "../types/common";

class HistoryLog {
  private readonly date: Date;

  public get details(): string {
    return `${this.executor} - ${this.changes} - ${this.date.toISOString()}`;
  }

  constructor(private readonly executor: Employee, private readonly changes: ChangesType) {
    this.date = new Date();
  }
}

class HistoryService {
  private static instance: HistoryService;
  private readonly historyLogs: HistoryLog[] = [];

  public get details(): string[] {
    return this.historyLogs.map((error) => error.details);
  }

  private constructor() {}

  public static getInstance(): HistoryService {
    if (!HistoryService.instance) {
      HistoryService.instance = new HistoryService();
    }

    return HistoryService.instance;
  }

  public addHistoryLog(executor: Employee, changes: ChangesType): void {
    const historyLog = new HistoryLog(executor, changes);
    this.historyLogs.unshift(historyLog);
  }
}

export default HistoryService;
