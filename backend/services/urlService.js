const axios = require('axios');
const cheerio = require('cheerio');
const { createCanvas, loadImage } = require('canvas');
const imageService = require('./imageService');

/**
 * Extract metadata image from URL and process it
 */
exports.processUrl = async (url) => {
  try {
    // Fetch the URL content
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }, // Mimic browser to avoid blocking
      timeout: 10000, // 10 seconds timeout
    });

    // Extract metadata
    const $ = cheerio.load(response.data);
    const metaImage = extractMetaImage($);

    if (!metaImage) {
      return {
        success: false,
        message: 'No metadata image found in the provided URL'
      };
    }

    // Process the image
    const base64Image = await imageService.processImage(metaImage);

    return {
      success: true,
      imageData: base64Image,
      mimeType: 'image/png'
    };

  } catch (error) {
    console.error('Error processing URL:', error.message);
    
    if (error.code === 'ECONNABORTED') {
      return {
        success: false,
        message: 'Request timed out while trying to fetch the URL'
      };
    }
    
    if (error.response) {
      return {
        success: false,
        message: `Failed to fetch URL: HTTP ${error.response.status}`
      };
    }

    return {
      success: false,
      message: 'Failed to process the URL'
    };
  }
};

/**
 * Extract metadata image from HTML using cheerio
 */
function extractMetaImage($) {
  // Check for Open Graph image
  const ogImage = $('meta[property="og:image"]').attr('content');
  if (ogImage) return ogImage;
  
  // Check for Twitter image
  const twitterImage = $('meta[name="twitter:image"]').attr('content');
  if (twitterImage) return twitterImage;
  
  // Check for regular link tag with image rel
  const relImage = $('link[rel="image_src"]').attr('href');
  if (relImage) return relImage;
  
  // Check for schema.org image
  const schemaImage = $('meta[itemprop="image"]').attr('content');
  if (schemaImage) return schemaImage;
  
  // If nothing else, look for the first image of reasonable size
  const images = $('img').toArray();
  for (const img of images) {
    const src = $(img).attr('src');
    const width = parseInt($(img).attr('width'), 10);
    if (src && width && width >= 200) {
      return src;
    }
  }
  
  return null;
}
