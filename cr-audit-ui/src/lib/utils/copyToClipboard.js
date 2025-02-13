import { formatDate } from '@/lib/utils/FormattingDates'

// Создаем текст для копирования
export const getTextToCopy = (creative, updatedMedia) => {
  const text = [
    `<div>ID заявки: ${creative?.idApplication}</div>`,
    `<div>Адгруппа: ${creative?.nameAdGroup}</div>`,
    `<div>Статус: ${creative?.status}</div>`,
    `<div>Тип: ${creative?.type}</div>`,
    `<div>Рекламный кабинет: ${creative?.account}</div>`,
    `<div>Рекламодатель: ${creative?.advertiser}</div>`,
    `<div>Дата проверки: ${formatDate(creative?.dateAudit, 'DD.MM.YYYY')}</div>`,
    `<div>Дата направления на проверку: ${formatDate(creative?.dateCreat, 'DD.MM.YYYY')}</div>`,
  ]

  if (creative?.linkData?.comment) {
    text.push(
      `<div style="margin-top: 24px"><strong>Ссылка на посадочную:</strong> 
         <a href="${creative?.link}" target="_blank">${creative?.link}</a>
        </div>`,
    );
    text.push(`<div style="white-space: pre-wrap">${creative?.linkData?.comment}\n</div>\n`);
  }

  updatedMedia.forEach(item => {
    if (item.comment) {
      text.push(
        `<div style="margin-top: 24px"><strong>Креатив ${item?.mediaName}, ${item?.size?.width}x${item?.size?.height}:</strong></div>`
      )
      text.push(`<div style="white-space: pre-wrap">${item?.comment}\n</div>\n`)
    }
  })

  return text.join('\n')
}

// Копируем в буфер обмена
export const copyToClipboard = async (creative, updatedMedia) => {
  try {
    const formattedText = getTextToCopy(creative, updatedMedia)

    const blob = new Blob([formattedText], { type: 'text/html' })
    const clipboardItem = new ClipboardItem({
      'text/html': blob,
    })

    await navigator.clipboard.write([clipboardItem])

    alert('Текст скопирован в буфер обмена!')
  } catch (err) {
    console.error('Ошибка при копировании:', err)
    alert('Произошла ошибка при копировании')
  }
}
