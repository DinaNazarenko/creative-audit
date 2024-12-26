export function sortArrayByObject(arr, sortConfig) {
  if (!arr || !sortConfig || !sortConfig.sortField) {
    return arr
  }

  try {
    const sortedArr = [...arr]

    if (sortConfig.sortOrder) {
      // Сортировка по убыванию
      return sortedArr.sort((a, b) => {
        const aValue = a[sortConfig.sortField]
        const bValue = b[sortConfig.sortField]

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          // Оба значения - числа, сортируем по числовому значению
          return bValue - aValue
        } else if (typeof aValue === 'object' || typeof bValue === 'object') {
          // Хотя бы один - объект, сортируем по числовому значению ключа days
            return (bValue.days || 0) - (aValue.days || 0);
        } else {
          // Иначе сортируем как строки
          return bValue.localeCompare(aValue)
        }
      })
    } else {
      // Сортировка по возрастанию
      return sortedArr.sort((a, b) => {
        const aValue = a[sortConfig.sortField]
        const bValue = b[sortConfig.sortField]

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          // Оба значения - числа, сортируем по числовому значению
          return aValue - bValue
        } else if (typeof aValue === 'object' || typeof bValue === 'object') {
          // Хотя бы один - объект, сортируем по числовому значению ключа days
          return (aValue.days || 0) - (bValue.days || 0);
        } else {
          // Иначе сортируем как строки
          return aValue.localeCompare(bValue)
        }
      })
    }
  } catch (error) {
    console.error('Ошибка сортировки:', error)
    return arr
  }
}

export function findSortConfigByField(arr, sortField) {
  return arr.find(item => item.sortField === sortField)
}
