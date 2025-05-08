/**
 * Resolves the current tenant based on the environment and URL
 *
 * In development: Uses the 'tenant' query parameter or falls back to 'demo'
 * In production: Uses the first subdomain of the hostname
 *
 * @example
 * // In development with ?tenant=acme
 * resolveTenant() // returns 'acme'
 *
 * // In production with acme.rubrion.com
 * resolveTenant() // returns 'acme'
 *
 * @returns The resolved tenant identifier
 */
import { FEATURES } from '../config';

export function resolveTenant(): string {
  // If multi-tenant feature is disabled, always return 'default'
  if (!FEATURES.MULTI_TENANT) {
    return 'default';
  }

  if (import.meta.env.DEV) {
    return new URL(window.location.href).searchParams.get('tenant') ?? 'demo';
  }

  return window.location.hostname.split('.')[0];
}

/**
 * Creates a tenant-specific URL
 *
 * @param tenant Tenant identifier
 * @param path URL path
 * @returns Fully qualified URL with tenant
 */
export function createTenantUrl(tenant: string, path: string): string {
  // If multi-tenant feature is disabled, don't include tenant in URL
  if (!FEATURES.MULTI_TENANT) {
    return new URL(path, window.location.origin).toString();
  }

  if (import.meta.env.DEV) {
    const url = new URL(path, window.location.origin);
    url.searchParams.set('tenant', tenant);
    return url.toString();
  }

  // In production, assume a subdomain-based routing
  const baseDomain = window.location.hostname.split('.').slice(1).join('.');
  return `https://${tenant}.${baseDomain}${path}`;
}

/**
 * Current tenant context for React components
 */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

const TenantContext = createContext<string>('demo');

/**
 * Get the current tenant identifier
 */
export function useTenant(): string {
  return useContext(TenantContext);
}

interface TenantProviderProps {
  children: ReactNode;
  initialTenant?: string;
}

/**
 * Provider component for tenant context
 */
export function TenantProvider({
  children,
  initialTenant,
}: TenantProviderProps) {
  const [tenant, setTenant] = useState<string>(
    initialTenant || resolveTenant()
  );

  // Re-resolve tenant when URL changes (for dev mode with ?tenant=)
  useEffect(() => {
    if (!import.meta.env.DEV) return;

    const handleUrlChange = () => {
      const newTenant = resolveTenant();
      if (newTenant !== tenant) {
        setTenant(newTenant);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, [tenant]);

  return (
    <TenantContext.Provider value={tenant}>{children}</TenantContext.Provider>
  );
}
