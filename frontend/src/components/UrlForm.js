import React, { useState } from 'react';
import { validateUrl } from '../utils/validators';

const UrlForm = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clear any previous validation errors
    setValidationError('');
    
    // Validate URL
    if (!validateUrl(url)) {
      setValidationError('Please enter a valid URL starting with http:// or https://');
      return;
    }
    
    // Call parent submit handler
    onSubmit(url);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    
    // Clear validation error when user types
    if (validationError) {
      setValidationError('');
    }
  };

  return (
    <form className="url-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="url-input"
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter website URL (https://example.com)"
          aria-label="URL input"
        />
        <button 
          type="submit" 
          className="submit-button"
          disabled={!url.trim()}
        >
          Generate Image
        </button>
      </div>
      
      {validationError && (
        <p className="error-message">{validationError}</p>
      )}
    </form>
  );
};

export default UrlForm;
