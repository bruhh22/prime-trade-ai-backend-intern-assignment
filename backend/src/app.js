import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import routes from './routes/index.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { swaggerDocument } from './docs/swagger.js';
import { apiResponse } from './utils/apiResponse.js';
import { HTTP_STATUS } from './config/constants.js';

const app = express();

// Global Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration (Permissive for development/assignment)
// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));


// --- CORS CONFIGURATION (PRODUCTION READY) ---
const allowedOrigins = [
    'http://localhost:5173', // local dev frontend
    'http://localhost:3000', // optional
    process.env.CLIENT_URL,  // deployed frontend
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow server-to-server, Postman, curl
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error('Not allowed by CORS'));
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
);

// --- HANDLE PREFLIGHT REQUESTS ---
app.options(/.*/, cors());

// Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Base Route
app.get('/', (req, res) => {
    apiResponse(res, HTTP_STATUS.OK, true, 'Backend API is running. Go to /api-docs for documentation.');
});

// API Routes
app.use('/api', routes);

// 404 Handler
app.use((req, res) => {
    apiResponse(res, HTTP_STATUS.NOT_FOUND, false, `Route ${req.originalUrl} not found`);
});

// Central Error Handler (Must be last)
app.use(errorMiddleware);

export default app;