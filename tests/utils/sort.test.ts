import { bubbleSorting, insertionSorting, selectionSorting } from "../../src/utils/sort";

describe("Sorting functions", () => {
  const testData = [
    { id: 3, name: "Third" },
    { id: 1, name: "First" },
    { id: 2, name: "Second" },
  ];

  const sortedByIdAscending = [
    { id: 1, name: "First" },
    { id: 2, name: "Second" },
    { id: 3, name: "Third" },
  ];

  it("should sort data using bubble sort by id", () => {
    const sortedData = bubbleSorting([...testData], "id");
    expect(sortedData).toEqual(sortedByIdAscending);
  });

  it("should sort data using selection sort by id", () => {
    const sortedData = selectionSorting([...testData], "id");
    expect(sortedData).toEqual(sortedByIdAscending);
  });

  it("should sort data using insertion sort by id", () => {
    const sortedData = insertionSorting([...testData], "id");
    expect(sortedData).toEqual(sortedByIdAscending);
  });
});
