# Rubrion Web Client Template - Data Services Documentation

## Overview

This document provides an overview of the data services implementation in the Rubrion Web Client Template. The goal of this implementation is to provide a unified data layer that works seamlessly with both mock data and real data from either a REST API or Firestore database.

## Architecture

The implementation follows a layered architecture:

```
┌───────────────────┐
│    UI Components  │
└─────────┬─────────┘
          │
┌─────────▼─────────┐
│    React Hooks    │
└─────────┬─────────┘
          │
┌─────────▼─────────┐
│  Service Layer    │
└─────────┬─────────┘
          │
┌─────────▼─────────┐
│  Data Sources     │
├───────────────────┤
│ MSW │ API │ Firebase │
└───────────────────┘
```

### Key Features

- **Environment-aware data fetching**: Uses mock data in development, real API or Firestore in production
- **Type-safe data models**: All data models are defined using Zod schemas
- **Unified API**: Same interface regardless of data source
- **Resilient fallbacks**: Falls back to mock data when API or Firestore fails
- **Pagination support**: Consistent pagination across all data sources
- **Legacy compatibility**: Maintains backward compatibility with existing code

## Configuration

The application's runtime behavior is controlled by environment variables and configuration flags:

```typescript
// Configuration flags determine data source
export const IS_MOCK =
  typeof window !== 'undefined' &&
  import.meta.env.DEV &&
  window.__IS_MSW_ACTIVE__ === true;

export const USE_FIRESTORE =
  getEnvVariable('VITE_USE_FIRESTORE') === 'true' && !IS_MOCK;
```

## Core Components

### 1. Data Models

Data models are defined using Zod schemas for type safety and validation:

- **BlogPost**: Blog post model with required fields like id, title, summary, and content
- **Project**: Project model with required fields like id, title, description, and content
- **ProjectReference**: Submodel for project references with title, URL, and type

### 2. Service Factory

The `createPaginatedService` function creates a paginated service for any data model:

```typescript
export function createPaginatedService<T extends { id: string }>(options) {
  // Options include route, mock data, collection name, and schema
  // Returns an object with list() and byId() methods
}
```

### 3. Data Sources

#### Mock Service Worker (MSW)

- Used in development environment
- Intercepts HTTP requests and returns mock data
- Supports pagination via query parameters
- Simulates API behavior with proper error handling

#### REST API

- Used in production when Firestore is disabled
- Fetches data from configurable API endpoints
- Supports standard pagination patterns
- Falls back to mock data when API fails

#### Firestore

- Used in production when enabled via `VITE_USE_FIRESTORE`
- Uses dynamic imports to avoid loading Firebase in environments where it's not used
- Implements efficient pagination using Firestore queries
- Handles document snapshots and data conversion

### 4. React Integration

React Query hooks provide a clean interface for components:

```typescript
// Hook for fetching paginated data
function useProjects(page = 1, limit = PAGINATION.DEFAULT_PAGE_SIZE) {
  return useQuery({...});
}

// Hook for fetching a single item
function useProject(id: string | undefined) {
  return useQuery({...});
}
```

## Data Flow

1. **Component Renders**: A React component renders and calls a data hook
2. **Hook Invokes Service**: The hook calls a service method with parameters
3. **Service Determines Source**: Based on configuration, the service decides which data source to use
4. **Data Fetching**: The service fetches data from the appropriate source
5. **Data Processing**: The fetched data is validated and transformed
6. **Return to Component**: The processed data is returned to the component via React Query

## Example Usage

### Legacy Approach (still supported)

```tsx
const [projects, setProjects] = useState<Project[]>([]);

useEffect(() => {
  const loadProjects = async () => {
    try {
      const data = await fetchProjects(page, limit);
      setProjects(data.projects);
      // ...
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  loadProjects();
}, [page, limit]);
```

### React Query Approach

```tsx
const projectsQuery = useProjects(page, limit);

if (projectsQuery.isLoading) {
  return <LoadingIndicator />;
}

if (projectsQuery.error) {
  return <ErrorMessage error={projectsQuery.error} />;
}

const projects = projectsQuery.data?.items || [];
```

## Implementation Files

### Configuration

- `config.ts`: Environment variables, feature flags, and runtime configuration

### Services

- `services/createPaginatedService.ts`: Factory function for creating paginated services
- `services/blog.ts`: Blog post service implementation
- `services/projects.ts`: Project service implementation
- `services/validators.ts`: Zod schemas for data validation

### Data Access

- `lib/fetcher.ts`: Utility function for making HTTP requests
- `lib/firestore.ts`: Firestore integration with pagination support

### Mock Data

- `mocks/browser.ts`: MSW browser setup
- `mocks/handlers.ts`: API route handlers for MSW
- `mocks/mockBlogPosts.ts`: Mock blog post data
- `mocks/mockProjects.ts`: Mock project data

### React Integration

- `hooks/useBlogPosts.ts`: React Query hooks for blog posts
- `hooks/useProjects.ts`: React Query hooks for projects

## Best Practices Implemented

1. **Progressive Enhancement**: Starts with mock data, can upgrade to real API or Firestore
2. **Graceful Degradation**: Falls back to mock data when external services fail
3. **Type Safety**: Uses TypeScript and Zod for type validation
4. **Clean API Design**: Consistent interfaces across all data sources
5. **Error Resilience**: Robust error handling and fallback mechanisms
6. **Code Splitting**: Dynamic imports for Firebase to reduce bundle size
7. **Backward Compatibility**: Legacy functions maintained for smooth transition

## Future Improvements

1. **Caching Strategy**: Implement more sophisticated caching strategies
2. **Offline Support**: Add offline support with IndexedDB or similar
3. **Real-time Updates**: Add Firestore real-time subscription support
4. **Search Integration**: Add search functionality with proper API abstraction
5. **Optimistic Updates**: Implement optimistic UI updates for mutations
6. **Batch Operations**: Add support for batch fetching and operations

## Conclusion

This implementation provides a solid foundation for data management in the application. It enables seamless development with mock data while supporting production deployment with real data sources. The architecture is flexible and can be extended to support additional features as needed.
