import { Worker, Job } from 'bullmq';
import { redisConnection } from './redis';
import { ServerActionJob, getQueueKey } from './queue';

const activeJobs = new Map<string, Promise<any>>();
export enum ActionEnabled  {
    sendPrompt="sendPrompt",
};

export function startWorker() {
    const worker = new Worker<ServerActionJob>(
        'server-actions',
        async (job: Job<ServerActionJob>) => {
            const { userId, talkId, action, payload } = job.data;
            const queueKey = getQueueKey(userId, talkId);

            console.log(`Processing job ${job.id} for ${queueKey}`);

            // Attendre que le job précédent pour ce user/talk soit terminé
            if (activeJobs.has(queueKey)) {
                await activeJobs.get(queueKey);
            }

            // Créer une promesse pour ce job
            const jobPromise = processAction(action, payload);
            activeJobs.set(queueKey, jobPromise);

            try {
                const result = await jobPromise;
                return result;
            } finally {
                // Nettoyer après traitement
                if (activeJobs.get(queueKey) === jobPromise) {
                    activeJobs.delete(queueKey);
                }
            }
        },
        {
            connection: redisConnection,
            concurrency: 5, // Nombre de jobs traités en parallèle (différents users)
            limiter: {
                max: 10,
                duration: 1000, // Max 10 jobs par seconde
            },
        }
    );

    // Gestion des événements
    worker.on('completed', (job) => {
        console.log(`Job ${job.id} completed`);
    });

    worker.on('failed', (job, err) => {
        console.error(`Job ${job?.id} failed:`, err);
    });

    worker.on('error', (err) => {
        console.error('Worker error:', err);
    });

    return worker;
}



async function processAction(action: ActionEnabled, payload: any) {
    switch (action) {
        case ActionEnabled.sendPrompt:
            return await handleSendPrompt(payload);
        default:
            throw new Error(`Unknown action: ${action}`);
    }
}

// Exemples de handlers
async function handleSendPrompt(payload: any) {
    console.log('Sending message:', payload);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
}
