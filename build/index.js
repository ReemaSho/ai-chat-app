import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./config/db.js";
import { applyAssociations } from "./models/associations.js";
import chatRoutes from "./routes/chat.routes.js";
import messageRoutes from "./routes/message.routes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// routes
app.use("/api/v1", chatRoutes);
app.use("/api/v1", messageRoutes);
/* -----------------------
   BASIC ROUTE
------------------------ */
app.get("/", (req, res) => {
    res.json({
        message: "AI Chat Backend is running 🚀",
    });
});
/* -----------------------
   SERVER START FUNCTION
------------------------ */
const startServer = async () => {
    try {
        // 1. Setup relationships (VERY IMPORTANT)
        applyAssociations();
        // 2. Connect DB + sync models
        await sequelize.sync({ alter: true });
        console.log("Database synced ✅");
        // 3. Seed initial data (demo user)
        // await seedData();
        console.log("Seed completed 👤");
        // 4. Start server
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT} 🚀`);
        });
    }
    catch (error) {
        console.error("Failed to start server ❌", error);
    }
};
/* -----------------------
   INIT APP
------------------------ */
startServer();
//# sourceMappingURL=index.js.map