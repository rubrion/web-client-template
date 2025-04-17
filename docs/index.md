# Rubrion Web Client Template Documentation

Welcome to the documentation for the Rubrion Web Client Template. This documentation provides an overview of the various components and features of the template.

## Table of Contents

- [Data Services](./data-services.md) - Documentation for the data service layer implementation
- Architecture Overview (coming soon)
- Component Library (coming soon)
- Routing System (coming soon)
- Internationalization (coming soon)
- Theming (coming soon)

## Getting Started

To get started with the Rubrion Web Client Template, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-org/rubrion-web-client-template.git
cd rubrion-web-client-template
npm install
```

Then start the development server:

```bash
npm run dev
```

## Environment Configuration

The application uses the following environment variables:

- `VITE_API_URL` - Base URL for the API
- `VITE_USE_FIRESTORE` - Set to 'true' to use Firestore instead of the REST API
- `VITE_FIREBASE_CONFIG` - JSON string containing Firebase configuration
- `VITE_ENABLE_ANALYTICS` - Set to 'true' to enable analytics
- `VITE_ENABLE_NEWSLETTER` - Set to 'true' to enable newsletter functionality
- `VITE_MAINTENANCE_MODE` - Set to 'true' to enable maintenance mode

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run test` - Run tests
- `npm run lint` - Run linting
