const trimTrailingSlashes = (value?: string | null) =>
  String(value || "").replace(/\/+$/, "");

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
