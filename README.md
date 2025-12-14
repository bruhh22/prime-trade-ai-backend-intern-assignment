# Prime Trade AI – Backend Developer Intern Assignment

A scalable REST API with authentication, role-based access control (RBAC), and a basic frontend UI to demonstrate API usage.

This project was built as part of the **Backend Developer (Intern) Assignment** to demonstrate secure, scalable backend system design with strong API development and basic frontend integration.

---

## 🔗 Live Links

| Service | URL |
|---------|-----|
| **Backend API** | [https://prime-trade-ai-backend-intern-assignment.onrender.com](https://prime-trade-ai-backend-intern-assignment.onrender.com) |
| **API Documentation (Swagger)** | [https://prime-trade-ai-backend-intern-assignment.onrender.com/api-docs](https://prime-trade-ai-backend-intern-assignment.onrender.com/api-docs) |
| **Frontend UI** | [https://prime-trade-ai-backend-intern-assig.vercel.app](https://prime-trade-ai-backend-intern-assig.vercel.app) |

---

## 🧰 Tech Stack

### Backend
- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **MongoDB + Mongoose** – NoSQL database
- **JWT** – Stateless authentication
- **Bcrypt** – Password hashing
- **Joi** – Input validation
- **Swagger/OpenAPI** – API documentation
- **Redis** – Caching layer (feature branch)
- **Docker** – Containerization (feature branch)

### Frontend
- **React (Vite)** – Modern UI library
- **Axios** – HTTP client
- **CSS** – Styling
- **JWT** – Secure authentication flow

---

## 📁 Project Structure

```
prime-trade-ai-backend-intern-assignment/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/          # Database & environment config
│   │   ├── modules/         # Auth, Users, Products
│   │   ├── middlewares/     # Auth, RBAC, Error handling
│   │   ├── routes/          # API route definitions
│   │   ├── utils/           # Validators, Logging
│   │   └── docs/            # Swagger configuration
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Auth, Dashboard, Products
│   │   ├── api/             # API client
│   │   └── App.jsx
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## ✅ Implemented Features

### 🔐 Authentication & Authorization
- ✅ User registration & login with JWT tokens
- ✅ Password hashing using bcrypt
- ✅ Role-based access control (User / Admin)
- ✅ Protected routes with authorization middleware
- ✅ JWT-based authentication with configurable expiration

### 📦 Product Management (CRUD)
- ✅ Create product (Admin only)
- ✅ Read all products & single product (Authenticated users)
- ✅ Update product (Admin only)
- ✅ Delete product (Admin only)

### 🏗️ API Design
- ✅ RESTful API principles with proper HTTP methods & status codes
- ✅ API versioning (`/api/v1`)
- ✅ Modular architecture (routes → controllers → services → models)
- ✅ Centralized error handling with standardized response format
- ✅ Input validation using Joi schemas
- ✅ Swagger/OpenAPI documentation

### 🖥️ Frontend UI
- ✅ User registration & login pages
- ✅ Protected dashboard (JWT required)
- ✅ CRUD operations for products
- ✅ Error & success message handling
- ✅ Responsive design

### 🔒 Security Practices
- Password hashing using bcrypt (salt rounds: 10)
- JWT-based authentication with authorization middleware
- Role-based access control enforced at route level
- Input validation and sanitization using Joi
- Centralized error handling to prevent information leakage
- CORS configured for local and production environments

### 📈 Scalability & Architecture
- ✅ Stateless JWT authentication enables horizontal scaling
- ✅ Modular service-based architecture with clear separation of concerns
- ✅ API versioning for backward compatibility
- ✅ Environment-based configuration
- ✅ Designed to be compatible with load balancer–based deployments
- ✅ Schema design supports database indexing on frequently queried fields

---

## 🌿 Git Branch Strategy

| Branch | Description | Status |
|--------|-------------|--------|
| **`main`** | Stable, production-ready version (deployed to Render & Vercel) | ✅ Live |
| **`feature/redis-caching`** | Redis caching layer for performance optimization | 🔹 Tested |
| **`feature/dockerization`** | Docker & Docker Compose setup for containerization | 🔹 Tested |

### Why Feature Branches Are Separate?
The feature branches are **intentionally isolated** to:
- Keep the `main` branch clean and deployment-safe
- Avoid introducing bugs or breaking changes to live production
- Allow independent testing and validation
- Enable easy rollback if issues arise

---

## 🚀 Optional Enhancements (Feature Branches)

### 🔹 Redis Caching (`feature/redis-caching`)

**Purpose:** Improve API performance with in-memory caching.

**Features:**
- Cache abstraction layer with easy enable/disable
- Automatic fallback when Redis is unavailable
- Cached endpoints: `GET /api/v1/products`, `GET /api/v1/products/:id`
- TTL-based cache expiry (configurable)
- Cache invalidation on create/update/delete operations

**Setup:**
```bash
git checkout feature/redis-caching
npm install
npm run dev
```

**Configuration in `.env`:**
```env
REDIS_ENABLED=true
REDIS_HOST=localhost
REDIS_PORT=6379
CACHE_TTL=3600
```

---

### 🔹 Docker & Docker Compose (`feature/dockerization` branch)

**Purpose:** Containerize the entire stack for consistent deployment.

**Included Services:**
- **Backend** – Node.js + Express (port 5000)
- **Frontend** – React + Nginx (port 3000)
- **MongoDB** – NoSQL database (port 27017)
- **Redis** – Caching layer (port 6379)

**Benefits:**
- One-command startup: `docker-compose up --build`
- Environment consistency across dev/staging/production
- No local dependency installation needed

**Setup:**
```bash
git checkout feature/dockerization
docker-compose up --build
```

**Access Services:**
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- API Docs: `http://localhost:5000/api-docs`

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn
- Optional: Docker & Docker Compose

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Update .env with your configuration
npm run dev
```

**Environment Variables (`.env`):**
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb://localhost:27017/prime-trade-ai
JWT_SECRET=your-jwt-secret-key-here
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
REDIS_ENABLED=false
SWAGGER_ENABLED=true
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

**Environment Variables (`.env`):**
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_APP_NAME=Prime Trade AI
```

---

## 🚀 Deployment

### Backend (Render/Railway/Heroku)
1. Push code to GitHub
2. Connect GitHub repo to Render/Railway/Heroku
3. Set environment variables in platform dashboard
4. Deploy automatically on push

**Live:** [https://prime-trade-ai-backend-intern-assignment.onrender.com](https://prime-trade-ai-backend-intern-assignment.onrender.com)

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect GitHub repo to Vercel/Netlify
3. Set `VITE_API_BASE_URL=https://your-backend-url.com/api/v1`
4. Deploy automatically on push

**Live:** [https://prime-trade-ai-backend-intern-assig.vercel.app](https://prime-trade-ai-backend-intern-assig.vercel.app)

---

## 📊 API Endpoints Summary

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/auth/register` | Register new user | ❌ |
| POST | `/api/v1/auth/login` | Login user | ❌ |
| POST | `/api/v1/auth/logout` | Logout user | ✅ |

### Products
| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| POST | `/api/v1/products` | Create product | ✅ | Admin |
| GET | `/api/v1/products` | Get all products | ✅ | User/Admin |
| GET | `/api/v1/products/:id` | Get product by ID | ✅ | User/Admin |
| PUT | `/api/v1/products/:id` | Update product | ✅ | Admin |
| DELETE | `/api/v1/products/:id` | Delete product | ✅ | Admin |

### Users
| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/api/v1/users/profile` | Get own profile | ✅ | User/Admin |
| PUT | `/api/v1/users/profile` | Update own profile | ✅ | User/Admin |
| GET | `/api/v1/users` | Get all users | ✅ | Admin |

---

## 📄 License

This project is open-source and available under the MIT License.

---

**Last Updated:** December 2025  
**Version:** 1.0.0  
**Status:** Deployed & Stable
