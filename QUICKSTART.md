## Image Poster - Quick Start Guide

### Local Development Setup

1. Clone the repository
2. Set up the backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
3. Set up the frontend (in a new terminal):
   ```bash
   cd frontend
   npm install
   npm start
   ```
4. Open http://localhost:3000 in your browser

### Docker Setup

To run the entire application using Docker:

```bash
docker-compose up -d
```

Access the application at http://localhost

### Basic Usage

1. Enter a valid URL (starting with http:// or https://) in the input field
2. Click "Generate Image"
3. Wait for the image to be processed
4. Use the "Download Image" or "Copy to Clipboard" buttons to save the result

### Common Issues

- **Clipboard API not working**: Make sure you're using a modern browser and the site is served over HTTPS or localhost
- **URL validation errors**: Ensure URLs start with http:// or https://
- **Image not found**: The website might not have metadata images available

### Testing

Run backend tests:
```bash
cd backend
npm test
```

Run frontend tests:
```bash
cd frontend
npm test
```
