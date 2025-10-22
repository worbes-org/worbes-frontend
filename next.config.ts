import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const API_URL =
  process.env.API_URL ??
  "http://worbes-server-alb-281547945.ap-northeast-2.elb.amazonaws.com";

const nextConfig: NextConfig = {
  env: {
    API_URL,
  },
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/api/v1/:path*`,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
