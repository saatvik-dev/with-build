# M-Kite Kitchen Website Deployment Guide (Updated)

This guide contains updated instructions for deploying the M-Kite Kitchen website to Render.com, addressing previous deployment issues.

## What's Changed

I've made several important updates to fix deployment issues on Render's free tier:

1. **Created a dedicated production server** (`server/production.ts`) that doesn't depend on Vite in production
2. **Updated build and run scripts** to correctly compile and run the application
3. **Renamed hidden script files** from `.build.sh` to `build.sh` and `.run.sh` to `run.sh` for better compatibility
4. **Modified render.yaml** with optimized build and start commands

## Prerequisites

- A [Render.com](https://render.com) account
- Git repository with your project code
- PostgreSQL database details from Replit (if migrating data)

## Option 1: Deploy using Render Blueprint (Recommended)

Render Blueprints make it easy to deploy applications with multiple services.

1. Fork or clone this repository to your own GitHub account.
2. Log in to your Render account.
3. Navigate to the Blueprints section in the Render dashboard.
4. Click "New Blueprint Instance".
5. Connect your GitHub account if you haven't already.
6. Select the repository containing the M-Kite Kitchen website.
7. Review the services that will be created (defined in `render.yaml`):
   - Web service: The website application
   - PostgreSQL database: For storing contact form submissions and newsletter subscribers
8. Click "Apply" to start the deployment process.
9. Once the deployment is complete, Render will provide you with a URL for your application.

## Option 2: Manual Deployment

### Database Setup

1. In the Render dashboard, create a new PostgreSQL database:
   - Go to "New" > "PostgreSQL"
   - Name: mkite-kitchen-db
   - Select the free plan (or an appropriate paid plan)
   - Click "Create Database"
2. Once created, copy the "Internal Database URL" from the database dashboard.

### Web Service Setup

1. In the Render dashboard, create a new Web Service:
   - Go to "New" > "Web Service"
   - Connect your GitHub repository
   - Name: mkite-kitchen
   - Build Command: Use this exactly as shown:
     ```
     npm install && npx vite build && mkdir -p server/public && cp -r client/dist/* server/public/ && npx esbuild server/production.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/production.js
     ```
   - Start Command: Use this exactly as shown:
     ```
     NODE_ENV=production node dist/production.js
     ```
   - Select the free plan (or an appropriate paid plan)
2. In the Environment section, add the following environment variable:
   - Key: `DATABASE_URL`
   - Value: Paste the internal database URL copied earlier
3. Click "Create Web Service" to start the deployment.

## Data Migration (Optional)

If you have existing data in your Replit PostgreSQL database that you want to migrate to Render:

1. Export the data from your Replit database:
   ```
   cd /path/to/your/project
   node scripts/export-database.js
   ```
   This will create JSON files with your data in the `database-export` directory.

2. After deploying to Render, import the data:
   - Download the exported JSON files from Replit
   - Upload them to your Render instance (or transfer them to a GitHub repository)
   - Run the import script:
     ```
     node scripts/import-database.js
     ```

## Post-Deployment Steps

1. Verify that your application is running by visiting the provided URL.
2. Check that all features are working correctly:
   - Contact form submissions
   - Newsletter subscriptions
   - Admin access to view submissions and subscribers

## Troubleshooting

- **Database Connection Issues**: Verify that the `DATABASE_URL` environment variable is set correctly.
- **Build Failures**: Check the build logs for errors and ensure all dependencies are correctly specified.
- **Runtime Errors**: Check the logs from your web service for any runtime errors.

For additional help, refer to the [Render documentation](https://render.com/docs) or contact the development team.