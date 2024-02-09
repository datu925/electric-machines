/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggresiveFrontEndNavCaching: true, // Cache every <link rel="stylesheet" /> and <script /> on frontend navigation
  reloadOnOnline: true, // Reload the app when it has gone back online
  disable: false, // want PWA in dev
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig = {};

export default withPWA(nextConfig);
