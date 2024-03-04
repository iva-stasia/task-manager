import { ERROR_MESSAGES } from "../../src/constant/messages";
import ErrorLoggingService from "../../src/services/ErrorLoggingService";
import { getByIdFromArray } from "../../src/utils/get-by-id-from-array";

const errorLogger = ErrorLoggingService.getInstance();

describe("getByIdFromArray function", () => {
  it("should return the item if it exists in the array", () => {
    const data = [
      { id: "1", name: "Item 1" },
      { id: "2", name: "Item 2" },
    ];
    const itemId = "1";

    const result = getByIdFromArray(data, itemId, errorLogger);

    expect(result).toEqual({ id: "1", name: "Item 1" });
  });

  it("should throw an error it if the item does not exist in the array", () => {
    const data = [
      { id: "1", name: "Item 1" },
      { id: "2", name: "Item 2" },
    ];
    const itemId = "3";

    expect(() => {
      getByIdFromArray(data, itemId, errorLogger);
    }).toThrow(ERROR_MESSAGES.INCORRECT_ID);
  });
});
