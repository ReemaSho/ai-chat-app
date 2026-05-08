import { User } from "./User.js";
import { Chat } from "./Chat.js";
import { Message } from "./Message.js";
export function applyAssociations() {
    // User → Chat
    User.hasMany(Chat, {
        foreignKey: "userId",
        onDelete: "CASCADE",
    });
    Chat.belongsTo(User, {
        foreignKey: "userId",
    });
    // Chat → Message
    Chat.hasMany(Message, {
        foreignKey: "chatId",
        onDelete: "CASCADE",
    });
    Message.belongsTo(Chat, {
        foreignKey: "chatId",
    });
}
//# sourceMappingURL=associations.js.map