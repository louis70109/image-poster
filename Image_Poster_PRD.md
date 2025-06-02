# Image Poster Product Requirements Document (PRD)

## Overview
The Image Poster application allows users to input a URL and receive a 960px × 1080px image with the website's metadata image centered within it. The final image can be downloaded or copied directly to the clipboard.

## Requirements Specification

### 1. User Interface
#### 1.1 URL Input Component
- The application shall provide a text input field where users can enter a website URL.
- The input field should be clearly visible on the landing page.
- Placeholder text should indicate the expected format (e.g., "https://www.example.com").
- A submission button labeled "Generate Image" shall be displayed next to the input field.

#### 1.2 Input Validation
- The application shall validate the URL format before submission.
- Valid URL formats include:
  - Must start with "http://" or "https://"
  - Must contain a domain name with valid TLD
  - May contain subdomains, paths, query parameters, etc.
- If an invalid URL is entered, the application shall display an error message indicating the format issue.
- The submission button shall be disabled until a valid URL is entered.

#### 1.3 Loading State
- Upon submission, the application shall display a loading indicator to notify the user that the request is being processed.
- The loading indicator should provide visual feedback on the process status.

#### 1.4 Result Display
- After processing, the application shall display the generated 960px × 1080px image.
- A preview of the image shall be shown directly on the page.
- Two action buttons shall be displayed below the image:
  - "Download Image" button
  - "Copy to Clipboard" button

### 2. Backend Processing
#### 2.1 URL Submission Handler
- The frontend shall send the validated URL to the backend server via a secure API endpoint.
- The API endpoint shall accept POST requests with the URL as a parameter.
- The server shall perform additional validation of the received URL.

#### 2.2 Metadata Extraction
- The server shall visit the submitted URL and extract the website's metadata.
- The server shall specifically look for og:image, twitter:image, and other standard image metadata tags.
- If multiple metadata images are found, the server shall select the highest resolution image or the first one found (priority logic to be defined).
- If no metadata image is found, the server shall return an appropriate error message.

#### 2.3 Image Processing
- The server shall download the metadata image from its source.
- The server shall create a blank canvas with dimensions of exactly 960px × 1080px.
- The server shall resize the metadata image while preserving its aspect ratio so that:
  - If the image is wider than tall, its width will fit within the canvas width.
  - If the image is taller than wide, its height will fit within the canvas height.
  - In either case, the image shall maintain its original aspect ratio.
- The resized image shall be centered both horizontally and vertically on the 960px × 1080px canvas.
- The background of the canvas shall be white or transparent (to be decided).

#### 2.4 Image Encoding
- After processing, the server shall convert the final image into a base64 string.
- The server shall return this base64 string to the frontend along with appropriate HTTP status codes.
- The response shall include a MIME type (image/png or image/jpeg) to inform the frontend about the image format.

### 3. Frontend Image Handling
#### 3.1 Receiving the Image
- The frontend shall receive the base64 encoded image from the server.
- The frontend shall decode the base64 string and display the image in the result section.

#### 3.2 Download Functionality
- The "Download Image" button shall trigger the browser's download mechanism.
- The downloaded file shall have a meaningful name (e.g., "image-poster-[timestamp].png").
- The downloaded image shall be in PNG or JPEG format.

#### 3.3 Copy to Clipboard Functionality
- The "Copy to Clipboard" button shall copy the image directly to the user's clipboard.
- The application shall use modern Web APIs (Clipboard API) to enable this functionality.
- After successful copying, a confirmation message shall appear (e.g., "Image copied to clipboard").
- If copying fails due to browser restrictions, an appropriate error message shall guide the user on how to proceed.

### 4. Error Handling
#### 4.1 Frontend Error Handling
- The application shall display user-friendly error messages for all possible error scenarios.
- Common error scenarios to handle include:
  - Invalid URL format
  - Network connection issues
  - Browser clipboard permission denied

#### 4.2 Backend Error Handling
- The server shall implement proper error handling for all processes.
- The server shall return appropriate HTTP status codes along with descriptive error messages.
- Common error scenarios to handle include:
  - Unreachable URL
  - No metadata image found
  - Metadata image unreachable
  - Image processing failures

### 5. Performance Requirements
#### 5.1 Response Time
- The entire process from URL submission to image display should not take more than 10 seconds under normal network conditions.
- If the processing is expected to take longer, the application shall provide feedback on the progress.

#### 5.2 Concurrent Requests
- The server shall handle multiple concurrent requests efficiently.
- The application shall implement appropriate rate limiting to prevent abuse.

### 6. Compatibility
#### 6.1 Browser Compatibility
- The application shall work on the latest versions of Chrome, Firefox, Safari, and Edge.
- For older browser versions, the core functionality shall work, but clipboard copying may be disabled with appropriate messaging.

#### 6.2 Device Compatibility
- The application shall be responsive and work on desktop and mobile devices.
- The UI shall adjust appropriately for different screen sizes.

### 7. Security Considerations
#### 7.1 URL Validation
- The server shall validate and sanitize all incoming URLs to prevent injection attacks.
- The server shall implement proper CORS policies.

#### 7.2 Image Processing Security
- The server shall implement timeouts for external image fetching to prevent hanging processes.
- The server shall limit the size of images it will process to prevent resource exhaustion attacks.

### 8. Implementation Flow Diagram
```
+----------------+    +----------------+    +-------------------+
| User enters URL |--->| URL validation |--->| Send URL to server|
+----------------+    +----------------+    +-------------------+
                                                       |
+--------------------+    +-------------------+    +---v-------------+
| Download or copy   |<---| Display processed |<---| Extract metadata|
| final image        |    | image to user     |    | image from URL  |
+--------------------+    +-------------------+    +-----------------+
                                                       |
                      +---------------------------+    |
                      | Center image in           |<---+
                      | 960px × 1080px canvas     |
                      +---------------------------+
                                 |
                      +----------v--------------+
                      | Convert to base64 and   |
                      | send back to frontend   |
                      +-------------------------+
```

## Technical Implementation Notes

### Frontend Stack
- Consider using React or Vue.js for UI components
- Use Fetch API or Axios for API calls
- Implement form validation using built-in validation or libraries like Formik/Yup
- Use the HTML5 Canvas API or image processing libraries for client-side operations
- Implement the Clipboard API for copying functionality

### Backend Stack
- Node.js with Express or Python with FastAPI/Flask are recommended
- Use cheerio (Node.js) or Beautiful Soup (Python) for HTML parsing and metadata extraction
- Use image processing libraries:
  - Node.js: Sharp, Jimp, or Canvas
  - Python: Pillow (PIL) or OpenCV
- Implement proper rate limiting and request validation middleware

### Deployment Considerations
- Implement a caching system for frequently requested URLs
- Consider serverless deployment for cost efficiency in handling sporadic loads
- Ensure adequate memory allocation for image processing operations

## Success Metrics
- User completion rate: percentage of users successfully generating and downloading/copying images
- Average processing time
- Error rate by error type
- User satisfaction through feedback mechanisms

## Future Enhancements
- Allow users to customize the background color or pattern of the canvas
- Provide options for different output image dimensions
- Support multiple image formats (PNG, JPEG, WebP)
- Allow users to add text overlays or simple graphics to the generated image
- Implement social sharing functionality for the generated images
