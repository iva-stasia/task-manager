import { IEmployee } from "../types/interfaces";
import Task from "./Task";

class Employee implements IEmployee {
  private readonly _id: string;
  private _tasks: Task[] = [];

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get position(): string {
    return this._position;
  }

  public get tasks(): Task[] {
    return this._tasks;
  }

  constructor(private _name: string, private _position: string) {
    this._id = "uniqueEmployeeId";
  }

  public changePosition(newPosition: string): void {
    this._position = newPosition;
  }

  public addTask(task: Task): void {
    this._tasks.push(task);
  }
}

export default Employee;
