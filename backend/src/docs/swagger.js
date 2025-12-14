export const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'PrimeTrade API',
        version: '1.0.0',
        description: 'Backend API for PrimeTrade Inventory Management System. Includes Auth, RBAC, Product Management, and User Administration.',
        contact: {
            name: 'Backend Developer',
        },
    },
    servers: [
        {
            url: '/api/v1',
            description: 'Production/Development Server',
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
        schemas: {
            User: {
                type: 'object',
                properties: {
                    _id: { type: 'string', example: '6578a9b1c2d3e4f5a6b7c8d9' },
                    name: { type: 'string', example: 'John Doe' },
                    email: { type: 'string', example: 'john@example.com' },
                    role: { type: 'string', enum: ['USER', 'ADMIN'], example: 'USER' },
                },
            },
            Product: {
                type: 'object',
                properties: {
                    _id: { type: 'string', example: '6578a9b1c2d3e4f5a6b7c8d0' },
                    name: { type: 'string', example: 'Gaming Laptop' },
                    description: { type: 'string', example: 'High performance gaming laptop' },
                    price: { type: 'number', example: 1200.50 },
                    stock: { type: 'integer', example: 25 },
                    createdBy: { type: 'string', description: 'User ID of creator' },
                    createdAt: { type: 'string', format: 'date-time' },
                },
            },
            Error: {
                type: 'object',
                properties: {
                    success: { type: 'boolean', example: false },
                    message: { type: 'string', example: 'Error description here' },
                },
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    tags: [
        { name: 'Auth', description: 'User authentication' },
        { name: 'Products', description: 'Product management (CRUD)' },
    ],
    paths: {
        // --- AUTH ENDPOINTS ---
        '/auth/register': {
            post: {
                tags: ['Auth'],
                summary: 'Register a new user',
                security: [], // Public endpoint
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['name', 'email', 'password'],
                                properties: {
                                    name: { type: 'string', example: 'Alice Smith' },
                                    email: { type: 'string', example: 'alice@example.com' },
                                    password: { type: 'string', example: 'password123', minLength: 6 },
                                    role: { type: 'string', enum: ['USER', 'ADMIN'], default: 'USER' }
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'User registered successfully',
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } },
                    },
                    400: { description: 'Validation error or User already exists' },
                },
            },
        },
        '/auth/login': {
            post: {
                tags: ['Auth'],
                summary: 'Login user',
                security: [], // Public endpoint
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['email', 'password'],
                                properties: {
                                    email: { type: 'string', example: 'alice@example.com' },
                                    password: { type: 'string', example: 'password123' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Login successful',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: { type: 'boolean', example: true },
                                        message: { type: 'string' },
                                        data: {
                                            type: 'object',
                                            properties: {
                                                user: { $ref: '#/components/schemas/User' },
                                                token: { type: 'string', description: 'JWT Token' },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    401: { description: 'Invalid credentials' },
                },
            },
        },



        // --- PRODUCT ENDPOINTS ---
        '/products': {
            get: {
                tags: ['Products'],
                summary: 'Get all products',
                description: 'Retrieve a list of all products. Publicly accessible or protected based on config.',
                responses: {
                    200: {
                        description: 'List of products',
                        content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Product' } } } },
                    },
                },
            },
            post: {
                tags: ['Products'],
                summary: 'Create a product (Admin Only)',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['name', 'description', 'price', 'stock'],
                                properties: {
                                    name: { type: 'string' },
                                    description: { type: 'string' },
                                    price: { type: 'number', minimum: 0 },
                                    stock: { type: 'integer', minimum: 0 },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: { description: 'Product created' },
                    403: { description: 'Forbidden - Admins only' },
                },
            },
        },
        '/products/{id}': {
            get: {
                tags: ['Products'],
                summary: 'Get a single product',
                parameters: [
                    { in: 'path', name: 'id', required: true, schema: { type: 'string' }, description: 'Product ID' },
                ],
                responses: {
                    200: { description: 'Product details', content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } } },
                    404: { description: 'Product not found' },
                },
            },
            put: {
                tags: ['Products'],
                summary: 'Update a product (Admin Only)',
                security: [{ bearerAuth: [] }],
                parameters: [
                    { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    description: { type: 'string' },
                                    price: { type: 'number' },
                                    stock: { type: 'integer' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: { description: 'Product updated' },
                    403: { description: 'Forbidden - Admins only' },
                    404: { description: 'Product not found' },
                },
            },
            delete: {
                tags: ['Products'],
                summary: 'Delete a product (Admin Only)',
                security: [{ bearerAuth: [] }],
                parameters: [
                    { in: 'path', name: 'id', required: true, schema: { type: 'string' } },
                ],
                responses: {
                    200: { description: 'Product deleted' },
                    403: { description: 'Forbidden - Admins only' },
                },
            },
        },


    },
};