/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "res.cloudinary.com" ,
          },
        ],
      },
      env: {
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "ddjcpzprt",
      },
};

export default nextConfig;
