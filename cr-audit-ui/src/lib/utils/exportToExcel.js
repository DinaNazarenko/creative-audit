import * as XLSX from 'xlsx';

export const exportToExcel = async (sortedCreatives) => {
  // Создаем данные для Excel
  const data = sortedCreatives.map(item => ({
    'ID заявки': item.idApplication,
    'Название адгруппы': item.nameAdGroup,
    'Статус': item.status,
    'Тип': item.type,
    'Название креатива': item.name
  }));

  // Создаем лист Excel
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Создаем рабочую книгу Excel
  const workbook = XLSX.utils.book_new();
  
  // Добавляем лист в рабочую книгу
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Создаем Blob из рабочей книги
  const buffer = XLSX.write(workbook, { bookType: 'xls', type: 'buffer' });

  // Создаем Blob из буфера
  const blob = new Blob([buffer], {
    type: 'application/vnd.ms-excel'
  });  

  // Создаем URL для скачивания файла
  const url = URL.createObjectURL(blob);

  // Открываем файл в новой вкладке
  window.open(url, '_blank');
};
