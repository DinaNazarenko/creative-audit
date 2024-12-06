import { utils } from 'xlsx';

export const exportToExcel = async (sortedCreatives) => {
  // Создаем данные для Excel
  const data = sortedCreatives

  console.log('exel', sortedCreatives)
  console.log('exel result', data)

  // Создаем лист Excel
  const worksheet = utils.json_to_sheet(data);

  // Создаем рабочую книгу Excel
  const workbook = utils.book_new();
  
  // Добавляем лист в рабочую книгу
  utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Создаем Blob из рабочей книги
  const blob = new Blob([workbook], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    name: 'exported_data.xlsx'
  });
  

  // Создаем URL для скачивания файла
  const url = URL.createObjectURL(blob);

  // Открываем файл в новой вкладке
  window.open(url, '_blank');
};
