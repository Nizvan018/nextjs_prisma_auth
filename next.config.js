/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.drupal.org',
                port: '',

            }
        ]
    }
}
// https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png
module.exports = nextConfig
