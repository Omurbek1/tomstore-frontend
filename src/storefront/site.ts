const trimTrailingSlashes = (value?: string | null) =>
  String(value || "").replace(/\/+$/, "");

const LOCAL_MEDIA_HOSTNAMES = new Set(["127.0.0.1", "localhost", "0.0.0.0"]);

const getBrowserOrigin = () => {
  if (typeof window === "undefined") {
    return "";
  }

  return trimTrailingSlashes(window.location.origin);
};

const buildLocalServiceUrl = (port: string, fallbackHost = "127.0.0.1") => {
  const browserOrigin = getBrowserOrigin();

  if (browserOrigin) {
    try {
      const parsed = new URL(browserOrigin);
      parsed.port = port;
      return trimTrailingSlashes(parsed.toString());
    } catch {
      return browserOrigin;
    }
  }

  return `http://${fallbackHost}:${port}`;
};

export const getBackendUrl = () =>
  trimTrailingSlashes(
    process.env.BACKEND_URL ||
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      buildLocalServiceUrl("3000"),
  );

export const getSiteUrl = () =>
  trimTrailingSlashes(
    process.env.SITE_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      getBrowserOrigin() ||
      buildLocalServiceUrl("3001"),
  );

export const buildAbsoluteUrl = (path: string) => {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const siteUrl = getSiteUrl();
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
};

export const buildStorefrontAssetUrl = (path?: string | null) => {
  const normalizedPath = String(path || "").trim();

  if (!normalizedPath) {
    return undefined;
  }

  if (normalizedPath.startsWith("data:")) {
    return normalizedPath;
  }

  if (
    normalizedPath.startsWith("http://") ||
    normalizedPath.startsWith("https://")
  ) {
    try {
      const mediaUrl = new URL(normalizedPath);
      const backendUrl = new URL(getBackendUrl());

      if (
        LOCAL_MEDIA_HOSTNAMES.has(mediaUrl.hostname) &&
        !LOCAL_MEDIA_HOSTNAMES.has(backendUrl.hostname)
      ) {
        mediaUrl.protocol = backendUrl.protocol;
        mediaUrl.hostname = backendUrl.hostname;
        mediaUrl.port = backendUrl.port;
        return mediaUrl.toString();
      }
    } catch {
      return normalizedPath;
    }

    return normalizedPath;
  }

  const backendUrl = getBackendUrl();
  return `${backendUrl}${normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`}`;
};
