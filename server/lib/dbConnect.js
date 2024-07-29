const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "react-login-with-node",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to database. Error details:");
    console.error(error);
    
    if (error.name === 'MongooseServerSelectionError') {
      console.error("This error often occurs when the MongoDB server is not running or the connection string is incorrect.");
    }
    
    if (!process.env.MONGO_URI) {
      console.error("MONGO_URI is not defined in the environment variables.");
    }
    
    process.exit(1); // Exit the process with an error code
  }
};

module.exports = dbConnect;