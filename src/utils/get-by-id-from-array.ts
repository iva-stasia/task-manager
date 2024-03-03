import { ERROR_MESSAGES } from "../constant/messages";
import ErrorLoggingService from "../services/ErrorLoggingService";

function getByIdFromArray<T extends { id: string }>(data: T[], id: string, errorLogger: ErrorLoggingService): T {
  const item = data.find((item) => item.id === id);

  if (!item) {
    errorLogger.addErrorLog(ERROR_MESSAGES.INCORRECT_ID);
    throw new Error(ERROR_MESSAGES.INCORRECT_ID);
  }

  return item;
}

export { getByIdFromArray };
