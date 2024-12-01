export function sortArrayByObject(arr, sortConfig) {
  if (!arr || !sortConfig || !sortConfig.sortField) {
    return arr;
  }

  try {
    const sortedArr = [...arr];

    if (sortConfig.sortOrder) {
      // Сортировка по убыванию
      return sortedArr.sort((a, b) => {
        const aValue = a[sortConfig.sortField];
        const bValue = b[sortConfig.sortField];
        
        if (typeof aValue !== 'number' && typeof bValue !== 'number') {
          // Если оба значения не являются числами, сортируем как строки
          return bValue.localeCompare(aValue);
        }

        // Если хотя бы одно значение является числом, сравниваем числа
        return bValue - aValue;
      });
    } else {
      // Сортировка по возрастанию
      return sortedArr.sort((a, b) => {
        const aValue = a[sortConfig.sortField];
        const bValue = b[sortConfig.sortField];
        
        if (typeof aValue !== 'number' && typeof bValue !== 'number') {
          // Если оба значения не являются числами, сортируем как строки
          return aValue.localeCompare(bValue);
        }

        // Если хотя бы одно значение является числом, сравниваем числа
        return aValue - bValue;
      });
    }
  } catch (error) {
    console.error('Ошибка сортировки:', error);
    return arr;
  }
}

export function findSortConfigByField(arr, sortField) {
  return arr.find(item => item.sortField === sortField);
}

