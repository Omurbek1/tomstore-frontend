import type { StorefrontBlogAccess, StorefrontConfig } from "./types";

export const STOREFRONT_AUTH_COOKIE_NAME = "storefront_auth_token";

const escapeCookieName = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const normalizeStorefrontAuthToken = (value?: string | null) => {
  const raw = String(value || "").trim();
  if (!raw) {
    return undefined;
  }

  return raw.replace(/^Bearer\s+/i, "").trim() || undefined;
};

export const buildStorefrontAuthorizationValue = (token?: string | null) => {
  const normalized = normalizeStorefrontAuthToken(token);
  return normalized ? `Bearer ${normalized}` : undefined;
};

export const readCookieValue = (source: string, name: string) => {
  const match = source.match(
    new RegExp(`(?:^|;\\s*)${escapeCookieName(name)}=([^;]*)`),
  );
  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
};

export const readStorefrontAuthTokenFromCookieString = (source: string) =>
  normalizeStorefrontAuthToken(
    readCookieValue(source, STOREFRONT_AUTH_COOKIE_NAME),
  );

export const readStorefrontAuthTokenFromDocument = () => {
  if (typeof document === "undefined") {
    return undefined;
  }

  return readStorefrontAuthTokenFromCookieString(document.cookie);
};

export const getStorefrontAuthScope = (token?: string | null) =>
  normalizeStorefrontAuthToken(token) ? "authorized" : "public";

export const storefrontBlogRequiresAuth = (
  access?: StorefrontBlogAccess | null,
) => access === "private";

export const isStorefrontBlogPublic = (
  config?: Pick<StorefrontConfig, "storefrontBlogEnabled" | "storefrontBlogAccess"> | null,
) =>
  config?.storefrontBlogEnabled === true &&
  !storefrontBlogRequiresAuth(config.storefrontBlogAccess);

export const canAccessStorefrontBlog = (
  config?: Pick<StorefrontConfig, "storefrontBlogEnabled" | "storefrontBlogAccess"> | null,
  authToken?: string | null,
) =>
  isStorefrontBlogPublic(config) ||
  (config?.storefrontBlogEnabled === true &&
    Boolean(normalizeStorefrontAuthToken(authToken)));
