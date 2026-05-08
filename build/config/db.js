import "reflect-metadata";
import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { User } from "../models/User.js";
import { Chat } from "../models/Chat.js";
import { Message } from "../models/Message.js";
dotenv.config();
export const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    models: [User, Chat, Message],
});
//# sourceMappingURL=db.js.map