import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  devIndicators: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }],
    // Sponsor logos may be SVG (e.g. generated placeholder marks). Next blocks
    // SVG optimization by default as an XSS precaution; scope the exception
    // down with a strict CSP on the served image response.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
