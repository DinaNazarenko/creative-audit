import { intervalToDuration, differenceInDays } from 'date-fns'

// Сохранение формата ISO 8601 с часовым поясом
export const getTimezoneOffset = () => {
  const offset = new Date().getTimezoneOffset();
  const hours = Math.floor(Math.abs(offset) / 60);
  const minutes = Math.abs(offset) % 60;
  return (offset <= 0 ? '+' : '-') + 
         String(hours).padStart(2, '0') + ':' + 
         String(minutes).padStart(2, '0');
};

// Функция для форматирования дат к виду DD.MM.YYYY или DD.MM.YYYY HH:mm:ss
export function formatDate(date, dateFormat) {
  if (!date) return '—'

  let year, month, day, hours, minutes, seconds

  if (typeof date === 'string') {
    const parts = date.split('-')
    year = parseInt(parts[0], 10)
    month = parseInt(parts[1], 10) - 1
    day = parseInt(parts[2].split('T')[0], 10)

    const timeParts = parts[2].split('T')[1]
    hours = parseInt(timeParts.split(':')[0], 10)
    minutes = parseInt(timeParts.split(':')[1], 10)
    seconds = parseInt(timeParts.split(':')[2].split('.')[0], 10)
  } else {
    // Если это объект Date
    const dateObj = new Date(date)
    year = dateObj.getFullYear()
    month = dateObj.getMonth()
    day = dateObj.getDate()

    const timeParts = dateObj.toTimeString().split(' ')[0].split(':')
    hours = parseInt(timeParts[0], 10)
    minutes = parseInt(timeParts[1], 10)
    seconds = parseInt(timeParts[2].split('.')[0], 10)
  }

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }

  const options2 = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }

  let formattedDate

  if (dateFormat === 'DD.MM.YYYY') {
    formattedDate = new Date(year, month, day).toLocaleDateString('ru-RU')
  } else if (dateFormat === 'DD.MM.YYYY HH:mm:ss') {
    formattedDate = new Date(
      year,
      month,
      day,
      hours,
      minutes,
      seconds,
    ).toLocaleDateString('ru-RU', options)
  } else if (dateFormat === 'DD.MM.YYYY HH:mm') {
    formattedDate = new Date(
      year,
      month,
      day,
      hours,
      minutes,
    ).toLocaleDateString('ru-RU', options2)
  } else {
    throw new Error(`Неправильный формат даты: ${dateFormat}`)
  }

  return formattedDate.replace(',', '')
}

// Функция расчета времени между двумя датами
export function calculateTimeBetweenDates(startDate, endDate, dateFormat) {
  if (!startDate || !endDate) return '—'

  const start = new Date(startDate)
  const end = new Date(endDate)

  const duration = intervalToDuration({ start, end })
  const days = differenceInDays(end, start) % 365

  let formattedDate

  if (dateFormat === 'DD HH') {
    formattedDate = { days: Number(days), hours: Number(duration.hours) }
  } else if (dateFormat === 'DD') {
    formattedDate = Number(days)
  } else {
    throw new Error(`Неправильный формат даты: ${dateFormat}`)
  }

  return formattedDate
}
