import { z } from 'zod';

import { resolveTenant } from '../core/tenant';
import { CommonContent, PaginatedContentResponse } from '../types/content';

/**
 * Options for creating a paginated service
 */
export interface PaginatedServiceOptions<T extends CommonContent> {
  route: string;
  mock?: T[];
  collection: string;
  schema: z.ZodType<any>;
}

/**
 * Standard response format for paginated endpoints
 */
export interface PaginatedResponse<T extends CommonContent>
  extends PaginatedContentResponse<T> {
  items: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

/**
 * Creates a service for handling paginated data
 * @template T The type of data being handled
 */
export function createPaginatedService<T extends CommonContent>(
  options: PaginatedServiceOptions<T>
) {
  const { route, mock, collection, schema } = options;

  /**
   * Lists items with pagination
   */
  const list = async (
    tenant?: string,
    page = 1,
    limit = 10,
    language?: string
  ): Promise<PaginatedResponse<T>> => {
    try {
      // Use provided tenant or default from environment
      const currentTenant = tenant || resolveTenant();

      // Construct API URL with query parameters
      const apiUrl = new URL(`/api${route}`, window.location.origin);
      apiUrl.searchParams.set('page', page.toString());
      apiUrl.searchParams.set('limit', limit.toString());
      apiUrl.searchParams.set('tenant', currentTenant);

      if (language) {
        apiUrl.searchParams.set('lang', language);
      }

      // Fetch data from API
      const response = await fetch(apiUrl.toString());

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const responseData = await response.json();

      // Handle different API response structures (items, posts, projects)
      const items =
        responseData.items ?? responseData.posts ?? responseData.projects;

      if (!items) {
        throw new Error('Invalid response format: missing items array');
      }

      // Validate response data against schema
      const validItems = items.map((item: any) => {
        try {
          return schema.parse(item);
        } catch (e) {
          console.warn(`Validation failed for item ${item.id}:`, e);
          return item;
        }
      });

      return {
        items: validItems,
        totalPages: responseData.totalPages || 1,
        currentPage: responseData.currentPage || 1,
        totalItems: responseData.totalItems || validItems.length,
      };
    } catch (error) {
      console.error('Error fetching paginated data:', error);

      // Fallback to mock data if available
      if (mock) {
        console.log('Using mock data as fallback');
        const start = (page - 1) * limit;
        const filteredMocks = language
          ? mock.filter(
              (item) =>
                item.language === language ||
                (!item.language && language === 'en')
            )
          : mock;

        return {
          items: filteredMocks.slice(start, start + limit),
          totalPages: Math.ceil(filteredMocks.length / limit),
          currentPage: page,
          totalItems: filteredMocks.length,
        };
      }

      throw error;
    }
  };

  /**
   * Gets a single item by ID
   */
  const byId = async (
    tenant?: string,
    id?: string,
    language?: string
  ): Promise<T> => {
    if (!id) {
      throw new Error('ID is required');
    }

    try {
      // Use provided tenant or default from environment
      const currentTenant = tenant || resolveTenant();

      // Construct API URL with query parameters
      const apiUrl = new URL(`/api${route}/${id}`, window.location.origin);
      apiUrl.searchParams.set('tenant', currentTenant);

      if (language) {
        apiUrl.searchParams.set('lang', language);
      }

      // Fetch data from API
      const response = await fetch(apiUrl.toString());

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      // Validate response data against schema
      try {
        return schema.parse(data);
      } catch (e) {
        console.warn(`Validation failed for item ${id}:`, e);
        return data as T;
      }
    } catch (error) {
      console.error(`Error fetching item with ID ${id}:`, error);

      // Fallback to mock data if available
      if (mock) {
        console.log('Using mock data as fallback');
        const mockItem = mock.find(
          (item) =>
            item.id === id &&
            (!language ||
              item.language === language ||
              (!item.language && language === 'en'))
        );

        if (mockItem) {
          return mockItem;
        }

        // Try fallback to English if requested language isn't available
        if (language && language !== 'en') {
          const fallbackItem = mock.find(
            (item) =>
              item.id === id && (item.language === 'en' || !item.language)
          );

          if (fallbackItem) {
            return {
              ...fallbackItem,
              langUsed: 'en',
            } as T;
          }
        }
      }

      throw error;
    }
  };

  /**
   * Return the public API
   */
  return {
    list,
    byId,
    route,
    collection,
  };
}
