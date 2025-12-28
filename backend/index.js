// Import Express framework (used to create server & APIs)
const express = require("express");
const app = express();

// CORS is used to allow frontend (different origin) to access backend
const cors = require("cors");

// Import route files (this is backend logic)
const authRouter = require("./Routes/authRouter");
const productRouter = require("./Routes/productRouter");

// Load environment variables from .env file
require("dotenv").config();

// Connect to database
require("./Models/db");

// Define allowed frontend URLs (origins)
const allowedOrigins = [
  "http://localhost:5173", // local frontend (Vite)
  "https://jwt-authentication-authorization-one.vercel.app" // deployed frontend
];

/*
  CORS configuration
  ------------------
  This controls:
  - Which frontend can call this backend
  - Which HTTP methods are allowed
  - Which headers can be sent
*/
app.use(
  cors({
    origin: function (origin, callback) {
      /*
        origin = frontend URL making the request

        If origin is undefined:
        - Request is coming from Postman or server-to-server
        - We allow it
      */
      if (!origin) return callback(null, true);

      // Allow only listed frontends
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },

    // Allow cookies / authorization headers
    credentials: true,

    // Allowed HTTP methods
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],

    // Allowed headers from frontend
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

/*
  Built-in middleware to parse incoming JSON data
  (body-parser is NOT needed in modern Express)
*/
app.use(express.json());

/*
  Route handling
  --------------
  /auth      -> authRouter handles authentication APIs
  /products  -> productRouter handles product-related APIs
*/
app.use("/auth", authRouter);
app.use("/products", productRouter);

// Default route (health check)
app.get("/", (req, res) => {
  res.send("Hello from server");
});

// Port configuration
const PORT = process.env.PORT || 8080;

/*
  Start the server
  ----------------
  This creates the actual SERVER and listens on a PORT
*/
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
