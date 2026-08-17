// src/lib/wp-client.ts

const WP_URL = process.env.NEXT_PUBLIC_WP_SITE_URL;
const WC_KEY = process.env.WC_CONSUMER_KEY;
const WC_SECRET = process.env.WC_CONSUMER_SECRET;

const WP_USER = process.env.WP_ADMIN_USER;
const WP_PASS = process.env.WP_APP_PASSWORD;

/**
 * Cliente para la API de WooCommerce (v3)
 */
export async function fetchWooCommerce(endpoint: string, options: RequestInit = {}) {
    const credentials = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64');

    const url = `${WP_URL}/wp-json/wc/v3/${endpoint}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`Error en WooCommerce API: ${response.statusText}`);
    }

    return response.json();
}

/**
 * Cliente para la API REST de WordPress (Core: Páginas, Usuarios, Posts)
 */
export async function fetchWordPress(endpoint: string, options: RequestInit = {}) {
    const credentials = Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64');

    const url = `${WP_URL}/wp-json/wp/v2/${endpoint}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`Error en WordPress API: ${response.statusText}`);
    }

    return response.json();
}