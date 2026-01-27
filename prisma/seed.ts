/*
import { PrismaClient, Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
    adapter,
});

const user = await prisma.user.findUnique({
    where: { email: "rouard.maxi@gmail.com" },
})

if (!user) {
    throw new Error("User not found, seed impossible")
}

const talks: Prisma.TalkCreateManyInput[] = [
    {
        title:"1 conv",
        userId: user.id
    },
    {
        title:"2 conv",
        userId: user.id
    }
];

export async function main() {
    for (const t of talks) {
        await prisma.talk.create({ data: t});
    }
}

main();

 */