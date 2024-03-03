import { ERROR_MESSAGES } from "../constant/messages";
import Employee from "../entries/Employee";
import ErrorLoggingService from "../services/ErrorLoggingService";
import { ManagementPositionsEnum } from "../types/common";

function checkExecutorRole(executor: Employee, errorLogger: ErrorLoggingService) {
  if (executor.position !== ManagementPositionsEnum.admin && executor.position !== ManagementPositionsEnum.manager) {
    errorLogger.addErrorLog(ERROR_MESSAGES.FORBIDDEN_ERROR);
    throw new Error(ERROR_MESSAGES.FORBIDDEN_ERROR);
  }
}

export { checkExecutorRole };
