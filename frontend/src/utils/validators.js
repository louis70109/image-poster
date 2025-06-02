/**
 * URL validator utility
 * @param {string} url - URL to validate
 * @returns {boolean} - Whether the URL is valid
 */
export const validateUrl = (url) => {
  try {
    // Check if URL is empty
    if (!url || url.trim() === '') {
      return false;
    }
    
    // Create URL object to validate format
    const urlObject = new URL(url);
    
    // Check protocol
    return urlObject.protocol === 'http:' || urlObject.protocol === 'https:';
  } catch (error) {
    // URL constructor throws an error if URL is invalid
    return false;
  }
};
