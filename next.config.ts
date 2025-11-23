import type { NextConfig } from "next";

import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  experimental: {
    typedEnv: true,
  },
};

export default withPayload(nextConfig);
