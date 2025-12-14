export const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Intern Project API',
        version: '1.0.0',
        description: 'REST API for User Auth and Product Management',
    },
    servers: [
        {
            url: '/api/v1',
            description: 'V1 API',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    paths: {
        '/auth/register': {
            post: {
                tags: ['Auth'],
                summary: 'Register a new user',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    email: { type: 'string' },
                                    password: { type: 'string' },
                                    role: { type: 'string', enum: ['USER', 'ADMIN'] }
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: { description: 'User created' },
                },
            },
        },
        '/auth/login': {
            post: {
                tags: ['Auth'],
                summary: 'Login user',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: { type: 'string' },
                                    password: { type: 'string' }
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: { description: 'Login successful' },
                },
            },
        },
        '/products': {
            get: {
                tags: ['Products'],
                summary: 'Get all products',
                responses: {
                    200: { description: 'List of products' },
                },
            },
        },
    },
};