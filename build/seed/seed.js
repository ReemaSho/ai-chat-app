import { User } from "../models/User.js";
import { Chat } from "../models/Chat.js";
import { Message } from "../models/Message.js";
export const seedData = async () => {
    try {
        // 1. USER
        let user = await User.findOne({ where: { id: 1 } });
        if (!user) {
            user = await User.create({
                id: 1,
                name: "Demo User",
            });
        }
        // 2. CHAT 1
        const chat1 = await Chat.create({
            title: "General AI Questions",
            userId: user.id,
        });
        // 3. CHAT 2
        const chat2 = await Chat.create({
            title: "Coding Help",
            userId: user.id,
        });
        // 4. MESSAGES FOR CHAT 1
        await Message.bulkCreate([
            {
                role: "user",
                content: "What is AI?",
                chatId: chat1.id,
            },
            {
                role: "assistant",
                content: "AI stands for Artificial Intelligence...",
                chatId: chat1.id,
            },
            {
                role: "user",
                content: "Give examples",
                chatId: chat1.id,
            },
            {
                role: "assistant",
                content: "Examples include ChatGPT, self-driving cars...",
                chatId: chat1.id,
            },
        ]);
        // 5. MESSAGES FOR CHAT 2
        await Message.bulkCreate([
            {
                role: "user",
                content: "How do I fix a Node.js error?",
                chatId: chat2.id,
            },
            {
                role: "assistant",
                content: "Check stack trace and dependencies...",
                chatId: chat2.id,
            },
        ]);
        console.log("🌱 Seed data created successfully");
    }
    catch (error) {
        console.error("❌ Seed error:", error);
    }
};
//# sourceMappingURL=seed.js.map