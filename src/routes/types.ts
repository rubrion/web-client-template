export type RouteObject = {
  path: string;
  label: string;
  description?: string;
};

// Modified to accept Record with optional values
export type DynamicRoute<
  T extends Record<string, string | number | undefined>,
> = (params: T) => string;

// Standardized params for both projects and blog posts
export interface PaginationParams extends Record<string, string | number> {
  page: number;
}

// Standardized detail params for both projects and blog posts
export interface DetailParams extends Record<string, string | number> {
  id: string;
}

// For optional parameters - with proper index signature
export interface OptionalDetailParams {
  id?: string;
  [key: string]: string | number | undefined;
}
