const { createCanvas, loadImage } = require('canvas');

/**
 * Process the image to fit in a 960x1080 canvas
 */
exports.processImage = async (imageUrl) => {
  try {
    // Create a canvas with the specified dimensions
    const canvas = createCanvas(960, 1080);
    const ctx = canvas.getContext('2d');
    
    // Set background to white
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Load the image
    const image = await loadImage(imageUrl);

    // Calculate resizing and positioning
    const targetWidth = canvas.width;
    const targetHeight = canvas.height;
    
    // Calculate aspect ratio to maintain proportions
    const imageRatio = image.width / image.height;
    const canvasRatio = targetWidth / targetHeight;
    
    let newWidth, newHeight, x, y;
    
    if (imageRatio > canvasRatio) {
      // Image is wider than canvas ratio
      newWidth = targetWidth;
      newHeight = targetWidth / imageRatio;
      x = 0;
      y = (targetHeight - newHeight) / 2;
    } else {
      // Image is taller than canvas ratio
      newHeight = targetHeight;
      newWidth = targetHeight * imageRatio;
      x = (targetWidth - newWidth) / 2;
      y = 0;
    }
    
    // Draw the image on the canvas
    ctx.drawImage(image, x, y, newWidth, newHeight);
    
    // Convert canvas to base64 string
    const base64Image = canvas.toDataURL('image/png');
    
    return base64Image;
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error(`Failed to process image: ${error.message}`);
  }
};
