import { Redis } from 'ioredis';

// Récupérez votre URL Redis depuis Upstash
const redisUrl = process.env.REDIS_URL!;

export const redisConnection = new Redis(redisUrl, {
    maxRetriesPerRequest: null, // Important pour BullMQ
    enableReadyCheck: false,
});