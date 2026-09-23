import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The repo root also has a lockfile. Keep Turbopack scoped to this app.
  turbopack: {
    root: process.cwd(),
  },
  agentRules: false,
};

export default nextConfig;
