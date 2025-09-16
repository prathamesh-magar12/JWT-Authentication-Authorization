# Project Documentation

## Overview

This project is a MERN stack application with separate frontend and backend directories. The frontend is a React application built with Vite, and the backend is an Express.js server connected to a MongoDB database. The application provides user authentication (signup and login) and a protected route to fetch product data.

---

## Frontend

### Structure

- **index.html**: The main HTML file that loads the React app.
- **src/**: Contains React source code.
  - **main.jsx**: Entry point of the React app, renders the root component inside a `BrowserRouter`.
  - **App.jsx**: Defines routes and authentication logic.
  - **pages/**: Contains page components:
    - **Home.jsx**: Protected home page showing user info and product list.
    - **Login.jsx**: Login form page.
    - **Signup.jsx**: Signup form page.
  - **RefreshHandler.jsx**: Handles redirecting authenticated users to the home page.
  - **utils.js**: Utility functions for showing toast notifications.
- **public/**: Static assets.
- **package.json**: Defines dependencies and scripts.
- **vite.config.js**: Vite configuration.
- **.gitignore**: Specifies files and folders to ignore in git.
- **eslint.config.js**: ESLint configuration for linting React code.

### Key Features

- Uses React Router for client-side routing.
- Authentication state is managed in `App.jsx` with a private route wrapper.
- JWT token is stored in `localStorage` and used for authenticated API requests.
- Toast notifications for success and error messages using `react-toastify`.
- Fetches product data from backend protected route `/products`.
- Redirects authenticated users from login/signup to home automatically.

### Running the Frontend

```bash
npm install
npm run dev
npm run build
npm run preview
```

---

## Backend

### Structure

- **index.js**: Main Express server setup and route registration.
- **Controllers/**: Contains controller logic.
  - **AuthController.js**: Handles signup and login logic.
- **Models/**: Contains Mongoose models.
  - **user.js**: User schema and model.
  - **db.js**: MongoDB connection setup.
- **Middlewares/**: Contains middleware functions.
  - **Auth.js**: JWT authentication middleware.
  - **AuthMiddleware.js**: Validation middleware for auth routes.
- **Routes/**: Defines API routes.
  - **authRouter.js**: Routes for `/auth` endpoints (signup, login).
  - **productRouter.js**: Routes for `/products` endpoint (protected).
- **.env**: Environment variables including PORT, MongoDB connection string, and JWT secret.
- **package.json**: Backend dependencies and scripts.

### Key Features

- Express server with CORS and body-parser middleware.
- MongoDB connection using Mongoose.
- User signup with password hashing using bcrypt.
- User login with JWT token generation (expires in 24h).
- Protected `/products` route requiring valid JWT token.
- Middleware to validate JWT token and attach user info to request.
- Validation middleware for signup and login requests.

### Running the Backend

```bash
npm install
node index.js
```

---

## API Endpoints

### Authentication

- `POST /auth/signup`

  - Request body: `{ name, email, password }`
  - Creates a new user with hashed password.
  - Response: success or error message.

- `POST /auth/login`
  - Request body: `{ email, password }`
  - Validates user credentials.
  - Response: JWT token, user name, success message.

### Products

- `GET /products`
  - Protected route, requires `Authorization: bearer <token>` header.
  - Returns a list of products (static data in current implementation).

---

## Notes

- Frontend and backend communicate over HTTP on localhost ports (frontend default 5173, backend 8080).
- JWT token is stored in localStorage and sent in Authorization header for protected requests.
- Frontend redirects unauthenticated users to login page.
- Backend uses environment variables for sensitive data.
- Passwords are hashed with bcrypt before saving to database.
- Product data is currently hardcoded in backend route.
