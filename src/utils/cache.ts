import { CryptoData } from '../types';

interface CacheItem {
    data: CryptoData;
    timestamp: number;
    cryptoId: string;
    timeInterval: string;
}

const CACHE_KEY = 'crypto_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут в миллисекундах

export const getCachedData = (cryptoId: string, timeInterval: string): CryptoData | null => {
    try {
        const cacheData = localStorage.getItem(CACHE_KEY);
        if (!cacheData) return null;

        const cache: CacheItem = JSON.parse(cacheData);
        const isExpired = Date.now() - cache.timestamp > CACHE_DURATION;
        const isSameData = cache.cryptoId === cryptoId && cache.timeInterval === timeInterval;

        if (isExpired || !isSameData) {
            localStorage.removeItem(CACHE_KEY);
            return null;
        }

        return cache.data;
    } catch (error) {
        console.error('Cache reading error:', error);
        return null;
    }
};

export const setCachedData = (
    cryptoId: string,
    timeInterval: string,
    data: CryptoData
): void => {
    try {
        const cacheItem: CacheItem = {
            data,
            timestamp: Date.now(),
            cryptoId,
            timeInterval,
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheItem));
    } catch (error) {
        console.error('Cache writing error:', error);
    }
};
