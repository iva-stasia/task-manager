import { IObserver, IPublisher } from "../../types/interfaces";

abstract class NotificationService implements IPublisher {
  private readonly observers: IObserver[] = [];

  public attach(observer: IObserver): void {
    const isExist = this.observers.includes(observer);
    if (!isExist) this.observers.push(observer);
  }

  public detach(observer: IObserver): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) this.observers.splice(index, 1);
  }

  public notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}

export { NotificationService };
