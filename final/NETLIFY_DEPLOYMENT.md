# Deploying to Netlify (Frontend) with Separate Backend

This guide explains how to deploy the M-Kite Kitchen frontend to Netlify while hosting the backend separately.

## Overview

In this approach:
1. The React frontend is deployed to Netlify
2. The Express backend is deployed to a separate host (like Render or Heroku)
3. The frontend makes API calls to the separately hosted backend

## Frontend Deployment to Netlify

### Prerequisites
- A [Netlify](https://www.netlify.com/) account
- Your M-Kite Kitchen repository on GitHub, GitLab, or Bitbucket

### Step 1: Prepare Your Frontend

1. Create a `.env.production` file in the project root with:
   ```
   VITE_API_BASE_URL=https://your-backend-url.com
   ```
   Replace `https://your-backend-url.com` with the URL where your backend will be hosted.

2. Create a `netlify.toml` file in the project root:
   ```toml
   [build]
     command = "npm run build"
     publish = "dist/public"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### Step 2: Deploy to Netlify

1. Log in to Netlify.
2. Click "Add new site" > "Import an existing project".
3. Connect to your Git provider and select your repository.
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist/public`
5. Click "Deploy site".

### Step 3: Configure Environment Variables

1. In the Netlify dashboard, go to Site settings > Build & deploy > Environment.
2. Add the environment variable:
   - Key: `VITE_API_BASE_URL`
   - Value: Your backend URL

## Backend Deployment (Render)

Follow the instructions in the main DEPLOYMENT.md file to deploy just the backend portion to Render, or follow these simplified steps:

1. In the Render dashboard, create a new Web Service.
2. Connect your GitHub repository.
3. Configure the service:
   - Name: `mkite-kitchen-api`
   - Build Command: `bash .build.sh`
   - Start Command: `bash .run.sh`
4. Add environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `CORS_ORIGIN`: Your Netlify frontend URL (e.g., `https://mkite-kitchen.netlify.app`)
5. Click "Create Web Service".

## Updating the Backend for CORS

You'll need to modify the backend to accept requests from your Netlify domain:

1. Install the CORS package:
   ```
   npm install cors
   ```

2. Update your server/index.ts file to include CORS configuration:

```typescript
import cors from 'cors';

// ...

// Use CORS middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));

// ...
```

## Testing the Deployment

1. After both the frontend and backend are deployed, visit your Netlify URL.
2. Test all functionality that requires API calls to the backend:
   - Contact form submissions
   - Newsletter subscriptions
   - Admin access to view submissions and subscribers

## Troubleshooting

### CORS Issues
If you're seeing CORS errors in the browser console:
1. Verify that the `CORS_ORIGIN` environment variable on the backend is set correctly.
2. Check that the backend CORS configuration is working properly.

### API Connection Issues
If the frontend can't connect to the backend:
1. Ensure the `VITE_API_BASE_URL` is correctly set in Netlify.
2. Verify the backend is running and accessible at the provided URL.

### Build Failures
If the build fails on Netlify:
1. Check the build logs for errors.
2. Ensure all dependencies are correctly specified.
3. Verify the build command and publish directory are set correctly.