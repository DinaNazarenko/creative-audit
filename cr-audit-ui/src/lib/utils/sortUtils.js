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
        
        if (typeof aValue !== 'string' || typeof bValue !== 'string') {
          return 0;
        }
        
        return bValue.localeCompare(aValue);
      });
    } else {
      // Сортировка по возрастанию
      return sortedArr.sort((a, b) => {
        const aValue = a[sortConfig.sortField];
        const bValue = b[sortConfig.sortField];
        
        if (typeof aValue !== 'string' || typeof bValue !== 'string') {
          return 0;
        }
        
        return aValue.localeCompare(bValue);
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

