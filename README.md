# Image Poster Application

Generate 960px × 1080px images from website metadata images.

## Project Overview

The Image Poster application allows users to input a URL and receive a 960px × 1080px image with the website's metadata image centered within it. The final image can be downloaded or copied directly to the clipboard.

## Features

- URL validation
- Website metadata image extraction
- Image processing (resize and center)
- Base64 image encoding/decoding
- Download and clipboard copy functionality

## Technology Stack

### Frontend
- React
- Axios for API calls
- Canvas API for image processing

### Backend
- Node.js with Express
- Cheerio for HTML parsing
- Canvas for image processing
- Axios for HTTP requests

## Project Structure

```
image-poster/
├── backend/               # Backend Node.js Express server
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Express middlewares
│   ├── services/          # Business logic
│   └── index.js           # Server entry point
├── frontend/              # React frontend
│   ├── public/
│   └── src/
│       ├── components/    # React components
│       ├── services/      # API services
│       └── utils/         # Utility functions
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

   For development with auto-restart:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with:
   ```
   REACT_APP_API_URL=http://localhost:3000/api
   ```

4. Start the development server:
   ```
   npm start
   ```

## API Endpoints

### POST /api/generate-image
Generate an image from a URL's metadata.

**Request Body:**
```json
{
  "url": "https://example.com"
}
```

**Success Response:**
```json
{
  "success": true,
  "imageData": "data:image/png;base64,...",
  "mimeType": "image/png"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Environment Variables

### Backend
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment ('development', 'production', 'test')

### Frontend
- `REACT_APP_API_URL` - Backend API URL

## Building for Production

### Backend
```
cd backend
npm install
```

### Frontend
```
cd frontend
npm install
npm run build
```

The build artifacts will be stored in the `frontend/build` directory.

## License
MIT
