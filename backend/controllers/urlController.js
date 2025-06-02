const urlService = require('../services/urlService');
const validator = require('validator');

/**
 * Controller to handle image generation from URLs
 */
exports.generateImage = async (req, res, next) => {
  try {
    const { url } = req.body;

    // Validate URL
    if (!url || !validator.isURL(url, { 
      protocols: ['http', 'https'], 
      require_protocol: true 
    })) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid URL format. URL must start with http:// or https://' 
      });
    }

    // Extract metadata and generate image
    const imageResult = await urlService.processUrl(url);
    
    if (!imageResult.success) {
      return res.status(404).json(imageResult);
    }

    return res.status(200).json(imageResult);
    
  } catch (error) {
    next(error);
  }
};
