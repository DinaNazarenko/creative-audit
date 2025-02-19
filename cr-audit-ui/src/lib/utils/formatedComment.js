import { getImageSize, getVideoSize } from '@/lib/utils/getSize'

export const formatedComment = async creative => {
  const result = {}

  if (creative.linkData?.comment) {
    result.linkData = creative.linkData
  }

  if (creative.media) {
    const commentedMedia = creative.media.filter(mediaItem => mediaItem.comment)
    const mediaArray = commentedMedia.map(item => ({
      ...item,
      size: item?.size || [],
    }))
    commentedMedia.splice(0, commentedMedia.length, ...mediaArray)

    try {
      for (const item of commentedMedia) {
        if (item.mediaName) {
          const url = item?.type === 'video'
              ? `/videos/${item?.mediaName}`
              : `/images/${item?.mediaName}`

          const resultSize = await (item?.type === 'video'
            ? getVideoSize(url)
            : getImageSize(url))
            
          item.size = resultSize
        }
      }
    } catch (error) {
      console.error('Ошибка при получении размера media:', error)
    }
    result.media = commentedMedia
  }

  result.count = result?.media?.length + (result?.linkData ? 1 : 0)
  return result
}

function truncateBeforeColon(text) {
  const colonIndex = text.indexOf(':')

  if (colonIndex !== -1) {
    return text.slice(0, colonIndex) + '...'
  }

  return text
}

export const getTextToComment = async itemCReative => {
  const text = []
  let count = 3
  let creative = await formatedComment(itemCReative)

  if (creative?.linkData?.comment) {
    count -= 1

    text.push(`Ссылка на посадочную:`)
    text.push(`${truncateBeforeColon(creative?.linkData?.comment)}\n`)
  }

  creative?.media?.slice(0, count).forEach(item => {
    if (item.comment) {
      text.push(
        `${item?.mediaName}, ${item?.size?.width}x${item?.size?.height}:`,
      )
      text.push(`${truncateBeforeColon(item?.comment)}\n`)
    }
  })

  if (creative.count > 3) {
    text.push(`...`)
  }

  return text.join('\n')
}
