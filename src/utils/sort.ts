function bubbleSorting<T>(arr: T[], field: keyof T): T[] {
  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      if (arr[j][field] > arr[j + 1][field]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

function selectionSorting<T>(arr: T[], field: keyof T): T[] {
  for (let i = 0; i < arr.length; i++) {
    let min = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j][field] < arr[min][field]) {
        min = j;
      }
    }

    if (i !== min) {
      let temp = arr[i];
      arr[i] = arr[min];
      arr[min] = temp;
    }
  }

  return arr;
}

function insertionSorting<T>(arr: T[], field: keyof T): T[] {
  for (let i = 1; i < arr.length; i++) {
    let currentValue = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j][field] > currentValue[field]) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = currentValue;
  }

  return arr;
}

export { bubbleSorting, selectionSorting, insertionSorting };
