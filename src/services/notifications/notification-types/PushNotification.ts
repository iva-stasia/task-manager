import Task from "../../../entries/Task";
import { IObserver } from "../../../types/interfaces";

class PushNotification implements IObserver {
  public update(publisher: Task): void {
    console.log(`Status of task "${publisher.title}" was changed to "${publisher.status}"`);
  }
}

export default PushNotification;
