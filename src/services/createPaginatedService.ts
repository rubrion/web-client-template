import { z } from 'zod';

import { API_BASE_URL, IS_MOCK, USE_FIRESTORE } from '../config';
import { fetchJson } from '../lib/fetcher';
import { getById, getPaginated } from '../lib/firestore';

/**
 * Generic paginated response interface
 */
export interface PaginatedResponse<T> {
  items: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

/**
 * Configuration options for creating a paginated service
 */
export interface PaginatedServiceOptions<T extends { id: string }> {
  /** API route path */
  route: string;
  /** Mock data array */
  mock: readonly T[];
  /** Firestore collection name */
  collection: string;
  /** Schema for validating items */
  schema: z.ZodType<T>;
}

/**
 * Creates a paginated service with list and getById methods
 *
 * This factory function creates a service that handles data fetching from
 * various sources (MSW mocks, REST API, or Firestore) based on configuration.
 *
 * @param options Service configuration options
 * @returns Service object with list and byId methods
 */
export function createPaginatedService<T extends { id: string }>(
  options: PaginatedServiceOptions<T>
) {
  const { route, mock, collection, schema } = options;

  /**
   * Get a paginated list of items
   *
   * @param page Page number (1-indexed)
   * @param limit Items per page
   * @returns Paginated response
   */
  async function list(page = 1, limit = 9): Promise<PaginatedResponse<T>> {
    // Normalize page number
    page = Math.max(1, page);

    if (IS_MOCK) {
      // Use mock data (already sorted newest→oldest)
      const start = (page - 1) * limit;
      const end = start + limit;
      const pageItems = mock.slice(start, end);

      return {
        items: pageItems,
        totalPages: Math.ceil(mock.length / limit),
        currentPage: page,
        totalItems: mock.length,
      };
    }

    if (USE_FIRESTORE) {
      // Use Firestore
      try {
        const response = await getPaginated<T>(collection, page, limit);

        // Validate items with schema
        const validatedItems = response.items.map((item) => {
          try {
            return schema.parse(item);
          } catch (error) {
            console.error(`Invalid ${collection} item:`, error);
            return item; // Return original if validation fails
          }
        });

        return {
          ...response,
          items: validatedItems,
        };
      } catch (error) {
        console.error(`Error fetching ${collection} from Firestore:`, error);
        // Fall back to mock data
        const start = (page - 1) * limit;
        const pageItems = mock.slice(start, start + limit);

        return {
          items: pageItems,
          totalPages: Math.ceil(mock.length / limit),
          currentPage: page,
          totalItems: mock.length,
        };
      }
    }

    // Use REST API
    try {
      const apiUrl = `${API_BASE_URL}${route}?page=${page}&limit=${limit}`;
      const response = await fetchJson<any>(apiUrl);

      // Map the response structure if needed
      // The API returns { posts/projects, totalPages, currentPage, totalItems }
      const items = response.posts || response.projects || [];

      // Validate items with schema
      const validatedItems = items.map((item: any) => {
        try {
          return schema.parse(item);
        } catch (error) {
          console.error(`Invalid ${collection} item from API:`, error);
          return item; // Return original if validation fails
        }
      });

      return {
        items: validatedItems,
        totalPages: response.totalPages || 1,
        currentPage: response.currentPage || page,
        totalItems: response.totalItems || items.length,
      };
    } catch (error) {
      console.error(`Error fetching ${collection}:`, error);

      // Fallback to mock data for current page
      const start = (page - 1) * limit;
      const fallbackItems = mock.slice(start, start + limit);

      return {
        items: fallbackItems,
        totalPages: Math.ceil(mock.length / limit),
        currentPage: page,
        totalItems: mock.length,
      };
    }
  }

  /**
   * Get a single item by ID
   *
   * @param id Item ID
   * @returns Item data
   */
  async function byId(id: string): Promise<T> {
    try {
      if (IS_MOCK) {
        // Find item in mock data
        const item = mock.find((item) => item.id === id);
        if (!item) {
          throw new Error(`Item with ID ${id} not found in mock data`);
        }
        return item;
      }

      if (USE_FIRESTORE) {
        // Get from Firestore
        try {
          const item = await getById<T>(collection, id);
          return schema.parse(item);
        } catch (error) {
          console.error(
            `Error fetching ${collection} item ${id} from Firestore:`,
            error
          );
          throw error; // Re-throw to fall back to mock data
        }
      }

      // Get from REST API
      const apiUrl = `${API_BASE_URL}${route}/${id}`;
      const item = await fetchJson<T>(apiUrl);
      return schema.parse(item);
    } catch (error) {
      console.error(`Error fetching ${collection} item ${id}:`, error);

      // Find fallback in mock data
      const fallback = mock.find((item) => item.id === id);

      // If no fallback found, return the first mock item with the requested ID
      if (!fallback) {
        const firstMock = { ...mock[0], id } as T;
        return firstMock;
      }

      return fallback;
    }
  }

  return { list, byId };
}
