# M-Kite Kitchen Website

A modern, responsive web application for M-Kite Kitchen that provides an immersive digital experience for exploring and customizing aluminum modular kitchen products. The website highlights M-Kite's 25+ years of experience in developing innovative, sustainable aluminum kitchens that outperform traditional wood and MDF options.

## Features

- **Modern Design**: Clean, responsive layout optimized for all devices
- **Interactive Sections**: Hero, Features, Benefits, Gallery, Comparison, Testimonials, and more
- **Contact Form**: User-friendly form for customer inquiries, with data stored in a PostgreSQL database
- **Newsletter Subscription**: Email collection for marketing purposes
- **Admin Dashboard**: Backend access to view submitted contact forms and newsletter subscriptions

## Tech Stack

- **Frontend**: React with TypeScript, TailwindCSS, shadcn/ui components
- **Backend**: Express.js server with REST API endpoints
- **Database**: PostgreSQL (with fallback to in-memory storage when unavailable)
- **State Management**: React Query for server state, React Hook Form for forms
- **Deployment**: Configured for deployment on Render and Netlify

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database (optional, falls back to in-memory storage if unavailable)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file with the following variables:
     ```
     DATABASE_URL=postgres://username:password@localhost:5432/dbname
     ```
4. Start the development server:
   ```
   npm run dev
   ```

## Database Setup

The application supports two storage options:

1. **PostgreSQL** (recommended for production): Set the `DATABASE_URL` environment variable
2. **In-memory Storage** (for development): Used automatically when no `DATABASE_URL` is provided

To initialize the database tables:
```
npm run db:push
```

## API Endpoints

- `POST /api/contact` - Submit contact form
- `POST /api/subscribe` - Subscribe to newsletter
- `GET /api/admin/contacts` - Get all contact form submissions
- `GET /api/admin/newsletters` - Get all newsletter subscriptions

## Deployment Options

This project includes configuration for deploying to:

1. **Render**: Full-stack deployment with PostgreSQL database
   - See [DEPLOYMENT.md](DEPLOYMENT.md) for instructions

2. **Netlify**: Frontend-only deployment with separate backend
   - See [NETLIFY_DEPLOYMENT.md](NETLIFY_DEPLOYMENT.md) for instructions

## Data Migration

For migrating data between environments, use the provided scripts:

- Export data: `node scripts/export-database.js`
- Import data: `node scripts/import-database.js`

## License

This project is proprietary and confidential.

## About M-Kite Kitchen

M-Kite Kitchen has been revolutionizing modular kitchens with aluminum innovation for over 25 years. The company specializes in creating kitchens that last a lifetime—ones that are waterproof, termite-proof, and maintenance-free. Their premium aluminum modular kitchen cabinets eliminate all traditional kitchen drawbacks while offering unmatched strength, durability, and elegance.