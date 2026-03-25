/** @type {import('next').NextConfig} */
const backendUrl = new URL(
  process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.BACKEND_URL ||
    "http://127.0.0.1:3000",
);

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;

const remotePatterns = [
  {
    protocol: backendUrl.protocol.replace(":", ""),
    hostname: backendUrl.hostname,
    port: backendUrl.port,
    pathname: "/**",
  },
  {
    protocol: "http",
    hostname: "127.0.0.1",
    port: "3000",
    pathname: "/**",
  },
  {
    protocol: "http",
    hostname: "localhost",
    port: "3000",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "**.supabase.co",
    pathname: "/storage/v1/object/public/**",
  },
];

if (supabaseUrl) {
  const parsedSupabaseUrl = new URL(supabaseUrl);

  remotePatterns.push({
    protocol: parsedSupabaseUrl.protocol.replace(":", ""),
    hostname: parsedSupabaseUrl.hostname,
    port: parsedSupabaseUrl.port,
    pathname: "/storage/v1/object/public/**",
  });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    remotePatterns,
  },
};

module.exports = nextConfig;
