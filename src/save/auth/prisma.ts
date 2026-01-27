model User {
    id        String   @id @default(cuid())
    email     String   @unique
    name      String?
        image     String?
            createdAt DateTime @default(now())

    // Relations avec vos données
    texts     UserText[]
    // autres relations...
}

model UserText {
    id        String   @id @default(cuid())
    text      String
    userId    String   // C'est ce user_id que vous voulez matcher
    user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
    createdAt DateTime @default(now())

@@index([userId])
}