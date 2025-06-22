# Image Hosting API for ShareX

This is a simple image hosting API that can be used with ShareX for uploading images. It uses Cloudinary for image storage and can be deployed to Heroku.

## Features

- Image upload endpoint with authentication
- Cloudinary integration for reliable image storage
- CORS enabled
- Ready for Heroku deployment
- ShareX compatible

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and fill in your Cloudinary credentials and upload secret
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

## Heroku Deployment

1. Create a new Heroku app
2. Set the environment variables in Heroku:
   ```bash
   heroku config:set CLOUDINARY_CLOUD_NAME=your_cloud_name
   heroku config:set CLOUDINARY_API_KEY=your_api_key
   heroku config:set CLOUDINARY_API_SECRET=your_api_secret
   heroku config:set UPLOAD_SECRET=your_secret_key
   ```
3. Deploy to Heroku:
   ```bash
   git push heroku main
   ```

## Environment Variables

- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Your Cloudinary API key
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
- `PORT`: Server port (default: 3000)
- `UPLOAD_SECRET`: Secret key for authenticating uploads

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
  "url": "https://res.cloudinary.com/..."
}
```

### GET /health
Health check endpoint.

Response:
```json
{
  "status": "OK"
}
```
