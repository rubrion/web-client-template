import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useLanguage } from '../context/LanguageContext';
import { resolveTenant } from '../core/tenant';
import { createContentService } from '../services/createContentService';
import { CommonContent, ContentResource } from '../types/content';

// Keep track of service promises to avoid creating multiple for the same resource
const servicePromises = new Map<ContentResource, Promise<any>>();

/**
 * Get or create a service for the specified content resource
 */
function getContentService<T extends CommonContent>(
  resource: ContentResource
): Promise<any> {
  if (!servicePromises.has(resource)) {
    const servicePromise = createContentService<T>(resource);
    servicePromises.set(resource, servicePromise);
  }

  return servicePromises.get(resource) as Promise<any>;
}

/**
 * Hook for fetching paginated content (blog posts, projects, etc.)
 *
 * @template T Type of content being fetched
 * @param resource The content resource identifier ('blogPosts', 'projects', etc.)
 * @param page Current page number
 * @param limit Items per page
 * @param tenant Optional tenant identifier
 * @param lang Optional language override (defaults to current language from context)
 * @returns Query result with items, pagination info, loading state, and error state
 */
export function usePaginatedContent<T extends CommonContent>(
  resource: ContentResource,
  page = 1,
  limit = 9,
  tenant?: string,
  lang?: string
) {
  const { language: contextLanguage } = useLanguage();

  // Use provided language or fall back to context language
  const language = lang || contextLanguage;

  // Fetch content with React Query
  return useQuery({
    queryKey: ['content', resource, 'list', page, limit, tenant, language],
    queryFn: async () => {
      // Use provided tenant or default from environment
      const currentTenant = tenant || resolveTenant();

      // Get the service first, then use it
      const service = await getContentService<T>(resource);
      return await service.list(currentTenant, page, limit, language);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook for fetching a single content item by ID
 *
 * @template T Type of content being fetched
 * @param resource The content resource identifier ('blogPosts', 'projects', etc.)
 * @param id Item identifier
 * @param tenant Optional tenant identifier
 * @param lang Optional language override (defaults to current language from context)
 * @returns Query result with item data, loading state, error state, and language actually used
 */
export function useContentById<T extends CommonContent>(
  resource: ContentResource,
  id?: string,
  tenant?: string,
  lang?: string
) {
  const { language: contextLanguage } = useLanguage();

  // Use provided language or fall back to context language
  const language = lang || contextLanguage;

  // Fetch item with React Query
  const query = useQuery({
    queryKey: ['content', resource, 'item', id, tenant, language],
    queryFn: async () => {
      if (!id) {
        throw new Error('Item ID is required');
      }

      // Use provided tenant or default from environment
      const currentTenant = tenant || resolveTenant();

      // Get the service first, then use it
      const service = await getContentService<T>(resource);
      const result = await service.byId(currentTenant, id, language);

      return {
        data: result,
        langUsed: (result as any).langUsed || language,
      };
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    ...query,
    document: query.data?.data,
    langUsed: query.data?.langUsed || language,
    isUsingFallback: useMemo(() => {
      return !!query.data && query.data.langUsed !== language;
    }, [query.data, language]),
  };
}

// Backward compatibility wrapper for useBlogPosts
export function useBlogPosts(
  page = 1,
  limit = 9,
  tenant?: string,
  lang?: string
) {
  return usePaginatedContent('blog', page, limit, tenant, lang);
}

// Backward compatibility wrapper for useProjects
export function useProjects(
  page = 1,
  limit = 9,
  tenant?: string,
  lang?: string
) {
  return usePaginatedContent('projects', page, limit, tenant, lang);
}
