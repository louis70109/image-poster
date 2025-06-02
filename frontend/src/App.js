import React, { useState } from 'react';
import UrlForm from './components/UrlForm';
import ImageResult from './components/ImageResult';
import Notification from './components/Notification';
import { generateImage } from './services/apiService';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleUrlSubmit = async (url) => {
    setLoading(true);
    setError(null);
    setImageData(null);
    
    try {
      const result = await generateImage(url);
      
      if (result.success && result.imageData) {
        setImageData({
          base64: result.imageData,
          mimeType: result.mimeType || 'image/png'
        });
      } else {
        setError(result.message || 'Failed to generate image');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="container">
      <h1 className="app-title">Image Poster</h1>
      <UrlForm onSubmit={handleUrlSubmit} />
      
      {loading && (
        <div className="loading">
          <div className="loading-spinner"></div>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      
      {imageData && (
        <ImageResult 
          imageData={imageData} 
          onCopySuccess={() => showNotification('Image copied to clipboard!')}
          onDownloadSuccess={() => showNotification('Image downloaded successfully!')}
          onError={(msg) => setError(msg)}
        />
      )}
      
      {notification && <Notification message={notification} />}
    </div>
  );
}

export default App;
