import { ERROR_MESSAGES } from "../../src/constant/messages";
import Employee from "../../src/entries/Employee";
import ErrorLoggingService from "../../src/services/ErrorLoggingService";
import { ManagementPositionsEnum } from "../../src/types/common";
import { checkExecutorRole } from "../../src/utils/check-executor-role";

const errorLogger = ErrorLoggingService.getInstance();

describe("checkExecutorRole function", () => {
  it("should not throw an error if executor's position is admin", () => {
    const executor = new Employee("Name", ManagementPositionsEnum.admin);

    expect(() => {
      checkExecutorRole(executor, errorLogger);
    }).not.toThrow();
  });

  it("should not throw an error if executor's position is manager", () => {
    const executor = new Employee("Name", ManagementPositionsEnum.manager);

    expect(() => {
      checkExecutorRole(executor, errorLogger);
    }).not.toThrow();
  });

  it("should throw an error and log it if executor's position is neither admin nor manager", () => {
    const executor = new Employee("Name", "scientist");

    expect(() => {
      checkExecutorRole(executor, errorLogger);
    }).toThrow(ERROR_MESSAGES.FORBIDDEN_ERROR);
  });
});
