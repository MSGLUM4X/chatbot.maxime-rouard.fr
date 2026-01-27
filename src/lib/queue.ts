import { Queue, Worker, Job } from 'bullmq';
import { redisConnection } from './redis';
import {ActionEnabled} from "@/lib/worker";

export interface ServerActionJob {
    userId: string;
    talkId: string;
    action: ActionEnabled;
    payload: any;
}


export const serverActionQueue = new Queue<ServerActionJob>('server-actions', {
    connection: redisConnection,
    defaultJobOptions: {
        attempts: 1,
        removeOnComplete: 10,
        removeOnFail: 20,
    },
});


export function getQueueKey(userId: string, talkId: string) {
    return `${userId}:${talkId}`;
}


export async function addServerAction(
    userId: string,
    talkId: string,
    action: ActionEnabled,
    payload: any
) {
    const queueKey = getQueueKey(userId, talkId);

    return await serverActionQueue.add(
        action,
        {
            userId,
            talkId,
            action,
            payload,
        },
        {
            jobId: `${queueKey}:${Date.now()}`,
            priority: 1,
        }
    );
}