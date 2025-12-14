import { createClient } from 'redis';
import { config } from '../config/env.js'; // Assuming env.js exports config object

let redisClient = null;

if (process.env.REDIS_URL) {
    redisClient = createClient({
        url: process.env.REDIS_URL,
        socket: {
            reconnectStrategy: (retries) => {
                if (retries > 10) {
                    console.warn('[Redis] Max retries reached. Stopping reconnection attempts.');
                    return new Error('Max retries reached');
                }
                return Math.min(retries * 100, 3000); // Exponential backoff capped at 3s
            },
        },
    });

    redisClient.on('error', (err) => {
        // CRITICAL: Prevent crash by handling the error event
        console.warn('[Redis] Connection Error:', err.message);
    });

    redisClient.on('connect', () => {
        console.log('[Redis] Connected successfully');
    });
} else {
    console.warn('[Redis] REDIS_URL not found in env. Caching will be disabled.');
}

export const connectRedis = async () => {
    if (redisClient) {
        try {
            await redisClient.connect();
        } catch (error) {
            console.warn('[Redis] Failed to connect initially. App will continue without caching.');
        }
    }
};

export default redisClient;