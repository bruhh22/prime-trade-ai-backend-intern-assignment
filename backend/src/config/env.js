import dotenv from 'dotenv';
dotenv.config();

const requiredEnv = ['PORT', 'MONGO_URI', 'JWT_SECRET', 'JWT_EXPIRES_IN'];

const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length > 0) {
    console.error(`[Fatal Error] Missing required environment variables: ${missingEnv.join(', ')}`);
    process.exit(1);
}

export const config = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    nodeEnv: process.env.NODE_ENV || 'development'
};