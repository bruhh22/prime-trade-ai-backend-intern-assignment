import redisClient from './redis.client.js';

/**
 * Safe get: Returns parsed data or null on failure/miss
 */
export const get = async (key) => {
    if (!redisClient || !redisClient.isOpen) return null;

    try {
        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        // Fail silently, treat as cache miss
        return null;
    }
};

/**
 * Safe set: Stringifies data and sets TTL
 */
export const set = async (key, value, ttlSeconds) => {
    if (!redisClient || !redisClient.isOpen) return;

    try {
        const stringValue = JSON.stringify(value);
        await redisClient.set(key, stringValue, { EX: ttlSeconds });
    } catch (error) {
        // Fail silently
        console.warn(`[Cache] Set failed for key ${key}`);
    }
};

/**
 * Safe delete: Removes a key
 */
export const del = async (key) => {
    if (!redisClient || !redisClient.isOpen) return;

    try {
        await redisClient.del(key);
    } catch (error) {
        // Fail silently
        console.warn(`[Cache] Del failed for key ${key}`);
    }
};