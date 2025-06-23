# Image Hosting API for ShareX

This is a simple image hosting API that can be used with ShareX for uploading images. It uses local storage for image storage and can be deployed to any server, including Google Cloud VM.

## Features

- Image upload endpoint with authentication
- Local storage for uploaded images
- CORS enabled
- Ready for deployment on any server
- ShareX compatible

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and fisudo systemctl reload nginxll in your upload secret and (optionally) BASE_URL
4. Start the server:
   ```bash
   npm start
   ```

## ShareX Configuration

1. Open ShareX
2. Go to `Destinations` → `Custom uploader settings`
3. Create a new uploader with these settings:
   - Method: POST
   - Request URL: `http://your-api-url/upload`
   - Body: Form data
   - File form name: `image`
   - Headers:
     ```
     Authorization: your_upload_secret
     ```
4. Test the connection to ensure it works

## Deployment

You can deploy this server to any VM or hosting provider (e.g., Google Cloud VM, DigitalOcean, etc.). Make sure the `/uploads` directory exists and is writable.

Set the environment variables as needed:
- `UPLOAD_SECRET`: Secret key for authenticating uploads
- `PORT`: Server port (default: 3000)
- `BASE_URL`: (Optional) The base URL for generating image links

## API Endpoints

### POST /upload
Upload an image file.

Headers:
- `Authorization`: Your upload secret key

Body:
- `image`: Image file (multipart/form-data)

Response:
```json
{
  "success": true,
  "url": "http://your-api-url/uploads/your_image.jpg"
}
```
