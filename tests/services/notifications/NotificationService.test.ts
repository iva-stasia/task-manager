import { NotificationService } from "../../../src/services/notifications/NotificationService";

class ConcreteNotificationService extends NotificationService {
  public doSomething(): void {}
}

describe("NotificationService", () => {
  it("should attach, detach, and notify observers correctly", () => {
    const observer1 = { update: vi.fn() };
    const observer2 = { update: vi.fn() };

    const notificationService = new ConcreteNotificationService();

    notificationService.attach(observer1);
    notificationService.attach(observer2);

    notificationService.notify();

    expect(observer1.update).toHaveBeenCalledWith(notificationService);
    expect(observer2.update).toHaveBeenCalledWith(notificationService);

    notificationService.detach(observer1);

    notificationService.notify();

    expect(observer1.update).toHaveBeenCalledTimes(1);
    expect(observer2.update).toHaveBeenCalledTimes(2);
  });
});
