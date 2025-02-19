export function getImageSize(imagePath) {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => resolve({ width: img.width, height: img.height })
    img.onerror = () => resolve(null)
    img.src = imagePath
  })
} 

export function getVideoSize(videoPath) {
  return new Promise((resolve) => {
      const video = document.createElement('video');
      
      video.addEventListener('loadedmetadata', () => {
          resolve({
              width: video.videoWidth,
              height: video.videoHeight
          });
      });

      video.onerror = () => resolve(null);
      video.src = videoPath;
  });
}