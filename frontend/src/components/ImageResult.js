import React from 'react';

const ImageResult = ({ imageData, onCopySuccess, onDownloadSuccess, onError }) => {
  
  const handleDownload = () => {
    try {
      // Create an anchor element for downloading
      const link = document.createElement('a');
      link.href = imageData.base64;
      link.download = `image-poster-${Date.now()}.png`; // Use timestamp for unique filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      onDownloadSuccess();
    } catch (error) {
      onError('Failed to download image');
      console.error('Download error:', error);
    }
  };
  
  const handleCopyToClipboard = async () => {
    try {
      // Convert base64 to blob
      const response = await fetch(imageData.base64);
      const blob = await response.blob();
      
      // Use Clipboard API to copy image
      await navigator.clipboard.write([
        new ClipboardItem({
          [imageData.mimeType]: blob
        })
      ]);
      
      onCopySuccess();
    } catch (error) {
      onError('Failed to copy image to clipboard. This feature may not be supported in your browser.');
      console.error('Clipboard error:', error);
    }
  };
  
  return (
    <div className="results-container">
      <img 
        src={imageData.base64} 
        alt="Generated image" 
        className="image-preview"
      />
      <div className="action-buttons">
        <button 
          className="action-button"
          onClick={handleDownload}
        >
          Download Image
        </button>
        <button 
          className="action-button"
          onClick={handleCopyToClipboard}
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};

export default ImageResult;
