import { useQuery } from '@tanstack/react-query';

import { PAGINATION } from '../config';
import { useLanguage } from '../context/LanguageContext';
import { useTenant } from '../core/tenant';
import { blogService } from '../services/blog';

/**
 * Hook for fetching a paginated list of blog posts with language support
 *
 * @param page Current page number
 * @param limit Items per page
 * @param tenantOverride Optional tenant override
 * @param languageOverride Optional language override
 * @returns Query result with blog posts data
 */
export function useBlogPosts(
  page = 1,
  limit = PAGINATION.DEFAULT_PAGE_SIZE,
  tenantOverride?: string,
  languageOverride?: string
) {
  const defaultTenant = useTenant();
  const { language } = useLanguage();
  const tenant = tenantOverride || defaultTenant;
  const currentLanguage = languageOverride || language;

  return useQuery({
    queryKey: ['blogPosts', tenant, currentLanguage, page, limit],
    queryFn: () => blogService.list(tenant, page, limit, currentLanguage),
    staleTime: 60000, // 1 minute
  });
}

/**
 * Hook for fetching a single blog post by ID with language support
 *
 * @param id Blog post ID
 * @param tenantOverride Optional tenant override
 * @param languageOverride Optional language override
 * @returns Query result with blog post data
 */
export function useBlogPost(
  id: string | undefined,
  tenantOverride?: string,
  languageOverride?: string
) {
  const defaultTenant = useTenant();
  const { language } = useLanguage();
  const tenant = tenantOverride || defaultTenant;
  const currentLanguage = languageOverride || language;

  return useQuery({
    queryKey: ['blogPost', tenant, currentLanguage, id],
    queryFn: () => blogService.byId(tenant, id as string, currentLanguage),
    enabled: !!id,
    staleTime: 300000, // 5 minutes
  });
}
