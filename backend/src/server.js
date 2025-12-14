import { config } from './config/env.js';
import { connectDB } from './config/db.js';
import { connectRedis } from './cache/redis.client.js';
import app from './app.js';

// 1. Connect to Database
connectDB();

// 1.5 Connect to Redis (optional)
connectRedis();

// 2. Start Server
const server = app.listen(config.port, () => {
    console.log(`[Server] Running in ${config.nodeEnv} mode on port ${config.port}`);
    console.log(`[Docs] Swagger UI available at http://localhost:${config.port}/api-docs`);
});

// 3. Handle Unhandled Rejections (Safety Net)
process.on('unhandledRejection', (err) => {
    console.error(`[Error] Unhandled Rejection: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
    console.error(`[Error] Uncaught Exception: ${err.message}`);
    process.exit(1);
});