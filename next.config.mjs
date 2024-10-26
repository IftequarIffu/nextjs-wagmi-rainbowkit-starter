/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ipfs.io', // Replace with the domain of the external website
                port: '',
                pathname: '/ipfs/**', // Adjust the path if needed
            },
        ],
    },
};

export default nextConfig;
