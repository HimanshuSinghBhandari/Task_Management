const express = require("express");
const UserAuthRouter = require("./routes/userAuthRouter");
const dbConnect = require("./lib/dbConnect");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const TaskRouter = require("./routes/TaskRouter")

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // or your client's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
require("dotenv").config();

// Routes
app.use("/user", UserAuthRouter);
app.use("/api", TaskRouter);

dbConnect();
app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});