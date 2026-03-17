import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Pomodoro Focus',
        short_name: 'Pomo',
        description: 'Simple Pomodoro timer to stay focused - works offline',
        start_url: '/',
        display: 'standalone',
        theme_color: '#ef4444',
        background_color: '#f9fafb',
        icons: [
            {
                src: '/icons/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icons/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}