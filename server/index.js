const express = require("express");
const UserAuthRouter = require("./routes/userAuthRouter");
const dbConnect = require("./lib/dbConnect");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const TaskRouter = require("./routes/TaskRouter")
require("dotenv").config();
const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT,
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

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