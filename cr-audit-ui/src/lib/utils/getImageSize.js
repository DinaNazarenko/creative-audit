export function getImageSize(imagePath) {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => resolve({ width: img.width, height: img.height })
    img.onerror = () => resolve(null)
    img.src = imagePath
  })
} 
