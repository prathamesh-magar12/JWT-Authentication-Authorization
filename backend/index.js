const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./Routes/authRouter");
const productRouter = require("./Routes/productRouter");

const allowedOrigins = [
  "http://localhost:5173",
  "https://jwt-authentication-authorization-one.vercel.app"
];

// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true
// }));

app.use(cors({
  origin: function (origin, callback) {
    // allow Postman / server-to-server
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


require("dotenv").config();
require("./Models/db");
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use("/auth", authRouter);
app.use("/products", productRouter);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
